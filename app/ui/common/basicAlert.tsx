export default function BasicAlert({
	children,
	onClick,
	type = 'button'
}: {
	children: React.ReactNode;
	onClick: () => void;
	type?: 'button' | 'submit' | 'reset';
}) {
	return (
		<div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
			<div className="flex w-96 flex-col items-center rounded-xl border border-gray-50 bg-white px-16 py-8 shadow-customShadow">
				<div className="flex min-h-44 flex-col items-center justify-center py-12">{children}</div>
				<button
					type={type}
					onClick={onClick}
					className="h-10 w-24 rounded-2xl bg-main-base font-bold text-white"
				>
					확인
				</button>
			</div>
		</div>
	);
}
