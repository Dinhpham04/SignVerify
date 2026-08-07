import { createTrustPageMetadata, TrustPage } from "@/components/trust-page";
import { getTrustPage } from "@/content/trust-pages";

const page = getTrustPage("gioi-thieu");

export const metadata = createTrustPageMetadata(page);

export default function AboutPage() {
  return <TrustPage page={page} />;
}
