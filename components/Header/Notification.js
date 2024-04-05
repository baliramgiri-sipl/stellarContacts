import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Notification = ({ children }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[250px] right-0 ">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <div className='flex flex-wrap gap-2'>
                            <div className='w-[10px] mt-1 h-[10px] bg-blue-600 rounded-full'></div>
                            <div className='flex-1'>
                                <span>Baliram Giri</span>
                                <p className='m-0 text-[9px] line-clamp-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, excepturi!</p>
                            </div>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Notification