"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { MdOutlineQuiz } from "react-icons/md";
import Image from 'next/image'
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div className="pt-5 w-full">
      <div className="max-w-[1500px] mx-auto w-[90%] flex justify-between items-center border-b pb-5">
        <div>
          <Link
            href={"/"}
            className="flex gap-1 items-center text-2xl"
          >
            {/* <h1 className="text-dark font-bold">Mo</h1> */}
            {/* <MdOutlineQuiz className="text-primary" /> */}
            <Image alt="logo" src="/logo-me-white.png" width={100} height={100} />
          </Link>
        </div>

        <div className="md:block hidden text-nowrap">
          <span className="px-5 py-1 rounded-md text-white bg-gradient-to-r from-pink-500 to-red-500">
            This week's Category: Lebanon vs Israel
          </span>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <UserMenu />
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
