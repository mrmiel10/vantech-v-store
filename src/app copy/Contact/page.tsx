"use client"
import { useState,useEffect } from 'react'
import Navbar from "../../../components/Navbar";
import { DecLink } from "../../../components/Navbar"

export default function Contact() {
    useEffect(() => {
        const selectedli = document.querySelector('.li3')
        console.log(selectedli)
         if(selectedli) {
         selectedli.classList.add('bg-blue-500','rounded-lg','text-white')
         }
      },[]);
  return (
    <>
      <head>
        <title>Contact</title>
      </head>
      <DecLink title = "3"/> 
      <Navbar />
    </>
  );
}
