export default function Container({
  children,className
}: Readonly<{
  children: React.ReactNode;
  className?:string;
}>) {
  return <div className={` w-full max-w-6xl  mx-auto px-4 ${className}`}>{children}</div>;
}
