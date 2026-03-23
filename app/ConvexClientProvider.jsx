"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import React from 'react'

const ConvexClientProvider = ({children}) => {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "";
    const convex = new ConvexReactClient(convexUrl);
  return (
    <ConvexProvider client={convex}>{children}</ConvexProvider>
  )
}

export default ConvexClientProvider
