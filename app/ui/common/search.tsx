'use client';
import Image from 'next/image';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();
	const handleSearch = useDebouncedCallback((term) => {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set('query', term);
		} else {
			params.delete('query');
		}
		replace(`${pathname}?${params.toString()}`);
	}, 200);

	return (
		<div className="relative">
			<div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center ps-5">
				<Image src="/icons/search.png" alt="search" width={20} height={20} />
			</div>
			<input
				className="block h-14 w-700 rounded-full border border-gray-50 px-16 py-3 text-xl shadow-customShadow focus:outline-none"
				type="text"
				role="combobox"
				aria-controls=""
				aria-expanded="false"
				placeholder={placeholder}
				onChange={(e) => {
					handleSearch(e.target.value);
				}}
				defaultValue={searchParams.get('query')?.toString()}
			/>
		</div>
	);
}
