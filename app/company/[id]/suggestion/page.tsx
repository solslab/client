import { fetchCompanyDetail, fetchPositionData } from "@/app/lib/data";
import { Company, Position, TestData } from "@/app/lib/definitions";
import BaseButton from "@/app/ui/baseButton";
import BaseSubmitButton from "@/app/ui/baseSubmitButton";
import Container from "@/app/ui/container";
import SuggestionForm from "@/app/ui/company/suggestionForm";
import { BaseNextResponse } from "next/dist/server/base-http";
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
  const position_id = searchParams.position || positions[0]?.position_id;
  if(!position_id){
    notFound();
  }

  return (
    <main className="flex min-h-screen  justify-between py-20 bg-white">
      <Container>
        <div>
          <div className="text-3xl font-bold">정보 수정 요청</div>
          <div className="px-5 py-16">
            <div className="flex">
              <div
                className="bg-cover bg-no-repeat bg-center w-16 h-16 rounded-md border-gray-10 "
                style={{ backgroundImage: ` url(${companyData.company_logo})` }}
              />
              <div className="flex flex-row items-center ml-2">
                <div className="text-xl md:text-3xl ">
                  {companyData.company_name}
                </div>
              </div>
            </div>
            <SuggestionForm position_id={position_id}/>
          </div>
        </div>
      </Container>
    </main>
  );
}
