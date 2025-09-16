'use client';

import React from 'react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import Link from 'next/link';

export default function FeesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Fees</h1>
          <p className="text-gray-700 mb-6">Fee structure placeholder. Add class-wise fee details and due schedules here.</p>
          <Link href="/online-fee-payment" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold">Pay Fees Online</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}


