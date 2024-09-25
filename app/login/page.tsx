import Image from "next/image";
import Link from "next/link";
import Float from "../ui/interaction/float";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인 | 몇솔",
};

export default function Page() {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-24 relative">
      <Float/>
      <div className=" absolute w-full h-full  bg-white bg-opacity-65 backdrop-blur-sm">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          width={201}
          height={101}
          className="mx-auto"
          src="/icons/logo_login.png"
          alt="Sols"
        />
      </div>

      <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <Link
            href="https://solslab.site/api/oauth2/authorization/kakao"
            className="flex flex-wrap  justify-center rounded-md   text-sm font-semibold  text-white shadow-sm"
          >
            <Image src='/kakao_login.png' alt='kakao button' width={230} height={52} />
          </Link>
        </div>
      </div>
    </div>
      </div>

    </div>
  );
}
