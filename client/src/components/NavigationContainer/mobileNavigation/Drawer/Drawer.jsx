import React from 'react'
import classes from  './Drawer.module.css'
import clsx from 'clsx'

export default function Drawer({ isOpen , onClose, children }) {
    
    return (
        <>
            <div className={clsx(classes.Drawer, { [classes.isOpen]:  isOpen } )}>
            
                    {children}
            </div>
            <div className={clsx(classes.overlay , {
                    [classes.hide] : ! isOpen // falsy
                }
                )}
                onClick={onClose}>
            </div>
        </>
    )
}
