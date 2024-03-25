import { baseURL } from '@/lib/helpers';
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

export default function useSocket() {
    const [socket, setSocket] = useState(null);
    const socketRef = useRef(null); // Store reference to avoid re-initialization

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = io(baseURL, {
                // Optional Socket.IO client options (authentication, reconnection, etc.)
            });
            setSocket(socketRef.current);
        }

        // Cleanup function to disconnect on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [baseURL]);

    return {socket};
}