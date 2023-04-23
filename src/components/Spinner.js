import React from 'react'
import "../static/spinner.css"

export const Spinner = () => {
  return (
    <div className='middle'>
        <div className="lds-facebook"><div></div><div></div><div></div></div>
    </div>
  )
}
