export default function FieldBox({ feild }: { feild: string }) {
	return (
		<div className="mb-2 flex justify-center rounded-xl border border-gray-30 px-4 py-1">
			<div className="text-base text-text-base">{feild}</div>
		</div>
	);
}
