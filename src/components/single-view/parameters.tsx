"use client";

import React from "react";
import { Timer, Shield, Layers, CreditCard } from "lucide-react";

interface SingleViewParametersProps {
  deliveryDays: number;
  experienceLevel: string;
  category: string;
  paymentType: string;
}

export const SingleViewParameters = ({
  deliveryDays,
  experienceLevel,
  category,
  paymentType,
}: SingleViewParametersProps) => {
  return (
    <div>
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
        <span className="w-1 h-3 bg-primary rounded-full"></span>
        Parameters
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl">
          <Timer className="h-5 w-5 text-primary mb-3" />
          <p className="text-[10px] uppercase text-zinc-400 font-bold mb-1">
            Delivery Time
          </p>
          <p className="text-sm font-semibold">
            {deliveryDays} {deliveryDays === 1 ? "Day" : "Days"}
          </p>
        </div>
        <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl">
          <CreditCard className="h-5 w-5 text-primary mb-3" />
          <p className="text-[10px] uppercase text-zinc-400 font-bold mb-1">
            Payment Type
          </p>
          <p className="text-sm font-semibold capitalize">{paymentType}</p>
        </div>
        <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl">
          <Shield className="h-5 w-5 text-primary mb-3" />
          <p className="text-[10px] uppercase text-zinc-400 font-bold mb-1">
            Expertise
          </p>
          <p className="text-sm font-semibold capitalize">
            {experienceLevel} Level
          </p>
        </div>
        <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl">
          <Layers className="h-5 w-5 text-primary mb-3" />
          <p className="text-[10px] uppercase text-zinc-400 font-bold mb-1">
            Category
          </p>
          <p className="text-sm font-semibold">{category}</p>
        </div>
      </div>
    </div>
  );
};
