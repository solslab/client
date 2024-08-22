import Topnav from "@/app/ui/navigation/topNav";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
        <div className="bg-white md:bg-gray-50 min-h-screen  overflow-hidden">
          {children}
        </div>
        </>
    );
  }