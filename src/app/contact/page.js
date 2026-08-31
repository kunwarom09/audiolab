import React from 'react';
import { getCanonicalUrl } from '@/lib/siteConfig';
import { Mail, MessageSquare, ShieldCheck, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | iLoveAudios',
  description: 'Get in touch with the iLoveAudios team for support, feature suggestions, technical inquiries, or feedback.',
  alternates: {
    canonical: getCanonicalUrl('/contact'),
  },
  openGraph: {
    title: 'Contact Us | iLoveAudios',
    description: 'Get in touch with the iLoveAudios team for support and feedback.',
    url: getCanonicalUrl('/contact'),
    siteName: 'iLoveAudios',
    locale: 'en_US',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 text-xs font-black uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Support & Feedback</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
          Contact iLoveAudios
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
          Have a question about audio conversion, an issue with a file format, or a suggestion for a new tool? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[var(--text-primary)]">Email Support</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            For technical inquiries, bug reports, and general feedback, reach out to our team at:
          </p>
          <a
            href="mailto:support@iloveaudios.com"
            className="inline-block text-xs font-bold text-[var(--iloveaudios-red)] hover:underline pt-1"
          >
            support@iloveaudios.com
          </a>
        </div>

        <div className="glass-panel rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[var(--text-primary)]">Privacy Inquiries</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            For questions regarding file data handling, privacy practices, or removal requests:
          </p>
          <a
            href="mailto:privacy@iloveaudios.com"
            className="inline-block text-xs font-bold text-[var(--iloveaudios-red)] hover:underline pt-1"
          >
            privacy@iloveaudios.com
          </a>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4 border border-[var(--border-color)]">
        <div className="flex items-center gap-2 text-[var(--text-primary)]">
          <HelpCircle className="w-5 h-5 text-blue-500" />
          <h2 className="text-base font-bold">Frequently Asked Technical Questions</h2>
        </div>
        <div className="space-y-3 text-xs text-[var(--text-secondary)] leading-relaxed divide-y divide-[var(--border-color)]">
          <div className="pt-2">
            <h3 className="font-bold text-[var(--text-primary)] mb-1">What is the upload size limit?</h3>
            <p>You can upload audio and video files up to 500MB per file with unlimited free conversions.</p>
          </div>
          <div className="pt-3">
            <h3 className="font-bold text-[var(--text-primary)] mb-1">How long are files kept?</h3>
            <p>All converted audio files and uploads are automatically purged from our servers within a short period after conversion completes.</p>
          </div>
          <div className="pt-3">
            <h3 className="font-bold text-[var(--text-primary)] mb-1">Do I need to create an account?</h3>
            <p>No, all tools on iLoveAudios are 100% free and do not require account registration or software installation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
