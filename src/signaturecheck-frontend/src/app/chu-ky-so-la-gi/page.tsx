import { GuideLandingPage } from "@/components/guide-landing-page";
import { createGuideMetadata, guides } from "@/content/guides";

const page = guides.digitalSignature;

export const metadata = createGuideMetadata(page);

export default function DigitalSignatureGuidePage() {
  return <GuideLandingPage page={page} />;
}
