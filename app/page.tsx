import { getServerSession } from "next-auth";
import { MainLogin } from "./Components/Buttons";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  if (session){
    redirect("/chat")
  }

  return (

    <div className="max-w-xl mx-auto border rounded-lg p-10 mt-32">
      <h1 className="text-4xl font-semibold text-center">Login to use SHUTApp!</h1>
      <div className="mt-8">
        <MainLogin />
      </div>
    </div>
  );
}
