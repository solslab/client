const nextUrl= process.env.NEXT_URL

export async function signIn() {
}
export async function signOut() {
}
export async function join() {
}

export async function tokenTest(token:string){
    try{
        const response = await fetch(`${nextUrl}/api/cookie/set/?token=${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
    }
    catch(error){

    }
}