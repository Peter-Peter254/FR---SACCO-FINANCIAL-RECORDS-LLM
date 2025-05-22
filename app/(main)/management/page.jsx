'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { ApiService } from '../../../services/apiServices';

const FinancialStatementsTable = () => {
    const [documents, setDocuments] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const data = await ApiService.get('/documents', true);
                setDocuments(data);
            } catch (err) {
                console.error('Error fetching documents:', err.message);
            }
        };

        fetchDocuments();
    }, []);

    const dateTemplate = (rowData) => {
        return format(new Date(rowData.created_at), 'dd MMM yyyy HH:mm');
    };

    const statusTemplate = (rowData) => {
        const status = rowData.status;
        let label = '';
        let severity = '';

        switch (status) {
            case 1:
                label = 'Uploaded';
                severity = 'info';
                break;
            case 2:
                label = 'Extracted';
                severity = 'Dashboard Ready';
                break;
            // case 3:
            //     label = 'Ready to Query';
            //     severity = 'warning';
            //     break;
            default:
                label = 'Processed';
                severity = 'secondary';
        }

        return <span className={`p-tag p-tag-${severity}`}>{label}</span>;
    };

    return (
        <div className="card">
            <div className="flex justify-content-between align-items-center mb-3">
                <h5 className="m-0">Uploaded Financial Statements</h5>
                <Button
                    label="Upload Report"
                    icon="pi pi-plus"
                    className="p-button-sm"
                    onClick={() => router.push('/management/uploadReports')}
                />
            </div>

            <DataTable value={documents} responsiveLayout="scroll" className="p-datatable-gridlines">
                <Column field="name" header="Name" style={{ minWidth: '12rem' }} />
                <Column field="year" header="Year" style={{ minWidth: '6rem' }} />
                 <Column body={dateTemplate} header="Created At" style={{ minWidth: '12rem' }} />
                <Column body={statusTemplate} header="Status" style={{ minWidth: '10rem' }} />
            </DataTable>
        </div>
    );
};

export default FinancialStatementsTable;
