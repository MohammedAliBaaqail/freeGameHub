import React from 'react'
import './Loading.scss'
export const Loading = () => {
  return (
    <div className='loading'>
      <h1>Loading...</h1>
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}
