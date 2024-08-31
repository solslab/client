
import Image from "next/image";

export default function LanguageBox({language}:{language:string}) {
  return (
    <div
      key={language}
      className="border border-gray-30 rounded-3xl px-4 py-1 mx-2 my-2 flex"
    >
      <div className="mr-2 flex flex-col justify-center">
        <Image
          src={`/icons/${language}.png`}
          alt="language logo"
          width={24}
          height={24}
        />
      </div>
      <div className="text-text-base text-base">{language}</div>
    </div>
  );
}
