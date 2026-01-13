import { useEffect } from "react";

const useWindowUnloadEffect = (handler: () => void, callOnCleanup = false) => {
    useEffect(() => {
        const unloadHandler = () => handler();
        window.addEventListener("beforeunload", unloadHandler);

        return () => {
            if (callOnCleanup) handler();
            window.removeEventListener("beforeunload", unloadHandler);
        };
    }, [handler, callOnCleanup]);
};

export default useWindowUnloadEffect;
