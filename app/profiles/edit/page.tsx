import SmallContainer from "@/app/ui/smallContainer";
import { fetchProfile } from "@/app/lib/data";
import { Profile } from "@/app/lib/definitions";
import { findPlatformAndLabel } from "@/app/lib/utils";
import ProfileEdit from "@/app/ui/profile/profileEdit";

export default async function Page() {
  const profileData: Profile = await fetchProfile();
  const platformAndLabel = findPlatformAndLabel(
    profileData.al_platform,
    profileData.member_tier
  ) || { platform: "알수없음", label: "" };
  return (
      <SmallContainer>
        <ProfileEdit profileData={profileData} />
      </SmallContainer>
  );
}
