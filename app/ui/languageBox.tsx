
import Image from "next/image";
import { SKILLS_LOGO } from "../lib/constants";

export default function LanguageBox({language}:{language:string}) {
  return (
    <div
      key={language}
      className="border border-gray-30 rounded-3xl px-4 py-1 mx-2 my-2 flex"
    >
      <div className="mr-2 flex flex-col justify-center">
        {
          SKILLS_LOGO[language]?.logo?
          <Image
          src={SKILLS_LOGO[language]?.logo }
          alt="language logo"
          width={24}
          height={24}
        />
        :<></>
        }
      </div>
      <div className="text-text-base text-base">{language}</div>
    </div>
  );
}
