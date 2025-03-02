export default function XsContainer({
    children,className
  }: Readonly<{
    children: React.ReactNode;
    className?:string;
  }>) {
    return <div className={`max-w-xl w-full mx-auto px-4 py-20 ${className}`}>{children}</div>;
  }
  