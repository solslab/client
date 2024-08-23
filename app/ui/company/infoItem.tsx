import Image from "next/image";

export default async function InfoItem({src,label,data}:{src:string;label:string;data:string;}) {
    return (
        <div className="pb-4">
                    <div className="flex justify-between py-2">
                      <div className="flex">
                        <div className="flex flex-col justify-center"><Image
                          src={src}
                          width={24}
                          height={24}
                          alt="time icon"
                        /></div>
                        <div className="ml-2 text-gray-700 text-sm md:text-base my-auto">{label}</div>
                      </div>
                      <div className="text-base md:text-lg my-auto">{data}</div>
                    </div>
                  </div>
    )
}