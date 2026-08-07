import { createTrustPageMetadata, TrustPage } from "@/components/trust-page";
import { getTrustPage } from "@/content/trust-pages";

const page = getTrustPage("dieu-khoan-su-dung");

export const metadata = createTrustPageMetadata(page);

export default function TermsOfUsePage() {
  return <TrustPage page={page} />;
}
