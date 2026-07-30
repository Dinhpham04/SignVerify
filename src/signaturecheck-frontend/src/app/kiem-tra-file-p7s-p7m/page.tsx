import { SeoLandingPage } from "@/components/seo-landing-page";
import { createLandingMetadata, landingPages } from "@/content/seo-landings";

const page = landingPages.cades;

export const metadata = createLandingMetadata(page);

export default function CadesSignatureCheckPage() {
  return <SeoLandingPage page={page} />;
}
