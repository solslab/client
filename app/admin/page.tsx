'use client'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/app/admin/components/admin-sidebar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
	const router = useRouter(); // <-- 여기서 사용해도 에러가 발생하지 않도록 위치 조정

	useEffect(() => {
		router.replace('/admin/member');
	}, []);

	return (
		<SidebarProvider>
			<AdminSidebar />
			<main>
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	);
}
