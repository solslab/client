'use client';

import { usePathname } from 'next/navigation';

const AdminPageLayout = () => {
    const pathname = usePathname();
    const mainClass = pathname.startsWith('/admin') ? '' : 'pt-16';

    return (
        <div className={mainClass}></div>
    );
};

export default AdminPageLayout;
