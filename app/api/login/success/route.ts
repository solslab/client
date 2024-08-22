import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function GET(request:Request) {
    const baseUrl:string = process.env.NEXT_URL || '';
    const url = new URL(request.url);
    const accessToken = url.searchParams.get('accessToken'); 
    const prevPath = cookies().get('sols-lastPath')
    if (accessToken) {
        cookies().set('sols-accessToken', accessToken);
    }
    if(prevPath){
        redirect(baseUrl+prevPath.value)
    }
    redirect(baseUrl)
    
}