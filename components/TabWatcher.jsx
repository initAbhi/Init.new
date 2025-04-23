"use client";
import React, { useEffect, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import { Loader2Icon } from "lucide-react";
import { useSandpack } from "@codesandbox/sandpack-react";
import SandpackPreviewClient from "./SandpackPreviewClient";
// import TabWatcher from "./TabWatcher";

const  TabWatcher = () => {
  const { sandpack } = useSandpack();
  const [tab, setTab] = useState("account");

  const handleTabChange = (value) => {
    setTab(value);
    if (value === "password") {
      sandpack.runSandpack(); // Only when switching to Preview
    }
  };

  return (
    <Tabs value={tab} onValueChange={handleTabChange} className="h-full w-full">
      <TabsList className="flex justify-center items-center">
        <TabsTrigger value="account">Code</TabsTrigger>
        <TabsTrigger value="password">Preview</TabsTrigger>
      </TabsList>

      <TabsContent
        value="account"
        className="flex flex-col md:flex-row gap-2 h-[700px]"
      >
        <SandpackFileExplorer
          style={{ height: "80vh", width: "35%" }}
          className="w-[25%] border-r"
        />
        <SandpackCodeEditor
          style={{ height: "80vh" }}
          extensions={[autocompletion()]}
          extensionsKeymap={[completionKeymap]}
          className="w-3/4"
        />
      </TabsContent>

      <TabsContent value="password" className="h-[700px]">
        <div className="w-full h-[80vh]">
          <SandpackPreviewClient />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TabWatcher;
