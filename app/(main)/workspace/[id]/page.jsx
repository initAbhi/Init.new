"use client";
import CodeView from "@/components/CodeView";
import ChatView from "@/components/ChatView";
import React, { useContext } from "react";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { UserDetailContext } from "@/context/UserDetailContext";
import SidebarButton from "@/components/SidebarButton";

const Workspace = () => {
  

  
  return (
 
    <div className="p-3 pr-5 mt-3k">
    
      <div className="grid gap-10 grid-cols-1 md:grid-cols-6  lg:grid-cols-8">
      <div className="col-span-2 lg:col-span-2">
        {/* <SidebarButton /> */}

        <ChatView />
      </div>

        <div className="col-span-4 lg:col-span-6">
          <CodeView />
        </div>
      </div>
    </div>

  );
};

export default Workspace;
