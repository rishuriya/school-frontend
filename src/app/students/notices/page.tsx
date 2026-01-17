'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import Card from '../../../components/ui/Card';
import Modal from '../../../components/ui/Modal';
import { announcementsApi } from '../../../services/api';
import { NewsItem } from '../../../types/school';

export default function NoticesPage() {
    const [notices, setNotices] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedNotice, setSelectedNotice] = useState<NewsItem | null>(null);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                setLoading(true);
                const data = await announcementsApi.getAnnouncements(20);
                setNotices(data);
            } catch (error) {
                console.error('Failed to fetch notices:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotices();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            {/* Hero Section */}
            <section className="relative py-20 bg-blue-600 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '32px 32px'
                    }}></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                            School Notices & Announcements
                        </h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                            Stay informed with the latest updates, official announcements, and important notifications from the school administration.
                        </p>
                    </div>
                </div>
            </section>

            <main className="flex-1 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
                            <p className="text-gray-500 text-lg">Loading notices...</p>
                        </div>
                    ) : notices.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {notices.map((notice) => (
                                <Card
                                    key={notice.id}
                                    variant="elevated"
                                    className="group bg-white hover:shadow-2xl transition-all duration-300 border-l-4 border-l-blue-500 overflow-hidden cursor-pointer h-full flex flex-col"
                                    onClick={() => setSelectedNotice(notice)}
                                >
                                    <div className="relative">
                                        {notice.image ? (
                                            <div className="h-48 relative overflow-hidden">
                                                <img
                                                    src={notice.image}
                                                    alt={notice.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                                            </div>
                                        ) : (
                                            <div className={`h-48 bg-gradient-to-br ${notice.category === 'announcement' ? 'from-yellow-400 to-yellow-600' : 'from-blue-400 to-blue-600'
                                                } flex items-center justify-center group-hover:scale-105 transition-transform duration-300 relative overflow-hidden`}>
                                                <div className="absolute inset-0 opacity-10">
                                                    <div className="absolute inset-0" style={{
                                                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                                                        backgroundSize: '24px 24px'
                                                    }}></div>
                                                </div>
                                                <div className="relative z-10">
                                                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                                                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${notice.category === 'announcement' ? 'bg-yellow-100/90 text-yellow-800 border border-yellow-200' : 'bg-blue-100/90 text-blue-800 border border-blue-200'
                                                }`}>
                                                📢 <span className="ml-1 capitalize">{notice.category}</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center text-sm text-gray-500 mb-3">
                                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {notice.date}
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 leading-snug">
                                            {notice.title}
                                        </h2>
                                        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                                            {notice.content}
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
                                                Read Full Story
                                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200 shadow-sm max-w-xl mx-auto">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-6">
                                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Notices Found</h3>
                            <p className="text-gray-500">Check back later for new announcements and updates.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            {/* Detail Modal */}
            <Modal
                isOpen={!!selectedNotice}
                onClose={() => setSelectedNotice(null)}
                title={selectedNotice?.title || 'Notice Details'}
            >
                {selectedNotice && (
                    <div className="space-y-6">
                        {selectedNotice.image && (
                            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-100">
                                <img
                                    src={selectedNotice.image}
                                    alt={selectedNotice.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="flex flex-wrap items-center gap-4 text-sm">
                            <span className={`px-3 py-1 rounded-full font-semibold ${selectedNotice.category === 'announcement' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                                }`}>
                                {selectedNotice.category.charAt(0).toUpperCase() + selectedNotice.category.slice(1)}
                            </span>
                            <span className="text-gray-500 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {selectedNotice.date}
                            </span>
                        </div>

                        <div className="prose prose-blue max-w-none text-gray-600">
                            <div className="whitespace-pre-wrap leading-relaxed text-lg">
                                {selectedNotice.content}
                            </div>
                        </div>

                        {selectedNotice.attachments && selectedNotice.attachments.length > 0 && (
                            <div className="pt-6 border-t border-gray-100">
                                <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                    Attachments
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                    {selectedNotice.attachments.map((url, idx) => (
                                        <a
                                            key={idx}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-white hover:border-blue-400 hover:text-blue-600 transition-all group"
                                        >
                                            <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                            Document {idx + 1}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
}
