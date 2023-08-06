import React from "react";
import avatar from "@/public/assets/avatar.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Sparkles } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { AiOutlineCloud } from "react-icons/ai";
import { Poppins } from "next/font/google";
const font = Poppins({
  weight: "800",
  subsets: ["latin"],
});
export default function Header() {
  return (
    <div className=" fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  bg-zinc-900/0 border-transparent w-full justify-between flex p-4 items-center ">
      <div className="flex justify-between">
        {/* <Image src={avatar} width={40} height={40} alt="image" /> */}
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
        <ModeToggle />
        {/* <Link href={"/"}>Teams</Link>
        <Link href={"/"}>Teams</Link>
        <Link href={"/"}>Teams</Link> */}
      </div>
    </div>
  );
}
