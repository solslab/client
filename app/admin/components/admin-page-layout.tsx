'use client';

import { usePathname } from 'next/navigation';
import { useIsAdminDomain } from '@/hooks/useIsAdminDomain';

const AdminPageLayout = () => {
    const pathname = usePathname();
	const isAdminDomain = useIsAdminDomain();
	const mainClass = isAdminDomain || pathname.startsWith('/admin') ? '' : 'pt-16';

	return <div className={mainClass}></div>;
};

export default AdminPageLayout;
