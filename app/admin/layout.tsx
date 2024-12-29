'use client';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/app/admin/components/admin-sidebar';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	if (pathname === '/admin/login') {
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
