import { useEffect } from "react";

export function useWindows(eventName:keyof WindowEventMap,callback: any){

    useEffect( ()=> {
        window.addEventListener(eventName, callback);
        return () =>{
            window.removeEventListener(eventName, callback);
        };
    });
}
