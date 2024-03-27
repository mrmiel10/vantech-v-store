import prisma from "../../../../db";
import Proposition from "../../../../components/proposition";
import { FindProposition } from "../../../../index";
import ListProposition from "../../../../components/listProposition";
import PropositionForm from "../../../../components/propositionForm";

export default async function board({
    params,
    searchParams,
} : {
    params: {boardId: string};
    searchParams?: {[key:string] : string | string[] | undefined}
}
    
){
    
    //const boardId = Number(params.boardId)
    
    return (
        <>
        <p>dddkkd</p>
         <PropositionForm boardId={params.boardId} />
        < ListProposition boardId={params.boardId}/>
        {/* <h1>Boards</h1>
        <p>{params.boardId}</p>
        <p>{JSON.stringify(searchParams)}</p> */}
       
    </>
    )
   

}