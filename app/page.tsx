"use client"

import React, {useState} from 'react'
import { Button } from '@/components/ui/button'
import { DropdownNavbar } from '@/components/dropdown-navbar'
import Content from '@/components/content'

const Page = () => {

  const[value, setValue] = useState(true)  

  return (
    <>
      <DropdownNavbar value={value} setValue={setValue}/>
      <Content value={value}/>
    </>
  )
}

export default Page