"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useSidebar } from "./ui/sidebar";
import { Button } from "./ui/button";

const WorkspaceHistory = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const convex = useConvex();
  const [workspaceList, setWorkspaceList] = useState();
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    userDetail && userDetail != "loading" && GetAllWorkspace();
  }, [userDetail]);
  // console.log("all workspace", userDetail)
  const GetAllWorkspace = async () => {
    // console.log("worspace userde", userDetail);
    const result = await convex.query(api.workspace.GetAllWorkspace, {
      userId: userDetail?._id,
    });
    // console.log(result);
    setWorkspaceList(result);
  };
  return (
    <div>
      <h2 className="font-medium text-2xl mb-4">Previous chats</h2>
      <div>
        {workspaceList &&
          workspaceList?.map((workspace, index) => (
              <Button key={index} className="w-full flex justify-start" variant={"ghost"}>
                    <Link href={"/workspace/" + workspace?._id}>

              <h2
                
                onClick={toggleSidebar}
                key={index}
                className="  text-gray-400 mt-2  hover:text-white cursor-pointer"
                >
                {workspace?.messages[0].content}
              </h2>
            </Link>
                  </Button>
          ))}
      </div>
    </div>
  );
};

export default WorkspaceHistory;
