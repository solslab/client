import clsx from "clsx";

export default function FieldToggleButton({
  text,
  active,
  onClick,
}: {
  text: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
		<button
			type="button"
			onClick={() => onClick()}
			className={clsx(`mx-1 mb-4 rounded-3xl px-4 py-2 text-sm font-semibold`, {
				'border border-main-base text-white bg-main-base': active,
				'bg-bg-white border border-gray-30 text-base text-text-base hover:bg-gray-60': !active
			})}
		>
			{text}
		</button>
	);
}
