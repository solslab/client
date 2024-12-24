import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/app/admin/components/admin-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
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
