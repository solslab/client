export default function Container({
	children,
	className
}: Readonly<{
	children: React.ReactNode;
	className?: string;
}>) {
	return <div className={`mx-auto w-full max-w-5xl px-4 ${className}`}>{children}</div>;
}
