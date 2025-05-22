'use client';
import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { classNames } from 'primereact/utils';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ApiService } from '@/services/apiServices';

const initialMetrics = {
    membershipCount: 0,
    loanBookValue: 0,
    assetBase: 0,
    deposits: 0,
    dividendRate: 0,
    interestRebate: 0,
    revenue: 0,
    portfolioAtRisk: 0
};

const SaccoDashboard = () => {
    const [selectedYear, setSelectedYear] = useState('all');
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [metrics, setMetrics] = useState(initialMetrics);
    const [documentOptions, setDocumentOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchMetrics = async (year = null, documentId = null) => {
        try {
            setLoading(true);
            setMetrics(initialMetrics);

            let url = '/dashboard/metrics';
            if (documentId) url += `?document_id=${documentId}`;
            else if (year && year !== 'all') url += `?year=${year}`;

            const data = await ApiService.get(url, true);
            setMetrics(data);
        } catch (err) {
            console.error('Failed to load metrics:', err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchDocumentsForYear = async (year) => {
        try {
            const docs = await ApiService.get(`/dashboard/documents?year=${year}`, true);
            const options = docs.map(d => ({ label: d.name, value: d.id }));
            setDocumentOptions(options);
            setSelectedDocument(null);
        } catch (err) {
            console.error('Failed to load documents:', err.message);
        }
    };

    useEffect(() => {
        if (selectedYear === 'all') {
            fetchMetrics();
            setDocumentOptions([]);
            setSelectedDocument(null);
        } else {
            fetchMetrics(selectedYear);
            fetchDocumentsForYear(selectedYear);
        }
    }, [selectedYear]);

    useEffect(() => {
        if (selectedDocument) {
            fetchMetrics(null, selectedDocument);
        }
    }, [selectedDocument]);

    const formatCurrency = (val) => `Ksh ${val.toLocaleString('en-KE', { maximumFractionDigits: 0 })}`;
    const formatPercent = (val) => `${parseFloat(val).toFixed(2)}%`;
    const formatNumber = (val) => val.toLocaleString('en-KE', { maximumFractionDigits: 0 });

    const metricCards = [
        { label: 'Membership Count', value: formatNumber(metrics.membershipCount), icon: 'pi pi-users', color: 'blue-500' },
        { label: 'Loan Book Value (KES)', value: formatCurrency(metrics.loanBookValue), icon: 'pi pi-book', color: 'cyan-500' },
        { label: 'Asset Base (KES)', value: formatCurrency(metrics.assetBase), icon: 'pi pi-briefcase', color: 'purple-500' },
        { label: 'Deposits (KES)', value: formatCurrency(metrics.deposits), icon: 'pi pi-wallet', color: 'green-500' },
        { label: 'Dividend Rate (%)', value: formatPercent(metrics.dividendRate), icon: 'pi pi-percentage', color: 'orange-500' },
        { label: 'Interest Rebate (%)', value: formatPercent(metrics.interestRebate), icon: 'pi pi-refresh', color: 'pink-500' },
        { label: 'Revenue (KES)', value: formatCurrency(metrics.revenue), icon: 'pi pi-chart-line', color: 'indigo-500' },
        { label: 'Portfolio at Risk (PAR %)', value: formatPercent(metrics.portfolioAtRisk), icon: 'pi pi-exclamation-triangle', color: 'red-500' }
    ];

    return (
        <div className="grid p-fluid">
            <div className="col-12 flex flex-row align-items-center justify-content-end gap-2 mb-4">
                <Dropdown
                    id="year"
                    value={selectedYear}
                    options={[
                        { label: 'All Years', value: 'all' },
                        { label: '2024', value: 2024 },
                        { label: '2023', value: 2023 },
                        { label: '2022', value: 2022 },
                        { label: '2021', value: 2021 },
                        { label: '2020', value: 2020 },
                        { label: '2019', value: 2019 }
                    ]}
                    onChange={(e) => setSelectedYear(e.value)}
                    placeholder="Select Year"
                    className="w-12rem font-bold"
                />

                {selectedYear !== 'all' && (
                    <Dropdown
                        id="document"
                        value={selectedDocument}
                        options={documentOptions}
                        onChange={(e) => setSelectedDocument(e.value)}
                        placeholder="All Documents"
                        className="w-12rem font-bold"
                    />
                )}
            </div>

            {loading ? (
                <div className="col-12 flex justify-content-center py-6">
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} />
                </div>
            ) : (
                metricCards.map((metric, idx) => (
                    <div key={idx} className="col-12 md:col-6 xl:col-4">
                        <Card className="shadow-1" style={{ minHeight: '120px' }}>
                            <div className="flex justify-content-between align-items-center">
                                <div>
                                    <span className="text-500 block mb-2 font-medium">{metric.label}</span>
                                    <span className="text-900 font-bold text-2xl">{metric.value}</span>
                                </div>
                                <div className={classNames('flex align-items-center justify-content-center border-round', `bg-${metric.color}`)} style={{ width: '3rem', height: '3rem' }}>
                                    <i className={classNames(metric.icon, 'text-white text-2xl')}></i>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))
            )}
        </div>
    );
};

export default SaccoDashboard;
