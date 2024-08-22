import { deleteToken } from "@/app/lib/cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function GET(request: Request) {
    await deleteToken();
}