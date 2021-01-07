import React from 'react'
import { useLayoutEffect, useState } from 'react'
import Sidebar from './DescktopSidebar/Sidebar'
import MobileNavigation from './mobileNavigation/MobileNavigation'

export default function NavigationContainer() {
    const [isDescktop, setIsDescktop] = useState(null)
    useLayoutEffect(() => {
        setIsDescktop(document.documentElement.getClientRects()[0].width > 1050)
        let fn = () => {
            setIsDescktop(document.documentElement.getClientRects()[0].width > 1050)
        }
        
        window.addEventListener("resize", fn)
        return () => {
                 window.removeEventListener("resize", fn)
        }
    }, [])
    return (
            <>
                { isDescktop && <Sidebar/> }
                {!isDescktop && <MobileNavigation/>}
            </>
        )
}
