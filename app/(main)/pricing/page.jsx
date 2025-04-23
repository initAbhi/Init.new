"use client";
import PricingModel from "@/components/PricingModel";
import { UserDetailContext } from "@/context/UserDetailContext";
import Lookup from "@/data/Lookup";
import React, { useContext } from "react";

const page = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return (
    <div className="mt-5 flex flex-col items-center w-full p-10 md:px-32 lg:px-48">
      <h2 className="font-bold text-5xl">Pricing</h2>
      <p className="text-gray-400 max-w-xl text-center mt-4">
        {Lookup.PRICING_DESC}
      </p>
      <div className="p-5 border rounded-xl  w-full justify-between flex mt-7 items-center">
        <h2 className="text-lg">
          <span className="font-bold">{userDetail?.token} Tokens</span>
        </h2>
        <div className="  ">
          <h2 className="font-medium">Need more token?</h2>
          <p>Upgrade your plan below</p>
        </div>
      </div>
      <PricingModel />
    </div>
  );
};

export default page;
