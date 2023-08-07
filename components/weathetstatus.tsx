"use client";
import React, { MouseEvent, useState } from "react";

import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Link from "next/link";
import thunder from "@/public/assets/thunder.gif";
import snow from "@/public/assets/snow.gif";
import rain from "@/public/assets/rainn.gif";
import sun from "@/public/assets/sun2.gif";
import cloudsun from "@/public/assets/cloud_sun.gif";
import clouds from "@/public/assets/clearsky.webp";
import mist from "@/public/assets/mist.gif";

export default function Weatherstatus({ data }: any) {
  const { name, main, weather, sys, wind } = data;
  console.log(wind.speed);
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  let mouseX1 = useMotionValue(0);
  let mouseY1 = useMotionValue(0);
  function handleMouseMove({ clientX, clientY, currentTarget }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();

    // console.log({ xPosition, yPosition });
    // setMousePosition({ x: xPosition, y: yPosition });

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  function handleMouseMove2({ clientX, clientY, currentTarget }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();

    // console.log({ xPosition, yPosition });
    // setMousePosition({ x: xPosition, y: yPosition });

    mouseX1.set(clientX - left);
    mouseY1.set(clientY - top);
  }
  const getImagePath = (main: any): any => {
    if (main.includes("clouds")) {
      return cloudsun;
    } else if (main.includes("snow")) {
      return snow;
    } else if (main.includes("rain")) {
      return rain;
    } else if (main.includes("thunderstorm")) {
      return thunder;
    } else if (main.includes("clear")) {
      return sun;
    } else if (main.includes("drizzle")) {
      return rain;
    } else if (main === "mist" || main === "smoke" || main === " haze") {
      return mist;
    }
    return "";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col w-full  gap-8 mx-auto   "
    >
      <Link href={""}>
        <div
          onMouseMove={handleMouseMove}
          className=" 

      overflow-hidden  relative rounded-xl border border-zinc-600  hover:bg-zinc-800/10 w-full justify-center  h-[250px]  lg:h-full  dark:bg-transparent duration-700 top-0 left-0 bg-black/40"
        >
          <Image
            src={getImagePath(weather[0].description)}
            alt="img"
            className="object-cover  absolute  w-full h-full opacity-75   "
          />

          <div className=" flex justify-center items-center h-full w-full  lg:flex-col p-4 backdrop-blur-sm ">
            <motion.div
              className="rounded-xl pointer-events-none absolute -inset-px  opacity-80 transition duration-1000 group-hover:opacity-50"
              style={{
                background: useMotionTemplate`radial-gradient(150px circle at ${mouseX}px ${mouseY}px,rgb(244 244 245 / 0.10),transparent 80% )`,
              }}
            />

            <h2 className="text-3xl font-bold dark:text-zinc-100  text-black/80 ">
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
      </Link>

      <div
        onMouseMove={handleMouseMove2}
        className="  overflow-hidden relative rounded-xl border border-zinc-600  w-full h-full  dark:bg-transparent duration-700 hover:bg-zinc-800/10"
      >
        <motion.div
          className="rounded-xl pointer-events-none absolute -inset-px  opacity-80 transition duration-1000 group-hover:opacity-50"
          style={{
            background: useMotionTemplate`radial-gradient(150px circle at ${mouseX1}px ${mouseY1}px,rgb(244 244 245 / 0.10),transparent 80% )`,
          }}
        />
        <div className="flex  justify-around items-center h-full p-4 max-sm:p-16 max-sm:flex-col max-sm:text-center">
          <div>
            <h1 className="font-bold text-xl text-zinc-500 dark:text-zinc-100">
              Speed
            </h1>
            <p className="opacity-50 text-center"> {wind && wind.speed}</p>
          </div>
          <div>
            <h1 className="font-bold text-xl text-zinc-500 dark:text-zinc-100">
              Felt Air Temperature
            </h1>
            <p className="opacity-50 text-center">
              {" "}
              {main &&
                (main.feels_like.toFixed(0) - 273.15).toFixed(1) + "\xB0C"}
            </p>
          </div>
          <div>
            <h1 className="font-bold text-xl text-zinc-500 dark:text-zinc-100">
              Temperature
            </h1>
            <p className="text-center opacity-50">
              {main && (main.temp.toFixed(0) - 273.15).toFixed(1) + "\xB0C"}
            </p>
          </div>
          <div>
            <h1 className="font-bold text-xl text-zinc-500 dark:text-zinc-100">
              Flag
            </h1>
            <div className=" flex justify-center">
              <Image
                src={`https://flagsapi.com/${sys.country}/shiny/64.png`}
                width={20}
                height={20}
                alt="flag"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
