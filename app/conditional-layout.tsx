'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

const ConditionalLayout = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    const mainClass = pathname.startsWith('/admin') ? '' : 'pt-16';

    return (
        <>
            <main className={mainClass}>{children}</main>
        </>
    );
};

export default ConditionalLayout;
