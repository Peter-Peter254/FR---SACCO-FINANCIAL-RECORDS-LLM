// app/(main)/client-layout.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Layout from '../../layout/layout';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');

        if (!token || !userId) {
            router.replace('/auth/login');
        } else {
            setCheckingAuth(false);
        }
    }, [pathname]);

    if (checkingAuth) {
        return null;
    }

    return <Layout>{children}</Layout>;
}
