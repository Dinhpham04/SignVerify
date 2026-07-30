import { GuideLandingPage } from "@/components/guide-landing-page";
import { createGuideMetadata, guides } from "@/content/guides";

const page = guides.validInvoice;

export const metadata = createGuideMetadata(page);

export default function ValidElectronicInvoiceGuidePage() {
  return <GuideLandingPage page={page} />;
}
