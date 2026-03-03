import React from "react";

export function PartnersBarSection() {
  return (
    <section className="py-12 border-y border-border bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-8">
          Localized Payments & Partners
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          <span className="font-black text-2xl text-foreground font-display tracking-tighter">
            XENDIT
          </span>
          <span className="font-black text-2xl text-foreground italic font-display">
            GCash
          </span>
          <span className="font-black text-2xl text-foreground font-display">
            Maya
          </span>
          <span className="font-black text-2xl text-foreground font-display">
            BDO
          </span>
          <span className="font-black text-2xl text-foreground font-display tracking-tight">
            UnionBank
          </span>
        </div>
      </div>
    </section>
  );
}
