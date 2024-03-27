import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

 async function InsertUsers(){
   const createBorads =  await prisma.board.createMany({
        data: [
            {title:'dldl;g;llggg'},
            {title:'dldl;g;llggg'},
            {title:'dldl;g;llggg'},
            {title:'moi'},
            {title:'dldl;g;llggg'},
            {title:'dldl;g;llggg'},
            {title:'dldl;g;llggg'},
            {title:'dldl;g;llggg'},
          ],
    })
}
InsertUsers()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
