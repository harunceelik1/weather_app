import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import Weatherstatus from "./weathetstatus";
import fetchWeather from "../app/api/weather/route";
export default function Card() {
  const [weatherstat, setWeather] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEYS}`;
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetchWeather(city)
      .then((data) => {
        setWeather(data);
      })

      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <Toaster position="top-center" />
      <div className="overflow-hidden relative duration-700 border rounded-xl hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 border-zinc-600 ">
        <article className="relative w-full h-full p-4 md:p-8  ">
          <div className="flex items-center justify-between gap-2">
            <div className="text-zinc-600 dark:text-zinc-100">Time</div>
            <span className="flex  items-center gap-1 text-xs text-zinc-600 dark:text-zinc-100 ">
              <AiOutlineEye className={" text-xl "} />
              <p className="text-zinc-400">{date}</p>
            </span>
          </div>
          <h2
            className={cn(
              " font-bold text-3xl dark:text-zinc-100 text-zinc-500 sm:text-4xl   mt-4"
            )}
          >
            Current Weather
          </h2>
          <p
            className={cn(" mt-4 leading-8 text-zinc-600 dark:text-zinc-400 ")}
          >
            City
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex  mt-4 items-center space-x-2">
              <Input
                type="text"
                placeholder="Enter City"
                onChange={(e) => setCity(e.target.value)}
              />
              <Button type="submit" onClick={handleSubmit}>
                <FiSearch className="animate-bounce " />
              </Button>
            </div>
          </form>
          {/* <div className="mt-16 flex hidden items-center gap-0 text-zinc-100 lg:block ">
            {" "}
            <p
              className={cn(
                " dark:text-zinc-100 text-zinc-600  hover:text-zinc-50 "
              )}
            >
              Read more
            </p>
            <BsArrowRightShort
              className={cn("text-lg text-zinc-600 dark:text-zinc-100")}
            />
          </div> */}
        </article>
      </div>
      {weatherstat && <Weatherstatus data={weatherstat} />}
    </motion.div>
  );
}
