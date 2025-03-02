import SmallContainer from '@/app/ui/common/smallContainer';

import { Profile } from '@/app/lib/types/models';
import { findPlatformAndLabel } from '@/app/lib/utils/helpers';
import ProfileEdit from '@/app/ui/profile/profileEdit';
import { fetchProfile } from '@/app/lib/server/queries/user';

export default async function Page() {
	const profileData: Profile = await fetchProfile();
	const platformAndLabel = findPlatformAndLabel(Number(profileData.member_tier)) || {
		label: ''
	};
	return (
		<SmallContainer>
			<ProfileEdit profileData={profileData} />
		</SmallContainer>
	);
}
