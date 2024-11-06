export default function Layout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className="overflow-hidden bg-bg-base">{children}</div>
		</>
	);
}
