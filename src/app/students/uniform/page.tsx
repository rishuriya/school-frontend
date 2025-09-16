'use client';

import React from 'react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';

export default function UniformPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Uniform</h1>
          <p className="text-gray-700">Uniform guidelines placeholder. Include items, seasonal variations, and vendor details.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}


