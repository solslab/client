'use client';

import { useState } from 'react';
import DeletionConfirm from './deletionConfirm';

export default function DeletionBtn() {
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<>
			<div className="flex w-full justify-end py-16">
				<button onClick={() => setModalVisible(true)} className="text-gray-70">
					탈퇴하기
				</button>
			</div>
			{modalVisible && <DeletionConfirm setVisible={setModalVisible} />}
		</>
	);
}
