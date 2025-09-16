'use client';

import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function OnlineFeePaymentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Online Fee Payment</h1>
          <p className="text-gray-700 mb-6">Pay school fees securely online. This is a placeholder section; integrate with your payment gateway (e.g., Razorpay, Stripe) here.</p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg">
            Proceed to Payment
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}


