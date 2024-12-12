'use client';
import { getToken } from '@/app/lib/cookie';
import { infoCheck } from '@/app/lib/actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TierModal from '../company/tierModal';

export default function IndexTrLink({company_id}:{company_id?:string}) {
  const[modalVisible,setModalVisible] = useState(false);
  const router = useRouter()

	return (
		<>
			<div
            className='flex justify-center flex-row'
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
				}} type="button" className="rounded-[10px] border-2 border-main-base px-3 py-2 text-center font-bold text-main-base md:px-6 md:py-4">
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
