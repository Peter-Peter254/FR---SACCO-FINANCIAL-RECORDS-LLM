'use client';

import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'next/navigation';
import "@cyntler/react-doc-viewer/dist/index.css";
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { ApiService } from '@/services/apiServices';

const ChatPage = () => {
    const { id } = useParams();
    const [docLink, setDocLink] = useState('');
    const [docName, setDocName] = useState('');

    const { layoutConfig } = useContext(LayoutContext);
    const isDark = layoutConfig.colorScheme === 'dark';

    const userId = typeof window !== 'undefined' ? sessionStorage.getItem('userId') : null;

    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            try {
                const res = await ApiService.get(`/documents/base64/${id}`, true);
                setDocLink(res.file_url);
                setDocName(res.name || 'Unnamed Financial Statement');
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [id, userId]);

    return (
        <div className='px-5'>
            {docLink && (
                <DocViewer
                    documents={[{ uri: docLink, fileName: docName }]}
                    pluginRenderers={DocViewerRenderers}
                />
            )}
        </div>
    );
};

export default ChatPage;
