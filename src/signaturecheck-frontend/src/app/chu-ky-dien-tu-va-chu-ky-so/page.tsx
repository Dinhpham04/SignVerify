import { GuideLandingPage } from "@/components/guide-landing-page";
import { createGuideMetadata, guides } from "@/content/guides";

const page = guides.signatureComparison;

export const metadata = createGuideMetadata(page);

export default function ElectronicAndDigitalSignatureGuidePage() {
  return <GuideLandingPage page={page} />;
}
