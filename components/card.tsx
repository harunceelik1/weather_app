import React, { MouseEvent, useState, useEffect, useContext } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Weatherstatus from "./weathetstatus";
import fetchWeather from "../app/api/weather/weatherApi";
import { WeatherContext } from "@/context/weatherContext";
import Image from "next/image";
export default function Card() {
  const { setWeatherData } = useContext(WeatherContext);

  const [weatherstat, setWeather] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  useEffect(() => {
    handleLocationPermission();
    if (location.latitude !== null && location.longitude !== null) {
      fetchWeather(city, location.latitude, location.longitude)
        .then((data) => {
          setWeather(data);
          setWeatherData(data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);

      console.error("Konum bilgisi alınamadı!");
    }
  }, [location.latitude, location.longitude]);
  const handleLocationPermission = () => {
    // Konum bilgisi istenilen fonksiyon yukarıda çağırıyoruz.
    if (!navigator.geolocation) {
      toast.error("Tarayıcı konum özelliğini desteklemiyor.");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          toast.error("Konum izni reddedildi.");
        }
      );
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    fetchWeather(city, location.latitude, location.longitude)
      .then((data) => {
        setWeather(data);
      })

      .finally(() => {
        setLoading(false);
      });
  };
  // console.log("render");
  function handleMouseMove({ clientX, clientY, currentTarget }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <Toaster position="top-center" />
      <div
        onMouseMove={handleMouseMove}
        className=" overflow-hidden  relative border rounded-xl hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 border-transparent border-zinc-600 transition duration-1000"
      >
        <motion.div
          className="rounded-xl pointer-events-none absolute -inset-px  opacity-80 transition duration-1000 group-hover:opacity-50"
          style={{
            background: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px,rgb(244 244 245 / 0.10),transparent 80%  )`,
          }}
        />
        <article className=" relative w-full h-full p-4 md:p-8  ">
          <div className="flex items-center justify-between gap-2 ">
            <div className="text-zinc-600 dark:text-zinc-100">Time</div>
            <span className="flex  items-center gap-1 text-xs text-zinc-600 dark:text-zinc-100 ">
              <AiOutlineEye className={" text-xl "} />
              <p className="text-zinc-400">{date}</p>
            </span>
          </div>
          <h2
            className={cn(
              " font-bold text-3xl dark:text-zinc-100 text-zinc-500 sm:text-4xl   mt-4 "
            )}
          >
            Current Weather
          </h2>
          <p
            className={cn(
              " mt-4 leading-8 text-zinc-600 dark:text-zinc-400 group-hover:text-white transition duration-00"
            )}
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
              <motion.div
                whileHover={{ scale: 1.1, rotate: 0 }}
                whileTap={{
                  scale: 0.8,
                  rotate: 0,
                  borderRadius: "100%",
                }}
              >
                <Button type="submit" onClick={handleSubmit}>
                  <FiSearch className="" />
                </Button>{" "}
              </motion.div>
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
