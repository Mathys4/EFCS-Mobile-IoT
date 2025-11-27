import { User, UserContextType } from "@/types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";

export const UserContext = createContext<UserContextType | null>(null);
export const defaultAvatar = "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small_2x/default-avatar-icon-of-social-media-user-vector.jpg"

export function UserContextProvider({ children } : { children: React.ReactNode }) {
    const [uid, setUid] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [profileImage, setProfileImage] = useState<string>("")

    useEffect(() => {
        if (profileImage !== "")
        {
            AsyncStorage.setItem("avatar-"+uid, profileImage);
        }
    }, [profileImage])

    async function getUserCreds(newUid: string) {
        await getDoc(doc(db, "users", newUid)).then((userCreds) => {
            setName(userCreds.get("name"))
            setLastName(userCreds.get("lastName"))
        })

        if (profileImage === "")
        {
            await AsyncStorage.getItem("avatar-"+newUid).then((avatar) => {
                if (avatar === null) {
                    setProfileImage(defaultAvatar)
                } else {
                    setProfileImage(avatar)
                }
            })
        }

        if (uid === "") {
            setUid(newUid)
        }
    }

    async function getAllUsers() : Promise<User[]> {
        const users = await getDocs(collection(db, "users"));

        console.log(users.docs);
        return [{"lastName" : "", "name": "", "userId" : ""}];
    }

    return (
        <UserContext.Provider value={{name, lastName, profileImage, setProfileImage, getUserCreds, getAllUsers}}>
            {children}
        </UserContext.Provider>
    )
}