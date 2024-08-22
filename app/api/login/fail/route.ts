import { redirect } from "next/navigation";
export async function GET(request:Request) {
    console.log('로그인 실패')
    redirect(process.env.NEXT_URL)
    
}