'use client';
import Image from 'next/image';
import { useState } from 'react';
import FeedBackModal from './feedBackModal';

export default function FeedBackBtn() {
	const [active, setActive] = useState(false);

	return (
		<div className="fixed bottom-6 left-10 hidden lg:block">
			{active ? (
				<FeedBackModal setVisible={setActive} />
			) : (
				<div className="flex flex-col items-center">
					<button onClick={() => setActive(true)} type="button" className="">
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
		</div>
	);
}
