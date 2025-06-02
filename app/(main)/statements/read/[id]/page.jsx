'use client';

import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'next/navigation';
import "@cyntler/react-doc-viewer/dist/index.css";
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { ApiService } from '@/services/apiServices';
import { ProgressSpinner } from 'primereact/progressspinner'; 

const ChatPage = () => {
    const { id } = useParams();
    const [docLink, setDocLink] = useState('');
    const [docName, setDocName] = useState('');
    const [loading, setLoading] = useState(true);

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
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, userId]);

    return (
        <div className='px-5'>
            {loading ? (
                <div className="flex justify-content-center align-items-center" style={{ height: '300px' }}>
                    <ProgressSpinner />
                </div>
            ) : (
                docLink && (
                    <DocViewer
                        documents={[{ uri: docLink, fileName: docName }]}
                        pluginRenderers={DocViewerRenderers}
                        theme={{ darkMode: isDark }}
                    />
                )
            )}
        </div>
    );
};

export default ChatPage;
