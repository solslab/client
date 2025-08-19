'use client';

export default function TrFormRow({
	label,
	children,
	required = true,
	error
}: {
	label: string;
	children: React.ReactNode;
	required?: boolean;
	error?: string[];
}) {
	const isRequired = required || true;
	return (
		<div className="flex w-full flex-wrap pt-6 text-base">
			<div className="flex w-full flex-wrap">
				<div className="w-full font-bold text-gray-80 md:w-1/5">
					{label}
					{required ? <span className="textsm text-main-base"> *</span> : undefined}
				</div>
				<div className="mt-4 flex w-full justify-end text-text-base md:mt-0 md:w-4/5">
					{children}
				</div>
			</div>
			<div className="flex h-6 w-full items-center justify-end">
				<p className="text-sm text-red-warning">
					{error?.map((el) => (
						<span className="text-sm text-red-warning" key={el}>
							{el}
						</span>
					))}
				</p>
			</div>
		</div>
	);
}
