import { NEXT_URL } from "@/app/lib/constants";
import { redirect } from "next/navigation";
export async function GET(request:Request) {

    redirect('/')
    
}