import React from 'react';
import ClientLayout from './client-layout';

export const metadata = {
    title: 'Sacco Financial decision LLM',
    description: 'Sacco Financial decision LLM',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    openGraph: {
        type: 'website',
        title: 'PrimeReact SAKAI-REACT',
        url: 'https://sakai.primereact.org/',
        description: 'The ultimate collection of design-agnostic, flexible and accessible React UI Components.',
        images: ['https://www.primefaces.org/static/social/sakai-react.png'],
        ttl: 604800
    },
    icons: {
        icon: '/favicon.ico'
    }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <ClientLayout>{children}</ClientLayout>;
}
