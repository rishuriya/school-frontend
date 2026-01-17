'use client';

import React, { useEffect, useState } from 'react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import { syllabusApi } from '../../../services/api';
import { SchoolDocument } from '../../../types/school';

export default function SyllabusPage() {
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState<SchoolDocument[]>([]);
    const [selectedClass, setSelectedClass] = useState<string>('');
    const [selectedSubject, setSelectedSubject] = useState<string>('');

    useEffect(() => {
        const fetchSyllabus = async () => {
            setLoading(true);
            const data = await syllabusApi.getSyllabus(
                selectedClass || undefined,
                selectedSubject || undefined
            );
            setDocuments(data);
            setLoading(false);
        };

        fetchSyllabus();
    }, [selectedClass, selectedSubject]);

    // Extract unique classes and subjects
    const classes = Array.from(new Set(documents.map(d => d.className))).sort((a, b) => {
        const numA = parseInt(a) || 0;
        const numB = parseInt(b) || 0;
        return numA - numB;
    });

    const subjects = Array.from(new Set(documents.map(d => d.subject).filter(Boolean)));

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            {/* Professional Header Section */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="min-w-0 flex-1">
                            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                                Syllabus
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Download detailed syllabus documents by class and subject.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Controls Section */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 items-center">
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <span className="text-sm font-medium text-gray-700 whitespace-nowrap min-w-[60px]">Class:</span>
                            <div className="relative w-full sm:w-48">
                                <select
                                    id="class-select"
                                    value={selectedClass}
                                    onChange={(e) => {
                                        setSelectedClass(e.target.value);
                                        setSelectedSubject('');
                                    }}
                                    className="block w-full rounded-md border-gray-300 py-2.5 pl-4 pr-10 text-base text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm shadow-sm appearance-none bg-white cursor-pointer hover:border-purple-400 transition-colors"
                                >
                                    <option value="">All Classes</option>
                                    {classes.map((className) => (
                                        <option key={className} value={className}>
                                            Class {className}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <span className="text-sm font-medium text-gray-700 whitespace-nowrap min-w-[60px]">Subject:</span>
                            <div className="relative w-full sm:w-48">
                                <select
                                    id="subject-select"
                                    value={selectedSubject}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                    className="block w-full rounded-md border-gray-300 py-2.5 pl-4 pr-10 text-base text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm shadow-sm appearance-none bg-white cursor-pointer hover:border-purple-400 transition-colors"
                                >
                                    <option value="">All Subjects</option>
                                    {subjects.map((subject) => (
                                        <option key={subject} value={subject}>
                                            {subject}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="ml-auto text-sm text-gray-500 font-medium">
                            {documents.length} Document{documents.length !== 1 ? 's' : ''} Found
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mb-4"></div>
                            <p className="text-gray-500 text-sm">Loading syllabus data...</p>
                        </div>
                    ) : documents.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-lg border border-gray-200 border-dashed">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No syllabus found</h3>
                            <p className="mt-1 text-sm text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-sm font-semibold text-gray-900">Document List</h3>
                                <span className="text-xs text-gray-500">{documents.length} items</span>
                            </div>
                            <ul role="list" className="divide-y divide-gray-100">
                                {documents.map((doc) => (
                                    <li key={doc._id} className="group hover:bg-gray-50 transition-colors duration-150">
                                        <div className="px-4 py-4 sm:px-6 flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-4 min-w-0">
                                                <div className="flex-shrink-0">
                                                    <span className="inline-flex items-center justify-center p-3.5 bg-purple-50 rounded-lg text-purple-700 ring-1 ring-purple-600/10">
                                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="text-base font-semibold text-gray-900 truncate group-hover:text-purple-600 transition-colors">
                                                            <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                                                                {doc.title || doc.subject}
                                                            </a>
                                                        </h4>
                                                        {doc.subject && (
                                                            <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                                                                {doc.subject}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                            Class {doc.className}
                                                        </span>
                                                    </div>
                                                    {doc.description && (
                                                        <p className="text-sm text-gray-500 truncate mt-0.5">{doc.description}</p>
                                                    )}
                                                    <div className="flex items-center gap-3 mt-1.5">
                                                        {doc.academicYear && (
                                                            <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                                </svg>
                                                                {doc.academicYear}
                                                            </span>
                                                        )}
                                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                            </svg>
                                                            PDF Document
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-shrink-0">
                                                <a
                                                    href={doc.fileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center rounded bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                >
                                                    Download
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
