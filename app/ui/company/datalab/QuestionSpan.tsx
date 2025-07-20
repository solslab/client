type DataItem = {
	member_tier: number;
	tr_year: string;
	tr_position: string | null;
	tr_career: string;
	tr_problem_num: number;
	tr_solved_num: number;
	tr_pass_status: string;
};

type QuestionProps = {
	data?: DataItem[];
};

function QuestionSpan({ data = [] }: QuestionProps) {
	const calculateStats = (data: DataItem[]) => {
		const passedData = data.filter((item) => item.tr_pass_status === '합격');

		const passCount = passedData.length;

		const problemCounts = passedData.reduce<Record<number, number>>((acc, curr) => {
			acc[curr.tr_problem_num] = (acc[curr.tr_problem_num] || 0) + 1;
			return acc;
		}, {});
		const mostCommonProblemNum = Object.entries(problemCounts).sort((a, b) => b[1] - a[1])[0][0];

		const avgSolvedNum =
			Math.round(
				(passedData.reduce((sum, item) => sum + item.tr_solved_num, 0) / passedData.length) * 10
			) / 10;

		return [passCount.toString(), mostCommonProblemNum, avgSolvedNum.toString()];
	};

	const stats = data.length > 0 ? calculateStats(data) : ['??', '?', '?'];

	return (
		<p>
			<span className="font-bold text-main-base">{stats[0]}명</span>의 합격자가 평균{' '}
			<span className="font-bold text-main-base">{stats[1]}문제</span>중{' '}
			<span className="font-bold text-main-base">{stats[2]}문제</span>를 해결했습니다
		</p>
	);
}

export default QuestionSpan;
