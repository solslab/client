import { fetchCompanyDetail, fetchPositionData } from "@/app/lib/data";
import { Company, Position, TestData } from "@/app/lib/definitions";
import Container from "@/app/ui/container";
import { notFound } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { position?: string };
}) {
  const company_id = params.id;

  const companyData: Company = await fetchCompanyDetail(company_id);
  if (!companyData) {
    notFound();
  }
  const positions: Position[] = companyData.positions;
  const position_id = searchParams.position || positions[0].position_id;

  return (
    <main className="flex min-h-screen  justify-between py-20 bg-white">
      <Container>
        <div>
          <div className="text-3xl font-bold">정보 수정 요청</div>
          <div className="px-5 py-16">
            <div className="flex">
              <div
                className="bg-no-repeat bg-center w-16 h-16 rounded-md "
                style={{ backgroundImage: ` url(${companyData.company_logo})` }}
              />
              <div className="flex flex-row items-center ml-2">
                <div className="text-xl md:text-3xl ">
                  {companyData.company_name}
                </div>
              </div>
            </div>
            <div className=" w-full mt-4">
              <input
                className=" w-full border border-gray-50 px-2 py-1 rounded-lg"
                placeholder="제목을 작성해주세요."
              />
              <textarea
                className=" w-full h-80  border border-gray-50 px-2 py-1 rounded-lg mt-4"
                placeholder="내용을 작성해주세요."
              />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
