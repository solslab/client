'use client';
import { Button } from "../shadcn/components/ui/button";

export default function TrLink({ onClick }: { company_id?: string,onClick:()=>Promise<void> }) {


	return (
		<>
			<Button onClick={onClick} type="button" variant="main" className="px-10 py-5">
				코딩테스트 후기 작성하기
			</Button>
		</>
	);
}
