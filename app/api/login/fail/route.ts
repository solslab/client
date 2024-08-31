import { redirect } from "next/navigation";
export async function GET(request:Request) {
    const url = process.env.NEXT_URL || ''
    console.log('로그인 실패')
    redirect(url)
    
}