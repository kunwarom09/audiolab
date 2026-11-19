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
    <div className="site-container py-12 sm:py-16 space-y-12">
      <div className="text-left space-y-4">
        <h1 className="text-[length:var(--text-h1)] font-bold text-[var(--color-text)]">
          Contact iLoveAudios
        </h1>
        <p className="text-[length:var(--text-lead)] text-[var(--color-text-muted)] prose-measure leading-[var(--leading-body)]">
          Have a question about audio conversion, an issue with a file format, or a suggestion for a new tool? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="ui-card space-y-3">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h2 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">Email Support</h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
            For technical inquiries, bug reports, and general feedback, reach out to our team at:
          </p>
          <a
            href="mailto:support@iloveaudios.com"
            className="min-h-[48px] py-[12px] inline-flex items-center text-[length:var(--text-base)] font-bold text-[var(--color-brand)] hover:underline"
          >
            support@iloveaudios.com
          </a>
        </div>

        <div className="ui-card space-y-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">Privacy Inquiries</h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
            For questions regarding file data handling, privacy practices, or removal requests:
          </p>
          <a
            href="mailto:privacy@iloveaudios.com"
            className="min-h-[48px] py-[12px] inline-flex items-center text-[length:var(--text-base)] font-bold text-[var(--color-brand)] hover:underline"
          >
            privacy@iloveaudios.com
          </a>
        </div>
      </div>

      <div className="ui-card space-y-4">
        <div className="flex items-center gap-3 text-[var(--color-text)]">
          <HelpCircle className="w-6 h-6 text-blue-700 shrink-0" />
          <h2 className="text-[length:var(--text-h2)] font-bold">Frequently Asked Technical Questions</h2>
        </div>
        <div className="space-y-4 text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] divide-y divide-[var(--color-border)]">
          <div className="pt-3 prose-measure">
            <h3 className="font-bold text-[var(--color-text)] text-[length:var(--text-h3)] mb-2">What is the upload size limit?</h3>
            <p>You can upload audio and video files up to 500MB per file with unlimited free conversions.</p>
          </div>
          <div className="pt-4 prose-measure">
            <h3 className="font-bold text-[var(--color-text)] text-[length:var(--text-h3)] mb-2">How long are files kept?</h3>
            <p>All converted audio files and uploads are automatically purged from our servers within a short period after conversion completes.</p>
          </div>
          <div className="pt-4 prose-measure">
            <h3 className="font-bold text-[var(--color-text)] text-[length:var(--text-h3)] mb-2">Do I need to create an account?</h3>
            <p>No, all tools on iLoveAudios are 100% free and do not require account registration or software installation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
