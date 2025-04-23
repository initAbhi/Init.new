"use client";
import Lookup from "@/data/Lookup";
import { ArrowRight, ArrowUpRight, Link } from "lucide-react";
import React, { useContext, useState } from "react";
import GlassTextarea from "./GlassTextArea";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import SignInDialog from "./SignInDialog";
import VirtualKeyboard from "./Keyboard";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UiContext } from "@/context/UiContext";

const Hero = () => {
  const router = useRouter();
  const [userInput, setUserInput] = useState();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  // const [openDialog, setOpenDialog] = useState(false);
    const { isSignInDialog, setisSignInDialog} = useContext(UiContext)
  
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);

  const onGenerate = async (input) => {
    if (!userDetail?.name) {
      setisSignInDialog(true);
      return;
    }
    // setMessages([{ role: "user", content: input }]);
    const workspaceId = await CreateWorkspace({
      user: userDetail._id,
      messages: [{ role: "user", content: input }],
    });
    router.push("/workspace/" + workspaceId);
  };

  return (
    <motion.div
      className="flex flex-col items-center mt-52 gap-2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="font-bold text-4xl"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {Lookup.HERO_HEADING}
      </motion.h2>

      <motion.p
        className="text-gray-300 font-medium"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {Lookup.HERO_DESC}
      </motion.p>

      <motion.div
        className="p-5 border rounded-xl max-w-2xl w-full mt-3"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="flex gap-2">
          <textarea
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
            onChange={(e) => setUserInput(e.target.value)}
            type="text"
            placeholder={Lookup.INPUT_PLACEHOLDER}
          />
          {userInput && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
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

      <motion.div
        className="flex mt-8 flex-wrap max-w-2xl justify-center gap-3"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {Lookup.SUGGSTIONS.map((suggestion, index) => (
          <motion.h2
            key={index}
            onClick={() => onGenerate(suggestion)}
            className="p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer transition duration-300 ease-in-out hover:border-[#ff0] hover:shadow-[0_0_10px_#ff0]"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {suggestion}
          </motion.h2>
        ))}
      </motion.div>

      <SignInDialog
        closeDialog={(v) => setisSignInDialog(v)}
        openDialog={isSignInDialog}
      />
    </motion.div>
  );
};

export default Hero;
