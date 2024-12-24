import { Building, FileQuestion, Pencil, Star, User } from 'lucide-react';

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenuSub,
	SidebarMenuSubItem,
	SidebarMenuSubButton
} from '@/components/ui/sidebar';

export function AdminSidebar() {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>SOLSLAB ADMIN</SidebarGroupLabel>
					<SidebarMenu>
						{/* 회원 관리 */}
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<a href="/admin/member">
									<User />
									<span>회원 관리</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>

						{/* 기업 관리 */}
						<SidebarMenuItem>
							<SidebarMenuButton>
								<Building />
								<span>기업 관리</span>
							</SidebarMenuButton>
							<SidebarMenuSub>
								<SidebarMenuSubItem>
									<SidebarMenuSubButton asChild>
										<a href="/admin/company">
											<span>공개 기업 관리</span>
										</a>
									</SidebarMenuSubButton>
								</SidebarMenuSubItem>
								<SidebarMenuSubItem>
									<SidebarMenuSubButton asChild>
										<a href="/admin/private-company">
											<span>비공개 기업 관리</span>
										</a>
									</SidebarMenuSubButton>
								</SidebarMenuSubItem>
							</SidebarMenuSub>
						</SidebarMenuItem>

						{/* 코딩테스트 리뷰 관리 */}
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<a href="/admin/testReview">
									<Pencil />
									<span>코딩테스트 리뷰 관리</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>

						{/* 정보수정요청 관리 */}
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<a href="/admin/suggestion">
									<FileQuestion />
									<span>정보수정요청 관리</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>

						{/* 피드백 관리 */}
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<a href="/admin/feedback">
									<Star />
									<span>피드백 관리</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
