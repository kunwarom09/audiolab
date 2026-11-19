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
    <div className="site-container py-12 sm:py-16 space-y-12">
      <div className="text-left space-y-4">
        <h1 className="text-[length:var(--text-h1)] font-bold text-[var(--color-text)]">
          Terms of Service
        </h1>
        <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)]">
          Last Updated: August 31, 2026
        </p>
      </div>

      <div className="ui-card space-y-8 text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
        <section className="space-y-3 prose-measure">
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">1. Acceptance of Terms</h2>
          <p>
            By accessing or using iLoveAudios (the &quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
          </p>
        </section>

        <section className="space-y-3 prose-measure">
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">2. Description of Service</h2>
          <p>
            iLoveAudios provides online multimedia conversion tools, audio editing utilities (such as cutting, joining, and volume adjustment), and acoustic music identification features without requiring software downloads or account registrations.
          </p>
        </section>

        <section className="space-y-3 prose-measure">
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">3. Permitted Use and User Content</h2>
          <p>
            You are solely responsible for all files, media, and links you submit to the Service:
          </p>
          <ul className="list-disc pl-6 space-y-2 pt-1">
            <li>You affirm that you have the necessary rights, licenses, or permissions to convert, edit, or identify the audio content you upload.</li>
            <li>You agree not to use the Service for any unlawful, infringing, abusive, or malicious purpose.</li>
            <li>You agree not to attempt to circumvent rate limits, disrupt server infrastructure, or deploy automated scrapers against the Service.</li>
          </ul>
        </section>

        <section className="space-y-3 prose-measure">
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">4. Intellectual Property &amp; Third-Party Content</h2>
          <p>
            iLoveAudios does not claim ownership over any user-submitted audio or video files. Song identification metadata, lyrics, and music video embeds are fetched from public music databases (such as Shazam and YouTube) for informational reference under fair use principles.
          </p>
        </section>

        <section className="space-y-3 prose-measure">
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">5. Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied, including fitness for a particular purpose or non-infringement. We do not guarantee that the Service will be uninterrupted, error-free, or that conversions will meet specific subjective fidelity standards.
          </p>
        </section>

        <section className="space-y-3 prose-measure">
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, iLoveAudios and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of the Service.
          </p>
        </section>

        <section className="space-y-3 prose-measure">
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">7. Contact Information</h2>
          <p>
            For questions regarding these Terms of Service, please contact us at <a href="mailto:support@iloveaudios.com" className="text-[var(--color-brand)] font-bold hover:underline">support@iloveaudios.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
