// src/app/page.tsx
import Link from 'next/link';
import { ArrowRightIcon, ShieldCheckIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-outfit text-slate-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-xl">
            <ShieldCheckIcon className="size-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">BlueCare</span>
        </div>
        <Link
          href="/login"
          className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-slate-800 transition-all"
        >
          Login to Dashboard
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          Next Generation Hospital Management
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Manage your patients <br />
          <span className="text-blue-600">smarter and faster.</span>
        </h1>

        <p className="text-lg text-slate-500 max-w-2xl mb-10 leading-relaxed">
          The all-in-one platform for doctors to track patient history, appointments,
          and medical analytics with secure MongoDB storage and JWT authentication.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
          >
            Get Started Free <ArrowRightIcon className="size-5" />
          </Link>
          <button className="px-8 py-4 rounded-2xl font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all">
            Watch Demo
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-32 w-full">
          <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 text-left">
            <div className="bg-white p-3 rounded-2xl w-fit shadow-sm mb-4">
              <UserGroupIcon className="size-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Patient Records</h3>
            <p className="text-slate-500">Securely store and manage thousands of patient profiles with history.</p>
          </div>

          <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 text-left">
            <div className="bg-white p-3 rounded-2xl w-fit shadow-sm mb-4">
              <ChartBarIcon className="size-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Real-time Analytics</h3>
            <p className="text-slate-500">Monitor critical patients and daily appointments in one dashboard.</p>
          </div>

          <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 text-left">
            <div className="bg-white p-3 rounded-2xl w-fit shadow-sm mb-4">
              <ShieldCheckIcon className="size-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Cloud Security</h3>
            <p className="text-slate-500">Built with MongoDB Atlas and JWT to keep medical data private.</p>
          </div>
        </div>
      </main>
    </div>
  );
}