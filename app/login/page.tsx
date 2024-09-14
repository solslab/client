"use client";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  // const router = useRouter()
  // const pathName = usePathname();
  // useEffect(() => {
  //   const previousPath = document.referrer;
  //   console.log(previousPath)
  //   if (previousPath) {
  //     updateLastRoute(previousPath);
  //   }
  // }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-24 bg-gradient-to-b from-login-start via-login-middle to-login-end">
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          width={201}
          height={101}
          className="mx-auto w-auto h-auto"
          src="/icons/logo_dark.png"
          alt="Sols"
        />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <Link
            href="https://solslab.site/api/oauth2/authorization/kakao"
            className="flex  justify-center rounded-md   text-sm font-semibold  text-white shadow-sm"
          >
            <Image src='/icons/kakao_login_medium_wide.png' alt='kakao button' width={300} height={45} />
          </Link>
        </div>
      </div>
    </div>
    </main>
  );
}
