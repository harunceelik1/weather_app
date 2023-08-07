"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Sparkles } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { AiOutlineCloud } from "react-icons/ai";
import { Poppins } from "next/font/google";
import { FiMapPin } from "react-icons/fi";
import SplashScreen from "@/components/splash/SplashScreen";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { WeatherContext } from "@/context/weatherContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaTemperatureLow } from "react-icons/fa";
// import { LocationContext } from "@/context/weatherContext";
const font = Poppins({
  weight: "800",
  subsets: ["latin"],
});
export default function Header() {
  const { weatherData } = useContext(WeatherContext);
  const [locationData, setLocationData] = useState<{
    name: string | null;
    sys: string | null;
    temp: any | null;
  }>({
    name: null,
    sys: null,
    temp: null,
  });
  const [loading, setLoading] = useState(true);
  if (!weatherData) {
  }
  useEffect(() => {
    if (weatherData) {
      // WeatherData varsa konum verilerini al
      const name = weatherData.name;
      const sys = weatherData.sys.country;
      const temp = weatherData.main.temp;
      setLocationData({ name, sys, temp });
    }
  }, [weatherData]);
  // const { weather } = useContext(LocationContext);
  // console.log("Saa" + weather);

  // const { name, main, weather, sys } = weatherData;

  // const name = weatherData?.name;
  // const sys = weatherData?.sys.country;
  // const temp = weatherData?.main.temp;

  // console.log("sa" + name);

  return (
    <div className=" fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  bg-zinc-900/0 border-transparent w-full justify-between flex p-4 items-center ">
      <div className="flex justify-between">
        <div className="flex  items-center text-xl space-x-4 ">
          <AiOutlineCloud size="36" />
          <h2 className={cn("text-primary font-extrabold ", font.className)}>
            WEATHER APP
          </h2>
        </div>
      </div>
      <div className="items-center justify-center flex gap-4 cursor-pointer">
        {/* <Button variant={"premium"} size="sm">
          Button
          <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
        </Button> */}

        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline" size="icon">
              <FiMapPin size="20" />
            </Button>
          </HoverCardTrigger>

          <HoverCardContent className="w-80">
            {weatherData ? (
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="space-y-1 w-full ">
                  <h4 className="text-sm font-semibold">
                    {locationData?.name}
                  </h4>
                  <p className="text-sm w-full">From {locationData?.sys}</p>
                  <div className="flex items-center pt-2">
                    <FaTemperatureLow className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                      {locationData?.temp
                        ? (locationData.temp.toFixed(0) - 273.15).toFixed(1) +
                          "\xB0C"
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="items-center justify-center flex p-4">
                <SplashScreen finishLoading={() => setLoading(false)} />
              </div>
            )}
          </HoverCardContent>
        </HoverCard>

        <ModeToggle />
      </div>
    </div>
  );
}
