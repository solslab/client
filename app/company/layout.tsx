export default function Layout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className="overflow-hidden bg-white">{children}</div>
		</>
	);
}
