import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import LegalLayout from "@/components/LegalLayout";

const BASE = "https://discreteshadoww.com";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Discrete Shadow collects, uses and protects your personal information.",
  alternates: { canonical: `${BASE}/privacy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <LegalLayout
        title="Privacy Policy"
        lastUpdated="June 2026"
        intro="Discrete Shadow respects your privacy. This policy explains what information we collect when you use this website or contact us, how we use it, and the choices you have."
        sections={[
          {
            heading: "Information we collect",
            paragraphs: [
              "When you submit the contact or commission form, we collect the details you choose to provide — typically your name, email address, phone number and the description of your request.",
              "We do not require you to create an account, and we do not knowingly collect information from children.",
            ],
          },
          {
            heading: "How we use your information",
            paragraphs: [
              "Your information is used solely to respond to your enquiry, discuss and fulfil a commission, and arrange delivery. We do not sell, rent or trade your personal information to anyone.",
            ],
          },
          {
            heading: "Where your data is stored",
            paragraphs: [
              "Form submissions are stored securely using Supabase, our database and hosting provider. The website is served through our hosting platform, which may process basic technical data (such as IP address and browser type) to deliver and secure the site.",
            ],
          },
          {
            heading: "Third-party services",
            paragraphs: [
              "Some pages embed videos from YouTube. When you choose to play a video, YouTube may set cookies and collect data according to its own privacy policy. We load these embeds only after you click play.",
            ],
          },
          {
            heading: "Cookies",
            paragraphs: [
              "This site does not use advertising or tracking cookies. Only essential functionality required to operate the site is used.",
            ],
          },
          {
            heading: "Your rights",
            paragraphs: [
              "You may request a copy of the personal information we hold about you, ask us to correct it, or ask us to delete it at any time. To make a request, email info@discreteshadoww.com.",
            ],
          },
          {
            heading: "Contact",
            paragraphs: [
              "Questions about this policy? Email info@discreteshadoww.com and we'll be happy to help.",
            ],
          },
        ]}
      />
    </PageShell>
  );
}
