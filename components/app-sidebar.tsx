import { Building, FileQuestion, Pencil, Star, User } from 'lucide-react';

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/components/ui/sidebar';

const items = [
	{
		title: '회원 관리',
		url: '/admin/member',
		icon: User
	},
	{
		title: '기업 관리',
		url: '/admin/company',
		icon: Building
	},
	{
		title: '코딩테스트 리뷰 관리',
		url: '/admin/testReview',
		icon: Pencil
	},
	{
		title: '정보수정요청 관리',
		url: '/admin/suggestion',
		icon: FileQuestion
	},
	{
		title: '피드백 관리',
		url: '/admin/feedback',
		icon: Star
	}
];

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>SOLSLAB ADMIN</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
