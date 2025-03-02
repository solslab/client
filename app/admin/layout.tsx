'use client';
import { SidebarProvider, SidebarTrigger } from '@/app/ui/shadcn/components/ui/sidebar';
import { AdminSidebar } from '@/app/admin/components/admin-sidebar';
import { usePathname } from 'next/navigation';
import { useIsAdminDomain } from '@/app/lib/hooks/useIsAdminDomain';

export default function Layout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isAdminDomain = useIsAdminDomain();
	if (pathname === '/admin/login' || (isAdminDomain && pathname == '/login')) {
		return <>{children}</>;
	}

	return (
		<SidebarProvider>
			<AdminSidebar />
			<main className="w-full">
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	);
}
