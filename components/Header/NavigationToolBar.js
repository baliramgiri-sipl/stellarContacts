import { Bell, Maximize } from "lucide-react";
import React, { useMemo } from "react";
import Notification from "./Notification";
import useShortKeys from "@/hooks/useShortKeys";

const NavigationToolBar = () => {
    const { toggleFullscreen } = useShortKeys()
    const iconsData = useMemo(
        () => [
            // {
            //     icon: <div className="notification relative" >
            //         <MessageSquareText size={15} />
            //         <div className="absolute right-[-10px] top-[-10px] w-[15px] h-[15px] rounded-full bg-orange-500 text-white flex  justify-center items-center text-[6px] font-semibold">1</div>
            //     </div>,
            //     tip: "Messages",
            // },
            {
                icon: <Maximize onClick={toggleFullscreen} size={15} />,
                tip: "Maximize Scree ⇧⌘F",
            },
            {
                icon: <Notification>
                    <div className="notification relative">
                        <Bell size={18} />
                        <div className="absolute right-[-10px] top-[-10px] w-[15px] h-[15px] rounded-full bg-green-500 text-white flex  justify-center items-center text-[6px] font-semibold">1</div>
                    </div>
                </Notification>,
                tip: "Notifications",
            },
        ],
        [toggleFullscreen]
    );
    return (
        <div className="flex items-center gap-3">
            {iconsData.map(({ icon, tip }, index) => {
                return (
                    <div title={tip} key={index} className="cursor-pointer">
                        {icon}
                    </div>
                );
            })}
        </div>
    );
};

export default NavigationToolBar;
