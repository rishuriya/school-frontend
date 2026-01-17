'use client';

import React, { useEffect, useState } from 'react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import Card from '../../../components/ui/Card';
import Link from 'next/link';
import { publicApi } from '../../../services/api';
import { SchoolProfile } from '../../../types/school';

export default function FeesPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<SchoolProfile | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const data = await publicApi.getSchoolProfile();
      setProfile(data);
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const fees = profile?.profile?.admissionInfo?.fees || [];

  // Extract all unique classes mentioned in fees
  const allClasses = Array.from(
    new Set(
      fees.flatMap(f => f.classes || [])
    )
  ).sort((a, b) => {
    const numA = parseInt(a) || 0;
    const numB = parseInt(b) || 0;
    return numA - numB;
  });

  // Filter fees based on selected class
  // A fee matches if:
  // 1. No class is selected (show all)
  // 2. The fee has no classes assigned (applies to all)
  // 3. The fee's classes list contains the selected class
  const filteredFees = fees.filter(f => {
    if (!selectedClass) return true;
    if (!f.classes || f.classes.length === 0) return true;
    return f.classes.includes(selectedClass);
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Hero Section - Professional & Minimal */}
      <section className="bg-white border-b border-gray-200 shadow-sm relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="md:flex md:items-center md:justify-between relative z-10">
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-bold leading-7 text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight">
                Fees & <span className="text-blue-600">Financials</span>
              </h1>
              <p className="mt-2 text-lg text-gray-500 max-w-2xl">
                Transparent class-wise fee structure and payment policies. Select your class to view specific fee details.
              </p>
            </div>
            <div className="mt-4 flex md:ml-4 md:mt-0 gap-3">
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium border border-blue-100">
                💰 Quality Education
              </div>
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-medium border border-green-100">
                📅 Timely Payments
              </div>
            </div>
          </div>
        </div>
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
      </section>

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Fee Structure Section */}
          <section className="mb-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Class-wise Fee Structure</h2>
                <p className="text-gray-600 mt-1">Select a class to filter the applicable fees</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Filter by Class:</span>
                <div className="relative">
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="block w-48 rounded-md border-gray-300 py-2.5 pl-4 pr-10 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm shadow-sm appearance-none bg-white cursor-pointer hover:border-blue-400 transition-colors"
                  >
                    <option value="">All Classes</option>
                    {allClasses.map((cls) => (
                      <option key={cls} value={cls}>Class {cls}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredFees.length > 0 ? (
              <div className="bg-white overflow-hidden shadow-sm border border-gray-200 rounded-xl">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Fee Category
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Applicable Classes
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredFees.map((fee, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-semibold text-gray-900">{fee.category}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {!fee.classes || fee.classes.length === 0 ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                  All Classes
                                </span>
                              ) : (
                                fee.classes.map((cls) => (
                                  <span key={cls} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                    Class {cls}
                                  </span>
                                ))
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-lg font-bold text-green-600">{fee.amount}</span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-gray-600 max-w-md line-clamp-2" title={fee.description}>
                              {fee.description || '-'}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No fee data found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedClass ? `No fees found for Class ${selectedClass}.` : 'No fee structure has been added yet.'}
                </p>
              </div>
            )}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Fee Payment Policies */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Policies</h2>
              <div className="space-y-6">
                {(profile?.profile?.admissionInfo?.feeRules || []).map((rule, idx) => (
                  <Card key={idx} variant="elevated" className="border-0 shadow-sm border-l-4 border-orange-500 bg-white">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{rule.title}</h3>
                    </div>
                    {rule.description && <p className="text-gray-600 mb-6">{rule.description}</p>}
                    <ul className="space-y-3">
                      {rule.rules.map((item, ruleIdx) => (
                        <li key={ruleIdx} className="flex items-start text-sm text-gray-700">
                          <span className="text-orange-500 mr-2 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
                {!loading && (!profile?.profile?.admissionInfo?.feeRules || profile.profile.admissionInfo.feeRules.length === 0) && (
                  <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-500">No specific payment policies listed.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100 shadow-sm">
                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">💡</span> Need Help?
                </h3>
                <p className="text-blue-700 mb-6 leading-relaxed">
                  Have questions about fees, scholarship programs, or payment plans? Our accounts office is here to assist you.
                </p>
                <div className="space-y-4">
                  {profile?.contactPhone && (
                    <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl border border-blue-200/50">
                      <span className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full">📞</span>
                      <div>
                        <p className="text-xs text-blue-600 font-medium">Call Us</p>
                        <p className="text-sm font-bold text-blue-900">{profile.contactPhone}</p>
                      </div>
                    </div>
                  )}
                  {profile?.contactEmail && (
                    <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl border border-blue-200/50">
                      <span className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full">✉️</span>
                      <div>
                        <p className="text-xs text-blue-600 font-medium">Email Us</p>
                        <p className="text-sm font-bold text-blue-900">{profile.contactEmail}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
