"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UiContext } from "@/context/UiContext";
import { ActionContext } from "@/context/ActionContext";
import { useRouter } from "next/navigation";

const Provider = ({ children }) => {
  const [messages, setMessages] = useState();
  const [userDetail, setUserDetail] = useState("loading");
  const [isSignInDialog, setisSignInDialog] = useState(false);
  const [action, setAction] = useState()
  const router = useRouter()
  // console.log("client id", process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY);
  const convex = useConvex();
  
  useEffect(() => {
    IsAuthenticated();
  }, [userDetail]);
  const IsAuthenticated = async () => {
    if (typeof window !== undefined) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        router.push('/')
        setUserDetail(undefined);
      } else {
        const result = await convex.query(api.users.GetUser, {
          email: user?.email,
        });
        setUserDetail(result);
        console.log(result);
      }
    }
  };
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}
    >
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <MessagesContext.Provider value={{ messages, setMessages }}>
          <UiContext.Provider value={{ isSignInDialog, setisSignInDialog }}>
            <SidebarProvider defaultOpen={false}>
              <AppSidebar />
              <ActionContext.Provider value={{action, setAction}}>

              <NextThemesProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
                >
                <div className="w-screen p-4 md:p-0">

                {children}
                </div>
              </NextThemesProvider>
                </ActionContext.Provider>
            </SidebarProvider>
          </UiContext.Provider>
        </MessagesContext.Provider>
      </UserDetailContext.Provider>
    </GoogleOAuthProvider>
  );
};

export default Provider;
