type QuestionProps = {
	text_array?: string[];
};
function QuestionSpan({ text_array = ['??', '?', '?'] }: QuestionProps) {
	return (
		<p>
			<span className="font-bold text-main-base">{text_array[0]}명</span>의 합격자가 평균
			<span className="font-bold text-main-base">{text_array[1]}문제</span>중{' '}
			<span className="font-bold text-main-base">{text_array[2]}문제</span>를 해결했습니다
		</p>
	);
}

export default QuestionSpan;
