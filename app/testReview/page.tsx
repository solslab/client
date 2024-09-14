import XsContainer from "../ui/xsContainer";
import TrForm from "../ui/trForm";

export default async function Page() {
  return (
    <div className="flex min-h-screen  justify-between pt-16 ">
      <XsContainer>
        <TrForm />
      </XsContainer>
    </div>
  );
}
