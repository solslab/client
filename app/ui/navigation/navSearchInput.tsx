'use client';
import Image from 'next/image';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function NavSearchInput({ placeholder }: { placeholder: string }) {
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
				<Image src="/icons/search.png" alt="search" width={32} height={32} />
			</div>
			<input
				className="block h-14 w-96 rounded-full border border-gray-50 px-16 py-3 text-2xl shadow-customShadow focus:rounded-none focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
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
