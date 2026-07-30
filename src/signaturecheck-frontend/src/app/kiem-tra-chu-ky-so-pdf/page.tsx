import { SeoLandingPage } from "@/components/seo-landing-page";
import { createLandingMetadata, landingPages } from "@/content/seo-landings";

const page = landingPages.pdf;

export const metadata = createLandingMetadata(page);

export default function PdfSignatureCheckPage() {
  return <SeoLandingPage page={page} />;
}
