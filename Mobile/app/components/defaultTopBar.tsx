import { useAuth } from '@/hooks/useAuth';
import { useUserContext } from '@/hooks/useUser';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter, useSegments } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DefaultTopBar () {
    const styles = StyleSheet.create({
        optionListView: {
            alignItems: "flex-end",
            justifyContent: "flex-start",
        },
        optionsListItem: {
            padding: 5,
            margin: 5,
        },
        optionList: {
            backgroundColor: "white",
        },
    })

    const router = useRouter();
    const segments = useSegments();
    const {isAuthenticated, logout} = useAuth();
    const {profileImage} = useUserContext()
    const [optionsVisible, setOptionsVisible] = useState(false);
    const options = [
        {name: "X", route:"back"},
        {name: "Deck", route: "deck"}, 
        {name: "Profil", route: "profile"}, 
        {name: "Se déconnecter", route:"disconnect"},
    ]
    
    function goToLogin() {
        router.push("/login")
    }

    function navigateToPage(route : string) {
        setOptionsVisible(false);
        if (route === "disconnect") {
            logout();
        } else if (route === "back") {
            setOptionsVisible(false);
        } else {
            router.push(`/(auth)/${route}`);
        }
    }

    return(
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
            {segments.length > 0 && (
                <TouchableOpacity onPress={()=>{router.dismissAll()}}>
                    <FontAwesome style={{margin:10}} size={28} name="home" />
                </TouchableOpacity>
            )}
            {!isAuthenticated ? (
                segments[0] != "register" && segments[0] != "login" && (
                    <TouchableOpacity onPress={goToLogin}>
                        <Text style={{margin:10}}>Se connecter</Text>
                    </TouchableOpacity>
                )) : (
                    <View>
                        <TouchableOpacity onPress={()=>setOptionsVisible(true)}>
                            <Image style={{height: 32, width: 32, borderRadius:16}} source={{uri:profileImage}}/>
                        </TouchableOpacity>
                        <Modal
                            visible={optionsVisible}
                            animationType='fade'
                            transparent={true}
                            onRequestClose={() => setOptionsVisible(false)}
                        >
                            <View style={styles.optionListView}>
                                {optionsVisible && (
                                    <FlatList
                                        data={options}
                                        style={styles.optionList}
                                        renderItem={({item : option}) => 
                                            <TouchableOpacity style={styles.optionsListItem} onPress={() => {navigateToPage(option.route)}}>
                                                <Text>{option.name}</Text>
                                            </TouchableOpacity>
                                        }
                                    />
                                )}
                            </View>
                        </Modal>
                    </View>
                )
            } 
        </View>
    )
}