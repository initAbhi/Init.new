import { HelpCircle, LogOut, Settings, Wallet } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const Footer = () => {
  const options = [
    {
      name: "Settings",
      icon: Settings,
    },
    {
      name: "Help Center",
      icon: HelpCircle,
    },
    {
      name: "My Subscription",
      icon: Wallet,
    },
    {
      name: "Sign out",
      icon: LogOut,
    },
  ];
  return (
    <div className="p-2 mb-10">
      {options.map((option, index) => (
        <Button variant={"ghost"} className={"w-full flex justify-start cursor-pointer " } key={index}>
          <option.icon />
          {option.name}
        </Button>
      ))}
    </div>
  );
};

export default Footer;
