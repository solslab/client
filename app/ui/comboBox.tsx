import React, { useState } from 'react';

const ComboBox = ({
	list,
	onClick,
	className
}: {
	list: string[];
	onClick?: (el: string) => void;
	className?: string;
}) => {
	const [value, setValue] = useState('');
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};
	return (
		<div className="relative" data-hs-combo-box="">
			<div className={`relative w-full max-w-80 shadow-customShadow ${className && className}`}>
				<input
					className="block w-full rounded-lg border border-gray-50 px-2 py-1 pe-9 ps-4 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
					type="text"
					role="combobox"
					aria-expanded="false"
					placeholder="검색 및 선택"
					value={value}
					data-hs-combo-box-input=""
					onChange={onChange}
				/>
				<div
					className="absolute end-3 top-1/2 -translate-y-1/2"
					aria-expanded={true}
					data-hs-combo-box-toggle=""
				>
					<button type="button" className="text-gray-60 flex justify-center items-center">
						<svg
							className="size-3.5 shrink-0 text-gray-500 dark:text-neutral-500"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="m7 15 5 5 5-5"></path>
							<path d="m7 9 5-5 5 5"></path>
						</svg>
					</button>
				</div>
			</div>
			<div
				className="absolute z-50 hidden max-h-72 w-full overflow-hidden overflow-y-auto rounded-lg border border-gray-200 bg-white p-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2"
				data-hs-combo-box-output=""
			>
				{list.map((el, index) => (
					<div
						key={index}
						className="w-full cursor-pointer rounded-lg px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
						tabIndex={index}
						data-hs-combo-box-output-item=""
						onClick={() => onClick && onClick(el)}
					>
						<div className="flex w-full items-center justify-between">
							<span data-hs-combo-box-search-text={el} data-hs-combo-box-value={el}>
								{el}
							</span>
							<span className="hidden hs-combo-box-selected:block">
								<svg
									className="size-3.5 shrink-0 text-blue-600"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M20 6 9 17l-5-5"></path>
								</svg>
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ComboBox;
