"use client"
//"use server"
import Head from 'next/head'
import { useState,useEffect } from 'react'
import Navbar  from '../../../components/Navbar'

import next from 'next'

export default  function Home() {  
  //const {name,prenom} = req.query
 // res.status(200).json({nom:"daedddd"})

  useEffect(() => {
    const selectedli = document.querySelector('.li4')
    console.log(selectedli)
     if(selectedli) {
     selectedli.classList.add('bg-blue-500','rounded-lg','text-white')
     }
  },[]);
 
   
  return (
    <>    
     
      <Navbar />
      
    </>
    

  )
}
