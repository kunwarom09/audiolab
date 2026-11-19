import React from 'react';
import { getCanonicalUrl } from '@/lib/siteConfig';
import { ShieldCheck, Lock, Clock, HardDrive, EyeOff } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | iLoveAudios',
  description: 'Understand how iLoveAudios handles file uploads, temporary data processing, cookies, and user privacy.',
  alternates: {
    canonical: getCanonicalUrl('/privacy'),
  },
  openGraph: {
    title: 'Privacy Policy | iLoveAudios',
    description: 'Understand how iLoveAudios handles file uploads, temporary data processing, and user privacy.',
    url: getCanonicalUrl('/privacy'),
    siteName: 'iLoveAudios',
    locale: 'en_US',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="site-container py-12 sm:py-16 space-y-12">
      <div className="text-left space-y-4">
        <h1 className="text-[length:var(--text-h1)] font-bold text-[var(--color-text)]">
          Privacy Policy
        </h1>
        <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)]">
          Last Updated: August 31, 2026
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="ui-card space-y-3">
          <Clock className="w-6 h-6 text-blue-600" />
          <h2 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">Automatic Deletion</h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
            Uploaded files and converted audio are stored temporarily in isolated memory and automatically purged shortly after processing.
          </p>
        </div>

        <div className="ui-card space-y-3">
          <Lock className="w-6 h-6 text-emerald-600" />
          <h2 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">Encrypted in Transit</h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
            All data transmitted between your browser and our servers is encrypted using industry-standard TLS / HTTPS encryption.
          </p>
        </div>

        <div className="ui-card space-y-3">
          <EyeOff className="w-6 h-6 text-purple-600" />
          <h2 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">No Permanent Retention</h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
            We do not sell, rent, or permanently retain your audio files or personal content.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="ui-card space-y-8 text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
        <section className="space-y-3 prose-measure">
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">1. Information We Collect</h2>
          <p>
            When you use iLoveAudios, we process only the technical data required to perform audio conversions and song identification requests:
          </p>
          <ul className="list-disc pl-6 space-y-2 pt-1">
            <li><strong>Uploaded Audio and Video Files:</strong> Uploaded exclusively to perform the conversion or extraction task requested.</li>
            <li><strong>Public Social Media Links:</strong> URLs submitted to the Song Finder tool to extract background audio streams for acoustic matching.</li>
            <li><strong>Technical Log Data:</strong> Basic server diagnostic logs including IP address, browser user-agent, and error codes for service stability and rate-limiting.</li>
          </ul>
        </section>

        <section className="space-y-3 prose-measure">
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">2. How Uploaded Files Are Processed</h2>
          <p>
            Your audio and video files are uploaded directly to secure processing containers. Once conversion or audio fingerprinting is complete, files remain available briefly to allow download, after which they are permanently deleted by automated cleanup jobs. We do not inspect, catalog, or mine the contents of your files.
          </p>
        </section>

        <section className="space-y-3 prose-measure">
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">3. Local Storage and Client-Side Preferences</h2>
          <p>
            iLoveAudios stores certain user preferences locally on your device via browser <code className="px-2 py-0.5 rounded bg-[var(--color-bg)] font-mono text-[length:var(--text-base)]">localStorage</code>:
          </p>
          <ul className="list-disc pl-6 space-y-2 pt-1">
            <li><strong>Theme Preference:</strong> Dark or light mode setting.</li>
            <li><strong>Local Conversion &amp; Extraction History:</strong> Recent conversion records stored purely in your browser memory for your convenience. You can clear this history anytime via the History panel.</li>
          </ul>
        </section>

        <section className="space-y-3 prose-measure">
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">4. Third-Party Analytics and Services</h2>
          <p>
            We use privacy-conscious analytics (such as Ahrefs Analytics) to understand aggregated traffic patterns and optimize website performance. These services do not collect personal file data or audio recordings.
          </p>
        </section>

        <section className="space-y-3 prose-measure">
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">5. Contact Information</h2>
          <p>
            If you have any questions about this Privacy Policy or data handling practices, please contact us at <a href="mailto:privacy@iloveaudios.com" className="text-[var(--color-brand)] font-bold hover:underline">privacy@iloveaudios.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
