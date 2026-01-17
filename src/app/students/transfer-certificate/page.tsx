'use client';

import React, { useState } from 'react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import { tcApi } from '../../../services/api';
import { TransferCertificate } from '../../../types/school';

export default function TransferCertificatePage() {
    const [loading, setLoading] = useState(false);
    const [regNo, setRegNo] = useState('');
    const [dob, setDob] = useState('');
    const [tc, setTc] = useState<TransferCertificate | null>(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setTc(null);
        setLoading(true);

        const result = await tcApi.verifyAndGetTC(regNo.trim(), dob);

        setLoading(false);

        if (result.success && result.data) {
            setTc(result.data);
        } else {
            setError(result.message);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            {/* Professional Header Section */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="min-w-0 flex-1">
                            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                                Transfer Certificate Verification
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Official portal for student transfer certificate retrieval and verification.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 py-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {!tc ? (
                        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                            <div className="px-4 py-6 sm:p-8">
                                <div className="max-w-xl lg:max-w-none">
                                    <div className="sm:flex sm:items-center sm:gap-4 md:gap-8">
                                        <div className="mb-6 sm:mb-0">
                                            <h2 className="text-base font-semibold leading-7 text-gray-900">Enter Student Details</h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">Provide the student's registration number and date of birth exactly as recorded.</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="regNo" className="block text-sm font-medium leading-6 text-gray-900">
                                                Registration Number
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    id="regNo"
                                                    value={regNo}
                                                    onChange={(e) => setRegNo(e.target.value)}
                                                    className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all"
                                                    placeholder="e.g. REG-2023-001"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                                                Date of Birth
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="date"
                                                    id="dob"
                                                    value={dob}
                                                    onChange={(e) => setDob(e.target.value)}
                                                    className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {error && (
                                            <div className="sm:col-span-6 rounded-md bg-red-50 p-4 border border-red-200">
                                                <div className="flex">
                                                    <div className="flex-shrink-0">
                                                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <div className="ml-3">
                                                        <h3 className="text-sm font-medium text-red-800">Verification Error</h3>
                                                        <div className="mt-2 text-sm text-red-700">
                                                            <p>{error}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="sm:col-span-6 border-t border-gray-900/5 pt-6 flex items-center justify-end">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                            >
                                                {loading && (
                                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                )}
                                                {loading ? 'Verifying Details...' : 'Verify & Retrieve TC'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
                            {/* Status Banner */}
                            <div className={`px-6 py-4 flex items-center justify-between ${tc.status === 'issued' ? 'bg-green-50' :
                                tc.status === 'draft' ? 'bg-yellow-50' : 'bg-red-50'
                                }`}>
                                <div className="flex items-center gap-3">
                                    <span className={`inline-flex items-center justify-center p-1 rounded-full ${tc.status === 'issued' ? 'bg-green-100 text-green-700' :
                                        tc.status === 'draft' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <div>
                                        <h3 className={`text-sm font-semibold ${tc.status === 'issued' ? 'text-green-800' :
                                            tc.status === 'draft' ? 'text-yellow-800' : 'text-red-800'
                                            }`}>
                                            Certificate Found
                                        </h3>
                                        <p className={`text-xs ${tc.status === 'issued' ? 'text-green-700' :
                                            tc.status === 'draft' ? 'text-yellow-700' : 'text-red-700'
                                            }`}>
                                            Verification successful
                                        </p>
                                    </div>
                                </div>
                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${tc.status === 'issued' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                                    tc.status === 'draft' ? 'bg-yellow-50 text-yellow-800 ring-yellow-600/20' : 'bg-red-50 text-red-700 ring-red-600/10'
                                    }`}>
                                    {tc.status.toUpperCase()}
                                </span>
                            </div>

                            <div className="border-t border-gray-100 px-4 py-5 sm:p-0">
                                <dl className="sm:divide-y sm:divide-gray-100">
                                    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">TC Number</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-mono">{tc.tcNumber}</dd>
                                    </div>
                                    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Student Name</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{tc.studentName}</dd>
                                    </div>
                                    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Registration No.</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{tc.regNo}</dd>
                                    </div>
                                    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Class</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{tc.studentClass}</dd>
                                    </div>
                                    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{formatDate(tc.dob)}</dd>
                                    </div>

                                    {tc.fileUrl && (
                                        <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Certificate Document</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                <div className="flex items-center justify-between rounded-md border border-gray-200 py-3 pl-3 pr-4 text-sm">
                                                    <div className="flex w-0 flex-1 items-center">
                                                        <svg className="h-5 w-5 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="ml-2 w-0 flex-1 truncate">Transfer_Certificate_{tc.tcNumber}.pdf</span>
                                                    </div>
                                                    <div className="ml-4 flex-shrink-0">
                                                        <a href={tc.fileUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:text-blue-500">
                                                            Download
                                                        </a>
                                                    </div>
                                                </div>
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>

                            <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setTc(null);
                                        setRegNo('');
                                        setDob('');
                                        setError('');
                                    }}
                                    className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
                                >
                                    Search Another Student &rarr;
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
