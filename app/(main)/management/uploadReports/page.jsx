'use client';

import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ApiService } from '../../../../services/apiServices';
import '@cyntler/react-doc-viewer/dist/index.css';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

const years = [
    { label: '2019', value: 2019 },
    { label: '2020', value: 2020 },
    { label: '2021', value: 2021 },
    { label: '2022', value: 2022 },
    { label: '2023', value: 2023 },
    { label: '2024', value: 2024 }
];

const DocumentUploadForm = () => {
    const [year, setYear] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const inputRef = useRef(null);
    const router = useRouter();

    const handleFileSelect = (files) => {
        const uploadedFile = files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            const url = URL.createObjectURL(uploadedFile);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = async () => {
        if (!file || !year || !name) {
            alert('Please complete all fields.');
            return;
        }

        setLoading(true);
        setErrorMsg('');

        try {
            const formData = new FormData();
            formData.append('file', file);

            const token = sessionStorage.getItem('token');

            //hard code temporarirly to avoid browser blocked issues
            const uploadRes = await fetch('https://llm-sacco-financial-records-backend-production.up.railway.app/api/v1/upload/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await uploadRes.json();

            if (!uploadRes.ok) {
                throw new Error(result.detail || 'File upload failed');
            }

            const docPayload = {
                name,
                year,
                description,
                file_url: result.url,
                status: 1,
            };

            await ApiService.post('/documents', docPayload, true);

            setName('');
            setYear(null);
            setDescription('');
            setFile(null);
            setPreviewUrl(null);
            router.push('/management');
        } catch (err) {
            console.error(err);
            const msg = err.message.includes('already exists') ? 'Financial Statement already exists.' : err.message;
            setErrorMsg(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card p-fluid">
            <h5>Upload Financial Statement</h5>

            {errorMsg && (
                <div className="p-message p-message-error mb-3">
                    <div className="p-message-wrapper">
                        <span className="p-message-text">{errorMsg}</span>
                    </div>
                </div>
            )}

            <div className="formgrid grid">
                <div className="field col-12 md:col-6">
                    <label htmlFor="name">Document Name</label>
                    <InputText id="name" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="field col-12 md:col-6">
                    <label htmlFor="year">Year</label>
                    <Dropdown id="year" value={year} onChange={(e) => setYear(e.value)} options={years} placeholder="Select Year" />
                </div>

                <div className="field col-12">
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" rows={8} value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className="formgrid grid col-12">
                    <div className="field col-12 md:col-8">
                        <label htmlFor="file">Upload File</label>
                        <input
                            type="file"
                            ref={inputRef}
                            accept=".pdf"
                            style={{ display: 'none' }}
                            onChange={(e) => handleFileSelect(e.target.files)}
                        />
                        <Button
                            label={file ? file.name : 'Select File'}
                            icon="pi pi-file"
                            className="w-full"
                            onClick={() => inputRef.current?.click()}
                        />
                    </div>

                    <div className="field col-12 md:col-4 flex align-items-end">
                        <Button
                            label={loading ? 'Uploading...' : 'Submit'}
                            icon="pi pi-upload"
                            onClick={handleSubmit}
                            className="w-full"
                            disabled={!previewUrl || loading}
                        />
                    </div>
                </div>
            </div>

            {loading && (
                <div className="flex justify-content-center mt-4">
                    <ProgressSpinner style={{ width: '40px', height: '40px' }} />
                </div>
            )}

            {previewUrl && (
                <div className="mt-4 hidden sm:block">
                    <label className="block mb-2 font-medium">Preview</label>
                    <DocViewer
                        documents={[{ uri: previewUrl, fileName: file?.name || 'Preview.pdf' }]}
                        pluginRenderers={DocViewerRenderers}
                    />
                </div>
            )}
        </div>
    );
};

export default DocumentUploadForm;
