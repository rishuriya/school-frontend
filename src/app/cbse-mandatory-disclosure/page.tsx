'use client';

import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function CBSEMandatoryDisclosurePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">CBSE Mandatory Disclosure</h1>
          <p className="text-gray-700 mb-6">This page lists the information required under CBSE mandatory disclosure norms. Replace placeholders with official documents/links.</p>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li>Affiliation details and status</li>
            <li>School management committee details</li>
            <li>Infrastructure and facilities</li>
            <li>Teacher and staff information</li>
            <li>Academic calendar</li>
            <li>Fee structure</li>
            <li>Transfer certificate sample</li>
            <li>Safety measures and audits</li>
          </ul>
        </div>
      </section>
      <Footer />
    </div>
  );
}


