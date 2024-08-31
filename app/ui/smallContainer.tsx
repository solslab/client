export default function SmallContainer({
    children,className
  }: Readonly<{
    children: React.ReactNode;
    className?:string;
  }>) {
    return <div className={`max-w-3xl w-full mx-auto px-4 py-20 ${className}`}>{children}</div>;
  }
  