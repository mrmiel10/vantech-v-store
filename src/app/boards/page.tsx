"use client"
import React from "react";
import BoardForm from "../../../components/boardForm";
import ListBoard from "../../../components/listBoard";
export const Page = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 ">
          <p className="font-bold text-red-500 mb-2">Boardy</p>
          <hr></hr>
        </header>
        <div className="grow grid grid-rows-[1fr_auto]">
          <BoardForm />
          <ListBoard />
        </div>
        <footer className="flex justify-center items-center text-5xl min-h-[100px] bg-red-400 text-white shadow-md">
          <p className="text-bold">Boardy</p>
        </footer>
      </div>
    </>
  );
};
export default Page;
