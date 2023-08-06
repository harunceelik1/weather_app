"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";
export default function Weatherstatus({ data }) {
  const { name, main, weather, sys } = data;
  console.log(data);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col w-full gap-8 mx-auto  "
    >
      <div className="overflow-hidden relative rounded-xl border border-zinc-600  hover:bg-zinc-800/10 w-full h-full  dark:bg-transparent duration-700 ">
        <div className=" flex justify-center items-center h-full lg:flex-col p-4">
          <h2 className="text-3xl font-bold dark:text-zinc-100 text-zinc-500 ">
            {name}
          </h2>

          {weather && (
            <Image
              src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
              width={60}
              height={60}
              alt="icons"
            />
          )}
        </div>
      </div>

      <div className="overflow-hidden relative rounded-xl border border-zinc-600  w-full h-full  dark:bg-transparent duration-700 hover:bg-zinc-800/10">
        <div className="flex  justify-around items-center h-full p-4 max-sm:p-16 max-sm:flex-col max-sm:text-center">
          <div>
            <h1 className="font-bold text-xl">Current Weather</h1>
            <p className="opacity-50 text-center">
              {" "}
              {weather && weather[0].description}
            </p>
          </div>
          <div>
            <h1 className="font-bold text-xl">Felt Air Temperature</h1>
            <p className="opacity-50 text-center">
              {" "}
              {main &&
                (main.feels_like.toFixed(0) - 273.15).toFixed(1) + "\xB0C"}
            </p>
          </div>
          <div>
            <h1 className="font-bold text-xl">Temperature</h1>
            <p className="text-center opacity-50">
              {main && (main.temp.toFixed(0) - 273.15).toFixed(1) + "\xB0C"}
            </p>
          </div>
          <div>
            <h1 className="font-bold text-xl">Flag</h1>
            <div className=" flex justify-center">
              <Image
                src={`https://flagsapi.com/${sys.country}/shiny/64.png`}
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
