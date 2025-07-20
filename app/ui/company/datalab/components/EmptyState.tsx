import TrLink from '@/app/ui/company/trLink';
import TierGuard from '@/app/ui/common/tierGuard';

type EmptyStateProps = {
	company_id: string;
};

export default function EmptyState({ company_id }: EmptyStateProps) {
	return (
		<div className="mt-10 flex min-h-80 w-full flex-col items-center justify-center text-text-base">
			<div className="mb-4 text-center text-lg max-sm:text-base">
				이 기업에 작성된 후기가 없어요. 😢
			</div>
			<div className="mb-10 text-center text-lg max-sm:text-base">
				여러분의 후기를 공유해주세요!
			</div>
			<TierGuard
				render={(checkTier) => <TrLink onClick={checkTier} />}
				company_id={company_id}
			/>
		</div>
	);
} 