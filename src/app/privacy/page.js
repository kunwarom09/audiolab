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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-black uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Security & Data Protection</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)]">
          Last Updated: August 31, 2026
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel rounded-2xl p-5 space-y-2">
          <Clock className="w-5 h-5 text-blue-500" />
          <h2 className="text-xs font-bold text-[var(--text-primary)]">Automatic Deletion</h2>
          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
            Uploaded files and converted audio are stored temporarily in isolated memory and automatically purged shortly after processing.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-5 space-y-2">
          <Lock className="w-5 h-5 text-emerald-500" />
          <h2 className="text-xs font-bold text-[var(--text-primary)]">Encrypted in Transit</h2>
          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
            All data transmitted between your browser and our servers is encrypted using industry-standard TLS / HTTPS encryption.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-5 space-y-2">
          <EyeOff className="w-5 h-5 text-purple-500" />
          <h2 className="text-xs font-bold text-[var(--text-primary)]">No Permanent Retention</h2>
          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
            We do not sell, rent, or permanently retain your audio files or personal content.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border border-[var(--border-color)]">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">1. Information We Collect</h2>
          <p>
            When you use iLoveAudios, we process only the technical data required to perform audio conversions and song identification requests:
          </p>
          <ul className="list-disc pl-5 space-y-1 pt-1">
            <li><strong>Uploaded Audio and Video Files:</strong> Uploaded exclusively to perform the conversion or extraction task requested.</li>
            <li><strong>Public Social Media Links:</strong> URLs submitted to the Song Finder tool to extract background audio streams for acoustic matching.</li>
            <li><strong>Technical Log Data:</strong> Basic server diagnostic logs including IP address, browser user-agent, and error codes for service stability and rate-limiting.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">2. How Uploaded Files Are Processed</h2>
          <p>
            Your audio and video files are uploaded directly to secure processing containers. Once conversion or audio fingerprinting is complete, files remain available briefly to allow download, after which they are permanently deleted by automated cleanup jobs. We do not inspect, catalog, or mine the contents of your files.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">3. Local Storage and Client-Side Preferences</h2>
          <p>
            iLoveAudios stores certain user preferences locally on your device via browser <code className="px-1.5 py-0.5 rounded bg-[var(--bg-card-hover)] font-mono text-[11px]">localStorage</code>:
          </p>
          <ul className="list-disc pl-5 space-y-1 pt-1">
            <li><strong>Theme Preference:</strong> Dark or light mode setting.</li>
            <li><strong>Local Conversion & Extraction History:</strong> Recent conversion records stored purely in your browser memory for your convenience. You can clear this history anytime via the History panel.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">4. Third-Party Analytics and Services</h2>
          <p>
            We use privacy-conscious analytics (such as Ahrefs Analytics) to understand aggregated traffic patterns and optimize website performance. These services do not collect personal file data or audio recordings.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">5. Contact Information</h2>
          <p>
            If you have any questions about this Privacy Policy or data handling practices, please contact us at <a href="mailto:privacy@iloveaudios.com" className="text-[var(--iloveaudios-red)] font-bold hover:underline">privacy@iloveaudios.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
