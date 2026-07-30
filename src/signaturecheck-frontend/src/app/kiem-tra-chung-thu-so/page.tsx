import { SeoLandingPage } from "@/components/seo-landing-page";
import { createLandingMetadata, landingPages } from "@/content/seo-landings";

const page = landingPages.certificate;

export const metadata = createLandingMetadata(page);

export default function CertificateCheckPage() {
  return <SeoLandingPage page={page} />;
}
