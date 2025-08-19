export default function BasicConfirm({
	children,
	onConfirm,
	onCancel
}: {
	children: React.ReactNode;
	onConfirm?: () => void;
	onCancel?: () => void;
}) {
	return (
		<div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
			<div className="flex w-96 flex-col items-center rounded-xl border border-gray-50 bg-white px-16 py-8 shadow-customShadow">
				<div className="flex min-h-44 flex-col items-center justify-center py-12">{children}</div>
				<div className="flex justify-center space-x-4">
					<button
						type="submit"
						onClick={onConfirm && onConfirm}
						className="h-10 w-24 rounded-2xl bg-gray-20 font-bold text-text-base"
					>
						예
					</button>
					<button
						type="button"
						onClick={onCancel && onCancel}
						className="h-10 w-24 rounded-2xl bg-main-base font-bold text-white"
					>
						아니오
					</button>
				</div>
			</div>
		</div>
	);
}
