import { useState, useEffect } from "react";

function useMobileBreakPoint(breakpoint){
    const [mobile, setMobile] = useState(false)

    useEffect(()=>{
         const handleResize = () =>{
            if(window.innerWidth < breakpoint){
                setMobile(true)
            }else{
                setMobile(false)
            }
         }

         handleResize()

         window.addEventListener('resize', handleResize);

         return() =>{
            window.removeEventListener('resize', handleResize)
         }

    }, [breakpoint])

    return mobile;
}

export default useMobileBreakPoint;