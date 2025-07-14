'use client';
import Image from 'next/image';
import { useState } from 'react';
import FeedBackModal from './feedBackModal';

export default function FeedBackBtn() {
	const [showBtn, setShowBtn] = useState(true); // 버튼 표시 여부
	const [btnFading, setBtnFading] = useState(false); // 버튼 fade out 중 여부
	const [showModal, setShowModal] = useState(false); // 모달 표시 여부
	const [modalFading, setModalFading] = useState(false); // 모달 fade out 중 여부

	// 버튼 클릭 시: 버튼 fade out → 모달 fade in
	const handleBtnClick = () => {
		setBtnFading(true);
		setTimeout(() => {
			setShowBtn(false);
			setShowModal(true);
			setBtnFading(false);
		}, 200); // 버튼 fade out duration
	};

	// 모달 닫기 시: 모달 fade out → 버튼 fade in
	const handleModalClose = () => {
		setModalFading(true);
		setTimeout(() => {
			setShowModal(false);
			setModalFading(false);
			setShowBtn(true);
		}, 200); // 모달 fade out duration
	};

	return (
		<div className="fixed bottom-6 right-10 hidden lg:block">
			{showBtn && (
				<div className="flex flex-col items-center">
					<button
						onClick={handleBtnClick}
						type="button"
						className={`transition-all duration-300 ease-in-out scale-100 hover:scale-110 ${btnFading ? 'opacity-0' : 'opacity-100'}`}
						style={{ willChange: 'opacity, transform' }}
					>
						<Image
							src="/icons/feedback-btn.png"
							width={72}
							height={72}
							alt="feedback button"
							className=""
						/>
					</button>
				</div>
			)}
			{showModal && (
				<FeedBackModal fadeOut={modalFading} setVisible={handleModalClose} />
			)}
		</div>
	);
}
