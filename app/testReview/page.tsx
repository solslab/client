import SmallContainer from "../ui/smallContainer";
import { fetchProfile } from "../lib/data";
import { Profile } from "../lib/definitions";
import { findPlatformAndLabel } from "../lib/utils";
import LanguageBox from "../ui/languageBox";
import FieldBox from "../ui/fieldBox";
import Input from "../ui/input";
import XsContainer from "../ui/xsContainer";
import TrForm from "../ui/trForm";

export default async function Page() {
  return (
    <main className="flex min-h-screen  justify-between ">
      <XsContainer>
        <TrForm />
      </XsContainer>
    </main>
  );
}
