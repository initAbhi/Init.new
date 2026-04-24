"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useConvex, useMutation } from "convex/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Lookup from "@/data/Lookup";
import { ArrowRight, AwardIcon, Link, Loader2Icon } from "lucide-react";
import Markdown from "react-markdown";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Prompt from "@/data/Prompt";
import { useSidebar } from "./ui/sidebar";

export const countToken = (inputText) => {
  if (!inputText) return 0;
  return String(inputText)
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};

const ChatView = () => {
  const { id } = useParams();
  const [userInput, setUserInput] = useState();
  const UpdateWorkspace = useMutation(api.workspace.UpdateWorkspace);
  const messagesEndRef = useRef(null);
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessagesContext);
  const [loader, setLoader] = useState(false);
  const { toggleSidebar } = useSidebar();
  const UpdateToken = useMutation(api.users.UpdateToken);

  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const isRespondingRef = useRef(false); // prevents concurrent / double calls

  useEffect(() => {
    getWorkspaceData();
  }, [id]);

  // Single trigger point: fires when the last message is from the user.
  // useRef lock prevents double-call if onGenerate updates messages while a
  // response is already in flight.
  useEffect(() => {
    if (messages?.length > 0 && !isRespondingRef.current) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === "user") {
        getUserResponse(messages);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // Use "auto" for first load
    }, 200); // or 100ms if needed
    return () => clearTimeout(timeout);
  }, [messages]);

  const getUserResponse = async (msgs) => {
    if (isRespondingRef.current) return;
    isRespondingRef.current = true;
    setLoader(true);
    try {
      const prom = msgs[msgs?.length - 1].content;
      const newPrompt = Prompt.CHAT_PROMPT + prom;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/ai/user-response`,
        {
          method: "POST",
          body: JSON.stringify({
            messages: msgs,
            prompt: newPrompt,
          }),
        }
      );
      const res = await response.json();

      // Guard: if API returned an error, don't add a broken message
      if (res.err || !res.response) {
        console.error("AI API error:", res.err);
        return;
      }

      const updatedMessages = [...msgs, { content: res.response, role: "model" }];
      setMessages(updatedMessages);

      await UpdateWorkspace({ id, newMessages: updatedMessages });

      const token =
        Number(userDetail?.token) -
        Number(countToken(JSON.stringify(res.response)));
      await UpdateToken({
        userId: userDetail?._id,
        token: token,
      });
    } catch (err) {
      console.error("getUserResponse failed:", err);
    } finally {
      isRespondingRef.current = false;
      setLoader(false);
    }
  };

  const getWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessages(result?.messages);
  };

  const onGenerate = async (input) => {
    setUserInput("");
    const updated = [
      ...(messages || []),
      { role: "user", content: input },
    ];
    setMessages(updated); // useEffect picks this up and calls getUserResponse
    UpdateWorkspace({ id, newMessages: updated });
    // Note: do NOT call getUserResponse directly here — the useEffect is the
    // single trigger point, preventing double-calls and infinite loops.
  };
  return (
    <div className="relative h-[85vh] flex flex-col">


      <div className="flex-1 overflow-y-scroll scrollbar-hidden pl-5">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className="bg-[#272727] p-3 rounded-lg mb-2 flex gap-2 items-start "
          >
            {msg?.role == "user" && (
              <Image
                src={userDetail?.picture}
                alt="userImage"
                width={35}
                height={35}
                className="rounded-full"
              />
            )}
            <div className="prose break-words w-full max-w-full text-left">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {loader && (
          <div className="bg-[#272727] p-3 rounded-lg mb-2 flex gap-2 items-start ">
            {" "}
            <Loader2Icon className="animate-spin " />
            <h2>Generating response...</h2>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Input section */}
      <div className="flex gap=2 items-end">


        <motion.div
          className="p-5 border rounded-xl max-w-2xl w-full mt-3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex gap-2">
            <textarea
              value={userInput}
              className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
              onChange={(e) => setUserInput(e.target.value)}
              type="text"
              placeholder={Lookup.INPUT_PLACEHOLDER}
            />
            {userInput && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight
                  onClick={() => onGenerate(userInput)}
                  className="bg-[#ff0] text-black drop-shadow-[0_0_10px_rgba(255,255,0,0.7)] p-2 h-8 w-8 rounded-md cursor-pointer"
                />
              </motion.div>
            )}
          </div>
          <div>
            <Link className="h-5 w-5" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatView;
