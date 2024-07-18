import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/options"

export async function getSession(){
    const session=await getServerAuthSession()
    return session
}