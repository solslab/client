export default function Layout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className="min-h-screen overflow-hidden bg-white">{children}</div>
		</>
	);
}
