import { AuthenticationContextProvider } from "@/context/AuthenticationContext";
import { UserContextProvider } from "@/context/UserContext";
import { Stack } from "expo-router";

export function MainLayout() {
  return (<Stack />);
}

export default function RootLayout() {
  return (
    <UserContextProvider>
      <AuthenticationContextProvider>
        <MainLayout/>
      </AuthenticationContextProvider>
    </UserContextProvider>
  )
}
