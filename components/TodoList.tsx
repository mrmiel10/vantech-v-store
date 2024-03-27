"use client";
import { useState, useEffect, useReducer } from "react";

import { FaBars, FaXmark } from "react-icons/fa6";
import { Edit } from "lucide-react";
import { FaTrash } from "react-icons/fa6";
import { Delete } from "lucide-react";
import { DeleteIcon } from "lucide-react";
import { FaDeleteLeft } from "react-icons/fa6";
import $ from "jquery";


export default function TodoList() {
  type defineTabTache = { id: number; task: string; mark?: boolean }[];
const [re,usere] = useState('')
  const [tache, setTache] = useState("");
  const [tabTache, setTabTache] = useState<defineTabTache>([]);
  const [doTask, setDoTask] = useState<defineTabTache>([]);
  console.log(tabTache);

  const handleChange = (event: any) => {
    setTache(event.target.value);
  };
  //console.log(tache);

  const addTabTache = () => {
    setTabTache((prev: defineTabTache) => {
      return [{ id: prev.length + 1, task: tache, mark: false }, ...prev];
    });
    setTache("");
  };
  const deleteTask = (id: number) => {
    const newTabTask = tabTache.filter((item, index) => item.id != id);
    setTabTache(newTabTask);
  };
  const [idTask, setIdTask] = useState<number>(0);
  const getUpdate = (id: number, task: string) => {
    setTache(task);
    setIdTask(id);
    console.log(id);
  };
  const updateTask = () => {
    setTabTache(
      tabTache.map((item) => {
        if (item.id === idTask) {
          item.task = tache;
        }
        return item;
      })
    );
    setTache("");
    setIdTask(0);
   
  };
  const deleteAllTask = (isTabTache:boolean) => {
    if(isTabTache)  setTabTache([]);
    else setDoTask([]);
  };
  console.log(tache);
  const markTask = (id: number) => {
    setTabTache(
      tabTache.map((item: any) => {
        if (item.id === id) {
          setDoTask((prev: defineTabTache) => {
            return [
              { id: prev.length + 1, task: item.task, mark: !item.mark },
              ...prev,
            ];
          });

          return { ...item, mark: !item.mark };
        }
        return item;
      })
    );
    setTabTache(tabTache.filter((item, index) => item.id != id));
  };
  const deleteMark = (id:number) => {
   setDoTask(doTask.map((item:any)=>{
    if(item.id === id) {
      setTabTache((prev:defineTabTache) => {
        return [
          ...prev,{id: prev.length + 1, task: item.task, mark: !item.mark}
        ];
      }

      )
      return { ...item, mark: !item.mark };
    }
    return item
   }))
   setDoTask(doTask.filter((item,index) => item.id!= id))
  }

  return (
    <>
      <div className="Todo-tache mt-8">
        <h1 className="text-4xl bg-gray-400 py-5 text-white">
          Ma Todo-Gesto-tâche
        </h1>
        
        <div className="px-8 mt-8">
          <div className="flex flex-col">
            <label htmlFor="forTask">Ajouter une tâche...</label>
            <input
              id="forTask"
              value={tache}
              onChange={handleChange}
              type="text"
              className="max-w-[350px] f400:max-w-[300px] mb-8 mt-2 outline-none rounded-md focus:ring-4 ring-black  px-8 py-4"
            ></input>
          </div>
          <div className="flex space-x-3">
            
          {  tache && idTask == 0 && (
            
            
              <button
                onClick={addTabTache}
                className="cursor-pointer bg-black text-white rounded-md px-4 py-4"
              >
                Ajouter une tâche
              </button>
              
            
          )}
          { idTask!=0 &&(
            <button
            onClick={updateTask}
            className="cursor-pointer ml-4 bg-black text-white rounded-md px-4 py-4"
          >
            Modifier une tâche
          </button>

          )

          }

          </div>

          <div className="flex flex-row my-4 items-center text-2xl space-x-3">
            <p className=" font-bold uppercase">à faire</p>
            {tabTache.length != 0 && (
              <a onClick={() => deleteAllTask(true)} className="cursor-pointer">
                Tout Effacer   
              </a>
            )}
          </div>

          <div className="flex items-center justify-center tabTache mt-8 min-h-[200px] w-full p-4 mb-4">
            {!tabTache.length ? (
              <p>Votre todoList est vide</p>
            ) : (
              <ul className="w-[600px]  space-y-10">
                {tabTache.map((item) => {
                  return (
                    
                    <li key ={item.id}
                      className="min-h-10 flex justify-between  items-center rounded-lg bg-white shadow-md px-8 py-4 "
                      
                    >
                      <div className=" flex items-center space-x-3 w-[70%]">
                      <input className=" cursor-pointer w-5 h-5" onChange={() => markTask(item.id)} type="checkbox" name="checkb"/>
                      <span className="flex items-center">{item.task}</span>

                      </div>
                      
                      <div className="w-[30%] flex   justify-center items-center space-x-5">
                        {/* <button onClick={() => markTask(item.id)}>
                          Marquer
                        </button> */}
                       
                        <button
                          onClick={() => deleteTask(item.id)}
                          className="flex justify-center items-center cursor-pointer  bg-black text-white rounded-md px-4 py-4"
                        >
                          <FaTrash  style={{width:"20px",height:"20px"}} />
                         
                        </button>
                        <button
                          onClick={() => getUpdate(item.id, item.task)}
                          className="flex justify-center items-center cursor-pointer bg-black text-white rounded-md px-4 py-4"
                        >
                          <Edit  style={{width:"20px",height:"20px"}}/>
                          
                        </button>
                      </div>
                    </li>
                   
                  );
                })}
              </ul>
            )}
          </div>
          <div>
            <div className="flex space-x-3 text-2xl">
            <h1 className="font-bold uppercase ">Termine</h1>
            {doTask.length != 0 && (
              <a onClick={() => deleteAllTask(false)} className="cursor-pointer">
                Tout Effacer
              </a>
            )}
            </div>
            
            <div className="flex items-center justify-center tabTache mt-8 min-h-[200px] w-full p-4 mb-4">
              <ul className="w-[600px]  space-y-10">
                {doTask.map((item) => {
                  return (
                    <li
                      className="min-h-10 flex justify-between  items-center px-8 py-4 text-gray-400"
                      key={item.id}
                    >
                      <span className="line-through">
                        {item.task}
                      </span>
                      <a onClick={()=> deleteMark(item.id)} className="text-gray-700 cursor-pointer">Annuler</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
