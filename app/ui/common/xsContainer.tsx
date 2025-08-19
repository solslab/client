export default function XsContainer({
	children,
	className
}: Readonly<{
	children: React.ReactNode;
	className?: string;
}>) {
	return <div className={`mx-auto w-full max-w-xl px-4 py-20 ${className}`}>{children}</div>;
}
