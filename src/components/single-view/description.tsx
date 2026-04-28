"use client";

import React from "react";

interface SingleViewDescriptionProps {
  description: string;
}

export const SingleViewDescription = ({
  description,
}: SingleViewDescriptionProps) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
        <span className="w-1 h-3 bg-primary rounded-full"></span>
        Description
      </h3>
      <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
        <div className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap">
          {description}
        </div>
      </div>
    </div>
  );
};
