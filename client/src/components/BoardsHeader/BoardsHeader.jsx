import React from 'react'
import './BoardsHeader.css'
import AccountDetails from '../AccountDetails/AccountDetails'

export default function BoardsHeader() {
    const [isDesckTop, setIsDesckTop] = React.useState(false)

    React.useLayoutEffect(() => {
        let ref 
        setIsDesckTop(window.innerWidth > 1050)
        let listener =  () => {
            setIsDesckTop(window.innerWidth > 1050)
        }
        ref = window.addEventListener("resize",listener)

        return ()=> {
            window.removeEventListener("resize", listener)
        }
    }, [])
    return (
        <div className='boardsHeader'>
            
            {isDesckTop&& <AccountDetails/>}
        </div>
    )
}
