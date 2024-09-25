import { NEXT_URL } from "@/app/lib/constants";
import { infoCheck } from "@/app/lib/actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDateOneMonthLater } from "@/app/lib/utils";
export async function GET(request:Request) {

    const url = new URL(request.url);
    const accessToken = url.searchParams.get('accessToken') || ''; 
    const prevPath = cookies().get('sols-lastPath')
    const infoTest = await infoCheck(accessToken);
    if (accessToken) {
        cookies().set('sols-accessToken', accessToken,{
            httpOnly: true,
            secure:true,
            expires:getDateOneMonthLater()
          });
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