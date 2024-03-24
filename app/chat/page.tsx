import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";
import Form from "../Components/Form";
import ChatComponent from "../Components/Chat";
import { prisma } from "../lib/db";

async function getData(){
  const data = await prisma.message.findMany({
    select: {
      message: true,
      id: true,
      User: {
        select:{
          name: true,
          image: true
        }
      }
    },
    orderBy: {
      createdAt: 'asc'
    },
    take: 1000
  })

  return data;
}

//! DO NOT DELETE
export const dynamic = "force-dynamic";
//! DO NOT USE

export default async function Chathomepage() {
  const session = await getServerSession(authOptions);
  const data = await getData()
  if (!session) {
    redirect("/");
  }

  return (
    <div className="h-screen bg-gray-200 dark:bg-background flex flex-col">
      <ChatComponent data={data as any}/>
      <Form />
    </div>
  );
}
