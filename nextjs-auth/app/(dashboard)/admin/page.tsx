import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

const page = async () => {

    const session= await getServerSession(authOptions);

    if(session?.user){
        return <h2 className='text-4xl'>Admin page - welcome back {session?.user.username}</h2>

    }

  return (
    <div><h1 className='text-4xl'>Please login to see this admin page</h1></div>
    
  )
};

export default page
