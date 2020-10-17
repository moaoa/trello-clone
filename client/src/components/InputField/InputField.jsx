import React from 'react'
import './InputField.css'

const InputField =React.forwardRef((props, ref) => {
    return (
        <div className='InputField'>
            <input ref={ref} {...props}/>
        </div>
    )
}) 

export default InputField