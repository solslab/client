'use server';

import SmallContainer from '../ui/smallContainer';
import BaseLink from '../ui/profile/baseLink';
import DeletionBtn from '../ui/profile/deletionBtn';
import ProfileContents from '../ui/profile/profileContents';
import ScrollToTop from '../ui/ScrollToTop';

export default async function Page() {
	return (
		<>
			<ScrollToTop />
			<SmallContainer>
				<div className="text-2xl font-bold text-title-black">내 프로필</div>
				<ProfileContents />
				<BaseLink text={'정보 수정하기'} href={'/profiles/edit'} />
				<DeletionBtn />
			</SmallContainer>
		</>
	);
}
