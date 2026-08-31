import React from 'react';
import { getCanonicalUrl } from '@/lib/siteConfig';
import { FileText, ShieldAlert, CheckCircle, Scale } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | iLoveAudios',
  description: 'Read the terms of service and conditions for using iLoveAudios free audio converters and utilities.',
  alternates: {
    canonical: getCanonicalUrl('/terms'),
  },
  openGraph: {
    title: 'Terms of Service | iLoveAudios',
    description: 'Terms of service for using iLoveAudios free audio converters and utilities.',
    url: getCanonicalUrl('/terms'),
    siteName: 'iLoveAudios',
    locale: 'en_US',
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-black uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5" />
          <span>User Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)]">
          Last Updated: August 31, 2026
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border border-[var(--border-color)]">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">1. Acceptance of Terms</h2>
          <p>
            By accessing or using iLoveAudios (the &quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">2. Description of Service</h2>
          <p>
            iLoveAudios provides online multimedia conversion tools, audio editing utilities (such as cutting, joining, and volume adjustment), and acoustic music identification features without requiring software downloads or account registrations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">3. Permitted Use and User Content</h2>
          <p>
            You are solely responsible for all files, media, and links you submit to the Service:
          </p>
          <ul className="list-disc pl-5 space-y-1 pt-1">
            <li>You affirm that you have the necessary rights, licenses, or permissions to convert, edit, or identify the audio content you upload.</li>
            <li>You agree not to use the Service for any unlawful, infringing, abusive, or malicious purpose.</li>
            <li>You agree not to attempt to circumvent rate limits, disrupt server infrastructure, or deploy automated scrapers against the Service.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">4. Intellectual Property & Third-Party Content</h2>
          <p>
            iLoveAudios does not claim ownership over any user-submitted audio or video files. Song identification metadata, lyrics, and music video embeds are fetched from public music databases (such as Shazam and YouTube) for informational reference under fair use principles.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">5. Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied, including fitness for a particular purpose or non-infringement. We do not guarantee that the Service will be uninterrupted, error-free, or that conversions will meet specific subjective fidelity standards.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, iLoveAudios and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of the Service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">7. Contact Information</h2>
          <p>
            For questions regarding these Terms of Service, please contact us at <a href="mailto:support@iloveaudios.com" className="text-[var(--iloveaudios-red)] font-bold hover:underline">support@iloveaudios.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
