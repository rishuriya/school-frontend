'use client';

import React, { useEffect, useState } from 'react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import { curriculumApi } from '../../../services/api';
import { SchoolDocument } from '../../../types/school';

export default function CurriculumPage() {
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<SchoolDocument[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('');

  useEffect(() => {
    const fetchCurriculum = async () => {
      setLoading(true);
      const data = await curriculumApi.getCurriculum(selectedClass || undefined);
      setDocuments(data);
      setLoading(false);
    };

    fetchCurriculum();
  }, [selectedClass]);

  // Group documents by class
  const groupedByClass = documents.reduce((acc, doc) => {
    if (!acc[doc.className]) {
      acc[doc.className] = [];
    }
    acc[doc.className].push(doc);
    return acc;
  }, {} as Record<string, SchoolDocument[]>);

  const classes = Object.keys(groupedByClass).sort((a, b) => {
    const numA = parseInt(a) || 0;
    const numB = parseInt(b) || 0;
    return numA - numB;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Professional Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Curriculum
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Access and download curriculum documents for all academic years.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
            <div className="flex items-center gap-3 w-full sm:w-auto relative">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter by Class:</span>
              <div className="relative w-full sm:w-64">
                <select
                  id="class-select"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="block w-full rounded-md border-gray-300 py-2.5 pl-4 pr-10 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm shadow-sm appearance-none bg-white cursor-pointer hover:border-blue-400 transition-colors"
                >
                  <option value="">View All Classes</option>
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
            <div className="mt-2 sm:mt-0 text-sm text-gray-500 font-medium">
              Showing {documents.length} document{documents.length !== 1 ? 's' : ''}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-500 text-sm">Loading curriculum data...</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg border border-gray-200 border-dashed">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No documents found</h3>
              <p className="mt-1 text-sm text-gray-500">There are no curriculum documents available at this time.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {classes.map((className) => (
                <div key={className} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <span className="flex items-center justify-center bg-white border border-gray-200 w-6 h-6 rounded text-xs shadow-sm">
                        {className}
                      </span>
                      Class {className}
                    </h3>
                    <span className="text-xs text-gray-500 font-medium bg-white px-2 py-1 rounded border border-gray-200">
                      {groupedByClass[className].length} Files
                    </span>
                  </div>

                  <ul role="list" className="divide-y divide-gray-100">
                    {groupedByClass[className].map((doc) => (
                      <li key={doc._id} className="group hover:bg-gray-50 transition-colors duration-150">
                        <div className="px-4 py-4 sm:px-6 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4 min-w-0">
                            <div className="flex-shrink-0">
                              <span className="inline-flex items-center justify-center p-3.5 bg-blue-50 rounded-lg text-blue-700 ring-1 ring-blue-600/10">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-base font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                  <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                                    {doc.title || doc.subject}
                                  </a>
                                </h4>
                                {doc.subject && (
                                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                    {doc.subject}
                                  </span>
                                )}
                              </div>
                              {doc.description && (
                                <p className="text-sm text-gray-500 truncate">{doc.description}</p>
                              )}
                              <div className="flex items-center gap-3 mt-1.5">
                                {doc.academicYear && (
                                  <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
