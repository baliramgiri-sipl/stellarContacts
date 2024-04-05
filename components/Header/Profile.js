"use client"
import {
  LogOut,
  Settings,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TypographySmall } from "../Typegraphy/Typography"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { persistor } from "@/redux/store"
import { useHotkeys } from "react-hotkeys-hook"
import { useRouter } from "next/navigation"
import avatarImg from "@/public/avatarPng.png"
import Link from "next/link"
import useShortKeys from "@/hooks/useShortKeys"
export default function DropdownMenuDemo() {
  const { data } = useSession()
  const { push } = useRouter()

  const logout = () => {
    signOut().then(async () => {
      await persistor.purge().then(() => {
        localStorage.removeItem("access_token")
        window.location.href = "/login"
      });
    })

  }
  const { toggleFullscreen } = useShortKeys()

  useHotkeys('q', logout)
  useHotkeys('s', () => push('/settings'))
  useHotkeys('f', toggleFullscreen)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-wrap items-center gap-2 cursor-pointer hover:text-green-500">
          {/* <UserCircle size={15} /> */}
          <div className="w-[35px] h-[35px] border rounded-full">
            <Image src={avatarImg} className="object-cover w-full h-full" alt="Avatar" />
          </div>
          <div className="flex flex-col ">
            <TypographySmall title={`${data?.user?.first_name || ""} ${data?.user?.last_name || ""}`} />
            <span className="text-[9px] text-neutral-500">{data?.user?.UserType?.name || ""}</span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <Link href={"/settings"}><span>Settings</span></Link>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
