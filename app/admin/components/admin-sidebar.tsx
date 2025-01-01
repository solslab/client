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

import { useIsAdminDomain } from '@/hooks/useIsAdminDomain';

export function AdminSidebar() {
	const basePath = useIsAdminDomain() ? '' : '/admin';
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>SOLSLAB ADMIN</SidebarGroupLabel>
					<SidebarMenu>
						{/* 회원 관리 */}
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<a href={`${basePath}/manage/member`}>
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
										<a href={`${basePath}/manage/company`}>
											<span>공개 기업 관리</span>
										</a>
									</SidebarMenuSubButton>
								</SidebarMenuSubItem>
								<SidebarMenuSubItem>
									<SidebarMenuSubButton asChild>
										<a href={`${basePath}/manage/company/private`}>
											<span>비공개 기업 관리</span>
										</a>
									</SidebarMenuSubButton>
								</SidebarMenuSubItem>
							</SidebarMenuSub>
						</SidebarMenuItem>

						{/* 코딩테스트 리뷰 관리 */}
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<a href={`${basePath}/manage/review`}>
									<Pencil />
									<span>코딩테스트 리뷰 관리</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>

						{/* 정보수정요청 관리 */}
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<a href={`${basePath}/manage/suggestion`}>
									<FileQuestion />
									<span>정보수정요청 관리</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>

						{/* 피드백 관리 */}
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<a href={`${basePath}/manage/feedback`}>
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
