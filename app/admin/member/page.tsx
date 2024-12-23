import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table';

const datas = [
	{
		name: '한규정',
		email: 'resres@sfdsaf.com',
		social_type: 'KAKAO',
		created_date: '2024-09-19'
	},
	{
		name: '이승주',
		email: 'lee@example.com',
		social_type: 'Google',
		created_date: '2024-10-10'
	},
	{
		name: '김민태',
		email: 'min@example.com',
		social_type: 'Facebook',
		created_date: '2024-08-15'
	},
	{
		name: '황수민',
		email: 'sumin@example.com',
		social_type: 'KAKAO',
		created_date: '2024-07-05'
	}
];

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="w-full">
				<SidebarTrigger />
				{children}
				<Table className="mx-auto w-3/4">
					<TableHeader>
						<TableRow>
							<TableHead>이름</TableHead>
							<TableHead>이메일</TableHead>
							<TableHead>가입 방식</TableHead>
							<TableHead>가입날짜</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{datas.map((data) => (
							<TableRow key={data.email}>
								<TableCell className="font-medium">{data.name}</TableCell>
								<TableCell>{data.email}</TableCell>
								<TableCell>{data.social_type}</TableCell>
								<TableCell>{data.created_date}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</main>
		</SidebarProvider>
	);
}
