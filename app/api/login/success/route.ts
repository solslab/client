import { NEXT_URL } from "@/app/lib/constants";
import { infoCheck } from "@/app/lib/actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function GET(request:Request) {

    const url = new URL(request.url);
    const accessToken = url.searchParams.get('accessToken') || ''; 
    const prevPath = cookies().get('sols-lastPath')
    const infoTest = await infoCheck(accessToken);
    console.log(infoTest,'@@@@')
    if (accessToken) {
        cookies().set('sols-accessToken', accessToken);
    }
    if(!infoTest){
        redirect('/profiles/additional')
    }
    if(prevPath){
        redirect(prevPath.value)
    }
    else{
        redirect('/')
    }
    
}