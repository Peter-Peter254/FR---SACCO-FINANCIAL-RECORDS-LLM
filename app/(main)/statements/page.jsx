'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { ApiService } from '@/services/apiServices';

const FinancialStatementsTable = () => {
    const [statements, setStatements] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const data = await ApiService.get('/documents', true);
                setStatements(data);
            } catch (err) {
                console.error('Error fetching documents:', err.message);
            }
        };

        fetchDocuments();
    }, []);

    const handleViewFile = (rowData) => {
        router.push(`/statements/read/${rowData.id}`);
    };

    const handleChat = (rowData) => {
        router.push(`/statements/chat/${rowData.id}`);
    };

    const viewButtonTemplate = (rowData) => <Button icon="pi pi-eye" label="View" className="p-button-sm p-button-text" onClick={() => handleViewFile(rowData)} />;

    const chatButtonTemplate = (rowData) => {
        if (rowData.status !== 1) {
            return <Button icon="pi pi-comments" label="Chat" className="p-button-sm p-button-text p-button-info" onClick={() => handleChat(rowData)} />;
        }

        return <span className="p-tag p-tag-warning p-text-sm">In Review...</span>;
    };

    const dateTemplate = (rowData) => {
        return format(new Date(rowData.created_at), 'dd MMM yyyy HH:mm');
    };

    return (
        <div className="card">
            <DataTable value={statements} responsiveLayout="scroll" className="p-datatable-gridlines">
                <Column field="year" header="Year" style={{ minWidth: '8rem' }} />
                <Column field="name" header="Sacco" style={{ minWidth: '12rem' }} />
                <Column field="file_url" header="File" body={(row) => row.file_url.split('/').pop()} style={{ minWidth: '14rem' }} />
                <Column body={dateTemplate} header="Created At" style={{ minWidth: '12rem' }} />
                <Column body={viewButtonTemplate} header="View" style={{ width: '8rem' }} />
                <Column body={chatButtonTemplate} header="Chat with LLM" style={{ width: '12rem' }} />
            </DataTable>
        </div>
    );
};

export default FinancialStatementsTable;
