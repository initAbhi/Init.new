import Lookup from "@/data/Lookup";
import React from "react";
import { Button } from "./ui/button";

const PricingModel = () => {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Lookup.PRICING_OPTIONS.map((pricing, index) => (
        <div key={index} className="border p-7 rounded-xl flex flex-col gap-3 justify-center items-center ">
          <h2 className="font-bold text-2xl">{pricing.name}</h2>
          <h2 className="font-medium text-lg">{pricing.tokens} Tokens</h2>
          <p className="text-gray-400 ">{pricing.desc}</p>
          <h2 className="font-bold text-4xl text-center mt-6">
            ${pricing.price}
          </h2>
          <Button>Comming soon...</Button>
        </div>
      ))}
    </div>
  );
};

export default PricingModel;
