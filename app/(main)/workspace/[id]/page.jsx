"use client";
import CodeView from "@/components/CodeView";
import ChatView from "@/components/ChatView";
import React from "react";

const Workspace = () => {
  return (
    <div className="p-3 pr-5 mt-3k">
      <div className="grid gap-10 grid-cols-1 md:grid-cols-6  lg:grid-cols-8">
      <div className="col-span-2 lg:col-span-2">

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
