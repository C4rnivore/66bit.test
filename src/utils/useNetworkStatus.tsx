import { useEffect, useState } from "react";

export const useNetworkStatus = () =>{
    const [online, setOnline] = useState<boolean>(typeof window !== "undefined" ? window.navigator.onLine : true)

    useEffect(()=>{
        const onStatusChange = () =>{
            setOnline(navigator.onLine)
        }

        window.addEventListener('online', onStatusChange)
        window.addEventListener('offline', onStatusChange)

        return () => {
            window.removeEventListener("online", onStatusChange);
            window.removeEventListener("offline", onStatusChange);
        }
    },[])

    return online;
}
