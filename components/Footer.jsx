"use client";
import { HelpCircle, Home, LogOut, Settings, Wallet } from "lucide-react";
import React, { useContext } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { UserDetailContext } from "@/context/UserDetailContext";
import { googleLogout } from "@react-oauth/google";
import { useSidebar } from "./ui/sidebar";
import { UiContext } from "@/context/UiContext";

const Footer = () => {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { isSignInDialog, setisSignInDialog } = useContext(UiContext);
  const { toggleSidebar } = useSidebar();

  const options = [
    {
      name: "Home",
      icon: Home,
      path: "/",
    },
    {
      name: "Settings",
      icon: Settings,
    },

    {
      name: "My Subscription",
      icon: Wallet,
      path: "/pricing",
    },
    {
      name: "Sign out",
      icon: LogOut,
    },
  ];

  const onOptionClick = (option) => {
    if (option.name == "Sign out") {
      googleLogout();
      router.push("/");
      setUserDetail(undefined);
      localStorage.setItem("user", "null");
      setisSignInDialog(true);
      toggleSidebar();
    }
    if (option.path) {
      router.push(option.path);
      toggleSidebar();
    }
  };

  return (
    <div className="p-2 mb-2">
      {options.map((option, index) => (
        <Button
          variant={"ghost"}
          onClick={() => onOptionClick(option)}
          className={"w-full flex justify-start cursor-pointer "}
          key={index}
        >
          <option.icon />
          {option.name}
        </Button>
      ))}
    </div>
  );
};

export default Footer;
