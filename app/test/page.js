"use client";
import { MessagesContext } from "@/context/MessagesContext";
import Prompt from "@/data/Prompt";
import React, { useContext, useEffect } from "react";

const test = () => {
  // useEffect(() => {
  //   generateCode();
  // }, []);

  // const generateCode = async () => {
  //   console.log("generating...");
  //   const res = await fetch(`http://localhost:3000/api/test`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       prompt: `create a todo app - ${Prompt.CODE_GEN_PROMPT}`,
  //     }),
  //   });
  //   const response = await res.json();
  // };
  const {messages} = useContext(MessagesContext)
  useEffect(() => {
  }, [messages])
  return <div>test</div>;
};

export default test;
