import { useState } from 'react'

const useShortKeys = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const toggleFullscreen = () => {
        if (!isFullscreen) {
            // Enter fullscreen
            if (document?.documentElement.requestFullscreen) {
                document?.documentElement.requestFullscreen();
            } else if (document?.documentElement.webkitRequestFullscreen) { /* Safari */
                document?.documentElement.webkitRequestFullscreen();
            } else if (document?.documentElement.msRequestFullscreen) { /* IE11 */
                document?.documentElement.msRequestFullscreen();
            }
        } else {
            // Exit fullscreen
            if (document?.exitFullscreen) {
                document?.exitFullscreen();
            } else if (document?.webkitExitFullscreen) { /* Safari */
                document?.webkitExitFullscreen();
            } else if (document?.msExitFullscreen) { /* IE11 */
                document?.msExitFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen); // Toggle fullscreen state
    };
    return { toggleFullscreen }
}


export default useShortKeys