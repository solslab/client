export default function SmallContainer({
	children,
	className
}: Readonly<{
	children: React.ReactNode;
	className?: string;
}>) {
	return <div className={`mx-auto w-full max-w-3xl px-4 pt-20 ${className}`}>{children}</div>;
}
