import Row from "../row";

export default async function InfoTable({ query }: { query: string }) {
  return (
    <div>
      <div className="px-4 sm:px-0 py-20">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
         네이버
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          네이버는 멋져
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y ">
        <Row head={"직무 구분" } desc={"백엔드"}/>
        <Row head={"지원 언어" } desc={"C, C++, C#, Go, Java, JavaScript, Python3"}/>
        <Row head={"시험 시간" } desc={"2시간"}/>
        <Row head={"문제 수" } desc={"알고리즘 3"}/>
        <Row head={"IDE 사용" } desc={"가능"}/>
        <Row head={"구글링" } desc={"불가능"}/>
        <Row head={"히든 테스트 케이스" } desc={"있음"}/>
        <Row head={"시험 방식" } desc={"대면"}/>
        <Row head={"응시 지역/장소" } desc={"서울 을지로 본사"}/>
        <Row head={"플랫폼" } desc={"프로그래머스"}/>
        <Row head={"비고" } desc={"테스트 데이터임"}/>
        </dl>
      </div>
    </div>
  );
}
