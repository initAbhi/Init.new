"use client";
import React, { useContext } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
// import { motion } from "framer-motion";
import { motion } from "framer-motion";
import { UserDetailContext } from "@/context/UserDetailContext";
import { googleLogout } from "@react-oauth/google";
import { UiContext } from "@/context/UiContext";
import { useSidebar } from "./ui/sidebar";
import { ActionContext } from "@/context/ActionContext";
import { LucideDownload, Rocket } from "lucide-react";

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { isSignInDialog, setisSignInDialog } = useContext(UiContext);
  const { toggleSidebar } = useSidebar();
  const { action, setAction } = useContext(ActionContext);
  const pathname = usePathname();

  const onAction = (action) => {
    setAction({
      actionType: action,
      timeStamp: Date.now(),
    });//
  };
  // console.log(" - " , userDetail)
  const onSignIn = () => {
    setisSignInDialog(true);
  };
  return (
    <motion.div
      className="sm:p-4 flex justify-between items-center"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Image
          className="cursor-pointer  drop-shadow-[0_0_10px_rgba(255,255,0,0.4)] animate-glow"
          src="/logo.png"
          alt="logo"
          width={40}
          height={40}
        />
      </motion.div>

      {/* Buttons */}
      {userDetail == "loading" ? (
        <motion.div
          className="flex gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Button className="bg-[#ff0] hover:bg-[#fcfc47] text-black cursor-pointer drop-shadow-[0_0_10px_rgba(255,255,0,0.7)]">
              Loading...
            </Button>
          </motion.div>
        </motion.div>
      ) : !userDetail ? (
        <motion.div
          className="flex gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Button
              variant={"ghost"}
              className="text-[#a8a8a8] hover:text-white hover:cursor-pointer"
              onClick={onSignIn}
            >
              Sign in
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Button
              className="bg-[#ff0] hover:bg-[#fcfc47] text-black cursor-pointer drop-shadow-[0_0_10px_rgba(255,255,0,0.7)]"
              onClick={onSignIn}
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="flex gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {pathname.includes("workspace") && (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Button
                variant={"ghost"}
                className="text-[#a8a8a8] hover:text-white hover:cursor-pointer"
                onClick={() => {
                  onAction("export");
                }}
              >
                <LucideDownload /> Export
              </Button>
            </motion.div>
          )}

          {/* <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white hover:cursor-pointer"
              onClick={() => {
                
                onAction('deploy')
              }}
            >
             <Rocket /> Deploy
            </Button>
          </motion.div> */}

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Button
              className="bg-[#ff0] hover:bg-[#fcfc47] text-black cursor-pointer drop-shadow-[0_0_10px_rgba(255,255,0,0.7)]"
              onClick={toggleSidebar}
            >
              {userDetail.name}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Header;
