'use client';
import { getToken } from '@/app/lib/cookie';
import { infoCheck } from '@/app/lib/actions';
import { useState } from 'react';
import TierModal from './tierModal';
import { useRouter } from 'next/navigation';

export default function TrLink({company_id}:{company_id?:string}) {
  const[modalVisible,setModalVisible] = useState(false);
  const router = useRouter()

	return (
		<>
			<div
			>
				<button onClick={async () => {
					const tokenCookie = await getToken();
					const token = tokenCookie?.value || undefined;
					if (!token) {
						{
							router.push('/login')
						}
					}
					const infoChecked = await infoCheck(token);
					if (infoChecked) {
						router.push(`/testReview${company_id?'?company_id='+company_id:''}`)
					}
          else{
           setModalVisible(true);
          }
				}} type="button" className=" rounded-md text-lg bg-main-base px-6 py-3 text-white">
					코딩테스트 후기 작성하기
				</button>
			</div>
      {
        modalVisible?
        <TierModal setVisible={setModalVisible}/>
        :
        <></>
      }
		</>
	);
}
