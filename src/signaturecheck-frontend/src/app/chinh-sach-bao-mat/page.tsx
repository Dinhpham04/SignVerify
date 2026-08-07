import { createTrustPageMetadata, TrustPage } from "@/components/trust-page";
import { getTrustPage } from "@/content/trust-pages";

const page = getTrustPage("chinh-sach-bao-mat");

export const metadata = createTrustPageMetadata(page);

export default function PrivacyPolicyPage() {
  return <TrustPage page={page} />;
}
