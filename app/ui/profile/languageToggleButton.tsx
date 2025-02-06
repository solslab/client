import { X } from 'lucide-react';

export default function LanguageToggleButton({
	text,
	onClick
}: {
	text: string;
	onClick: () => void;
}) {
	return (
		<div className="mr-2 mt-4 inline-block rounded-3xl bg-main-light px-3 py-2 text-sm font-semibold text-gray-80">
			<div className="flex items-center">
				<span>{text}</span>
				<X
					className="ml-2 h-4 w-4 cursor-pointer"
					onClick={(e) => {
						e.stopPropagation(); // 부모 div의 클릭 이벤트가 실행되지 않도록 막음
						onClick(); // `X` 아이콘 클릭 시 실행
					}}
				/>
			</div>
		</div>
	);
}
