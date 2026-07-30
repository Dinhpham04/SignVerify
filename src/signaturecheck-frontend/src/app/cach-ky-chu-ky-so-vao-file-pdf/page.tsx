import { GuideLandingPage } from "@/components/guide-landing-page";
import { createGuideMetadata, guides } from "@/content/guides";

const page = guides.signPdf;

export const metadata = createGuideMetadata(page);

export default function SignPdfGuidePage() {
  return <GuideLandingPage page={page} />;
}
