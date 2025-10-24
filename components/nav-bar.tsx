import React from 'react'
import { DropdownNavbar } from './dropdown-navbar'

const NavBar = () => {
  return (
    <div className='flex justify-between p-5'>
        <div>Weather App</div>
        <DropdownNavbar/>
    </div>
  )
}

export default NavBar