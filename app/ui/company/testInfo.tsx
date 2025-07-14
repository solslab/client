import Container from '../common/container';
import PositionSelectBox from './positionSelectBox';
import Image from 'next/image';
import InfoItem from './infoItem';
import LanguageBox from '../common/languageBox';
import Link from 'next/link';
import VerifyMark from './verifyMark';
import { Position, TestData } from '@/app/lib/types/models';

export default function TestInfo({
	positions,
	position_id,
	data
}: {
	positions: Position[];
	position_id: string;
	data: TestData;
}) {
	return (
		<Container className={'rounded-md bg-white px-0'}>
			<div className="w-full rounded-md text-gray-90">
				<div className="flex flex-col items-center justify-between border-b border-gray-30 py-7">
					<div className="w-full px-6">
						<div className="mb-4 flex w-full flex-row flex-wrap">
							<div className="my-auto w-full text-base md:w-1/4">시기/직무구분</div>
							<div className="relative mt-4 flex w-full md:mt-0 md:w-3/4">
								<PositionSelectBox
									positions={positions}
									selected={position_id}
									isOfficial={data.is_official}
								/>
								{data.is_official ? (
									<>
										<VerifyMark />
									</>
								) : (
									<></>
								)}
							</div>
						</div>
						<div className="flex w-full flex-row flex-wrap">
							<div className="my-auto mb-4 w-full text-base sm:mb-0 md:w-1/4">지원 언어</div>
							<div className="flex w-full flex-wrap md:w-3/4">
								{data.support_languages.length > 0 ? (
									data.support_languages.map((language) => (
										<LanguageBox key={language} language={language} />
									))
								) : (
									<>
										<div className="mt-4 flex rounded-3xl bg-gray-5 px-6 py-2 md:mt-0">
											<div className="flex items-center">
												<Image src={'/icons/lock.png'} width={24} height={24} alt="time icon" />
											</div>
											<div className="my-auto ml-4 text-sm text-gray-70">
												회원에게만 공개된 정보입니다.
											</div>
										</div>
										<Link
											href="/login"
											className="ml:0 mt-4 rounded-md border-2 border-main-base px-6 py-3 font-semibold text-main-base sm:ml-6 sm:mt-0 hover:bg-main-base hover:text-white transition-all ease-in"
										>
											3초만에 가입하기!
										</Link>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="py-7">
					<div className="grid w-full px-6">
						<div className="grid w-full grid-cols-1 gap-x-16 gap-y-2 px-6 sm:gap-y-4 md:grid-cols-2">
							<InfoItem
								src={'/icons/calendar.png'}
								label={'시험 시간'}
								data={data.test_time || '-'}
							/>
							<InfoItem
								src={'/icons/messageCode.png'}
								label={'문제 수'}
								data={data.problem_info || '-'}
							/>
							<InfoItem src={'/icons/jump.png'} label={'IDE 사용'} data={data.permit_ide || '-'} />
							<InfoItem
								src={'/icons/glassEye.png'}
								label={'구글링'}
								data={data.permit_search || '-'}
							/>
							<InfoItem
								src={'/icons/interrogation.png'}
								label={'히든 테스트케이스'}
								data={data.hidden_case || '-'}
							/>
							<InfoItem
								src={'/icons/document.png'}
								label={'시험 방식'}
								data={data.exam_mode || '-'}
							/>
							{/* Conditional class for long data */}
							<InfoItem
								src={'/icons/marker.png'}
								label={'응시장소 / 플랫폼'}
								data={data.test_place || '-'}
								className={`${data.test_place && data.test_place.length > 20 ? 'break-words md:col-span-2' : ''}`}
							/>
						</div>
					</div>
				</div>

				{data.note ? (
					<div className="border-t border-gray-30 py-7">
						<div className="w-full px-6">
							<label>참고사항</label>
							<div className="mt-4 rounded-md bg-gray-5 p-4">{data.note}</div>
						</div>
					</div>
				) : (
					<></>
				)}
			</div>
		</Container>
	);
}
