export default async function Row({ head, desc }: { head: string; desc: string }) {
	return (
		<div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt className="text-sm font-medium leading-6 text-gray-900">{head}</dt>
			<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{desc}</dd>
		</div>
	);
}
