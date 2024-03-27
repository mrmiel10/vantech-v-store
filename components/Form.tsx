import { useState } from "react"

export default function Form(){
    type typeForm = {htmlFor?:string,valueLabel?:string,typeInput:string,nameInput:string,idInput?:string}[]
    const buildForm:typeForm = [
        {
            htmlFor:"forName",
            valueLabel:"Nom",
            typeInput:"text",
            nameInput:"nom",
            idInput:"forName"
        },
        {
            htmlFor:"forSurname",
            valueLabel:"Prenom",
            typeInput:"text",
            nameInput:"prenom",
            idInput:"forPrenom"
        },
        {
            htmlFor:"forSurname",
            valueLabel:"mot de passe",
            typeInput:"password",
            nameInput:"password",
            idInput:"forPassword"
        },
        {            
           
            typeInput:"checkbox",
            nameInput:"checkPolitique",           
          
        }
       
    ]
  
    type defineDataForm = {[key:string]:string}
    const [dataForm,setDataForm] = useState<defineDataForm>({})
    
    const handleChange = (event:any)=>{
       
        console.log(event.target)
        const {type,name,value} = event.target
        setDataForm(prev =>{
            return {...prev,
                [name]:value,
               
            }
        })
    }
    console.log(dataForm)
    const formBuild = buildForm.map((item,index)=>{
       if(item.typeInput === "checkbox") return <div className="flex flex-row space-x-3"><input  value={dataForm.name || ""} onChange={handleChange} type={item.typeInput} name={item.nameInput}/><p>Accepter les conditions dutilisation</p></div>
       else return  <div className="flex flex-col">
       <label className="" htmlFor={item.htmlFor}>{item.valueLabel}</label>
       <input value={dataForm.name || ""} onChange={handleChange} className="w-[250px]" type={item.typeInput} name={item.nameInput} id={item.idInput}/>
   </div>
    })
    return(
    <>
        <form>
           {formBuild}
           <button className="px-4 py-2 bg-black text-white rounded-md">Soumettre</button>          
                       
        </form>
    </>
    )
}