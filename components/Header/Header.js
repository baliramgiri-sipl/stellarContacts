"use client"
import React, { useMemo } from "react";
import logo from "@/public/stellar_logo.png";
import Image from "next/image";
import { TypographySmall } from "../Typegraphy/Typography";
import NavigationToolBar from "./NavigationToolBar";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const Profile = dynamic(() => import("./Profile"), { ssr: false, loading: () => <>Loading...</> })

const Header = () => {
    const { push } = useRouter()
    const pathaName = usePathname()
    const links = useMemo(
        () => [
            {
                link: "/users",
                lable: "Users",
            },
            {
                link: "/websites",
                lable: "Websites",
            },
            {
                link: "/contacts",
                lable: "Contacts",
            },
        ],
        []
    );
    return (
        <header className="border-b py-3 flex-wrap px-3 flex items-center lg:gap-16 gap-10">
            <Image
                onClick={() => push("/")}
                className="cursor-pointer"
                src={logo}
                width={200}
                alt="Stellar Logo"
            />
            <ul className="flex gap-6 items-center flex-wrap">
                {links.map(({ lable, link }) => (
                    <li key={lable} onClick={() => {
                        //navigate to the page
                        push(link)
                    }} className={`${pathaName === link ? "border-b-2 border-green-500 " : ""} cursor-pointer hover:text-green-500`} >
                        <TypographySmall title={lable} />
                    </li>
                ))}
            </ul>
            <div className="flex gap-6 flex-wrap items-center ms-auto">
                <NavigationToolBar />
                <Profile />
            </div>
        </header>
    );
};

export default Header;
