"use client";
import React, { useContext, useEffect, useState } from "react";
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
import TabWatcher from "./TabWatcher";
import { MessagesContext } from "@/context/MessagesContext";
import { api } from "@/convex/_generated/api";
import { useConvex, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { countToken } from "./ChatView";
import { UserDetailContext } from "@/context/UserDetailContext";

const CodeView = () => {
  const { id } = useParams();

  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
  const [isGenerating, setIsGenerating] = useState(false);
  const { messages, setMessages } = useContext(MessagesContext);
  const UpdateWorkspace = useMutation(api.workspace.UpdateWorkspace);
  const convex = useConvex();
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const UpdateToken = useMutation(api.users.UpdateToken);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  useEffect(() => {
    id && GetFiles();
  }, [id]);

  const GetFiles = async () => {
    setIsGenerating(true);
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...result?.fileData };
    setFiles(mergedFiles);
    setIsGenerating(false);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role == "user") generateCode(messages);
    }
  }, [messages]);

  const generateCode = async (msgs) => {
    const prom = msgs[msgs?.length - 1].content;
    setIsGenerating(true);
    console.log("generating...");
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/test`, {
      method: "POST",
      body: JSON.stringify({
        prompt: `${JSON.stringify(msgs)} - ${Prompt.CODE_GEN_PROMPT}`,
      }),
    });
    const { response } = await res.json();
    // console.log("response", response);
    // console.log("response.files", response?.files);
    const newFiles = response.files;
    const updatedFiles = { ...files, ...newFiles };
    setFiles(updatedFiles);
    await UpdateFiles({
      id,
      files: newFiles,
    });

    const token =
      Number(userDetail?.token) - Number(countToken(JSON.stringify(newFiles)));
    await UpdateToken({
      userId: userDetail?._id,
      token: token,
    });
    setIsGenerating(false);
    // openPreviewInNewTab(updatedFiles);
    // const updatedMessages = [...msgs, { content: res.response, role: "model" }];
    // setMessages(updatedMessages);
    // await UpdateWorkspace({ id, newMessages: updatedMessages });
  };

  return (
    <div className="relative ">
      {/* <SandpackProvider
        files={files}
        options={{
          externalResources: [
            "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
          ],
        }}
        theme={"dark"}
        template="react"
        customSetup={{ dependencies: { ...Lookup.DEPENDANCY } }}
      >
        <SandpackLayout className="flex flex-col h-full ">
          <Tabs defaultValue="account" onValueChange={handleTabChange} className="h-full  w-full">
            <TabsList
              style={{ color: "blue" }}
              className="flex justify-center items-center"
            >
              <TabsTrigger value="account">Code</TabsTrigger>
              <TabsTrigger value="password">Preview</TabsTrigger>
            </TabsList>

            <TabsContent
              value="account"
              className="flex flex-col md:flex-row gap-2 h-[700px]"
            >
              <SandpackFileExplorer
                style={{ height: "80vh", width: "35%" }}
                className="w-[25%]  border-r"
              />
              <SandpackCodeEditor
                style={{ height: "80vh" }}
                extensions={[autocompletion()]}
                extensionsKeymap={[completionKeymap]}
                className="w-3/4 "
              />
            </TabsContent>

            <TabsContent value="password" className="h-[700px]">
              <div className="w-full h-[80vh]">
                <SandpackPreview
                  className="w-full h-full"
                  showNavigator={true}
                />
              </div>
            </TabsContent>
          </Tabs>
        </SandpackLayout>
      </SandpackProvider> */}

      <SandpackProvider
        files={files}
        options={{
          externalResources: [
            "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
          ],
        }}
        theme={"dark"}
        template="react"
        customSetup={{ dependencies: { ...Lookup.DEPENDANCY } }}
      >
        <SandpackLayout className="flex flex-col h-full">
          <TabWatcher />
        </SandpackLayout>
      </SandpackProvider>
      {isGenerating && (
        <div className="p-10 bg-gray-900 opacity-50 absolute top-0 rounded-lg w-full h-full flex justify-center items-center">
          <Loader2Icon className="animate-spin h-10 w-10 text-white" />
          <h2 className="text-white">Generating your files...</h2>
        </div>
      )}
    </div>
  );
};

export default CodeView;
