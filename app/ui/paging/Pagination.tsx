import Link from 'next/link';
import { FiChevronsLeft, FiChevronLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';

const baseButtonClasses = 'flex h-8 w-8 items-center justify-center rounded-lg';
const disabledButtonClasses = `${baseButtonClasses} border-[1px] border-gray-50 cursor-not-allowed text-gray-50`;
const activeButtonClasses = `${baseButtonClasses} border-[1px] border-gray-50 cursor-pointer`;
const currentPageClasses = `${baseButtonClasses} bg-main-light text-main-base`;

const Pagination = () => (
	<span className="flex h-8 w-8 items-center justify-center">
		<BsThreeDots />
	</span>
);

export function PaginationButtons({
	currentPage,
	totalPages,
	pageNumbers
}: {
	currentPage: number;
	totalPages: number;
	pageNumbers: (number | JSX.Element)[];
}) {
	return (
		<div className="mt-5 flex items-center justify-center space-x-2">
			{currentPage > 1 ? (
				<Link href={`?page=1`}>
					<span className={activeButtonClasses}>
						<FiChevronsLeft />
					</span>
				</Link>
			) : (
				<span className={disabledButtonClasses}>
					<FiChevronsLeft />
				</span>
			)}
			{currentPage > 1 ? (
				<Link href={`?page=${currentPage - 1}`}>
					<span className={activeButtonClasses}>
						<FiChevronLeft />
					</span>
				</Link>
			) : (
				<span className={disabledButtonClasses}>
					<FiChevronLeft />
				</span>
			)}

			{pageNumbers.map((page, index) =>
				typeof page === 'number' ? (
					page === currentPage ? (
						<span key={index} className={currentPageClasses}>
							{page}
						</span>
					) : (
						<Link key={index} href={`?page=${page}`}>
							<span className={activeButtonClasses}>{page}</span>
						</Link>
					)
				) : (
					<Pagination key={index} />
				)
			)}

			{currentPage < totalPages ? (
				<Link href={`?page=${currentPage + 1}`}>
					<span className={activeButtonClasses}>
						<FiChevronRight />
					</span>
				</Link>
			) : (
				<span className={disabledButtonClasses}>
					<FiChevronRight />
				</span>
			)}

			{currentPage < totalPages ? (
				<Link href={`?page=${totalPages}`}>
					<span className={activeButtonClasses}>
						<FiChevronsRight />
					</span>
				</Link>
			) : (
				<span className={disabledButtonClasses}>
					<FiChevronsRight />
				</span>
			)}
		</div>
	);
}
