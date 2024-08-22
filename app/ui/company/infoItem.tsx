import Image from "next/image";

export default async function InfoItem({src,label,data}:{src:string;label:string;data:string;}) {
    return (
        <div className="pb-4">
                    <div className="flex justify-between py-2">
                      <div className="flex">
                        <Image
                          src={src}
                          width={24}
                          height={24}
                          alt="time icon"
                        />
                        <div className="ml-2 text-gray-700 text-base my-auto">{label}</div>
                      </div>
                      <div className="text-lg my-auto">{data}</div>
                    </div>
                  </div>
    )
}