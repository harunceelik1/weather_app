"use client";
import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

import { motion } from "framer-motion";
import Card from "./card";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

export default function Hero() {
  return (
    <section className="mx-auto mt-28 ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-2"
      >
        <h1
          className={cn(
            "text-primary font-bold text-2xl gap-x-3",
            font.className
          )}
        >
          Weather
        </h1>
        <p className=" text-zinc-400">
          An application developed to obtain weather information for any desired
          city or country. With this app, you can check the weather conditions,
          temperature, felt air temperature and other relevant data for the
          location of your choice. Stay informed about the current weather and
          plan your activities accordingly with this user-friendly weather app.
        </p>
        <div className="w-full h-px bg-zinc-800 mt-12"></div>
      </motion.div>
      <Card />
    </section>
  );
}
