import { SeoLandingPage } from "@/components/seo-landing-page";
import { createLandingMetadata, landingPages } from "@/content/seo-landings";

const page = landingPages.xml;

export const metadata = createLandingMetadata(page);

export default function XmlSignatureCheckPage() {
  return <SeoLandingPage page={page} />;
}
