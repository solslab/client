

import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";


export default async function Page({
    searchParams
  }: {
    searchParams: {accessToken?:string,message?:string};
  }) {
    if (searchParams.accessToken) {
        const res = await fetch(`${process.env.NEXT_URL}/api/cookieTest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accessToken: searchParams.accessToken }),
        });
    }
    const message = searchParams.message || '메세지 없음';
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>

          </div>
          <div>
            {message}
          </div>
        </form>
      </div>
    </div>
  );
};

