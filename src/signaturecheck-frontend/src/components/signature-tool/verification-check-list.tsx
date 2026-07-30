import { Badge } from "@/components/ui/badge";
import type { SignatureChecks } from "@/lib/verification-api";

import {
  checkBadgeVariant,
  checkDefinitions,
  checkExplanation,
  checkStatusLabel,
} from "./status-view";

export function VerificationCheckList({ checks }: { checks: SignatureChecks }) {
  return (
    <div className="divide-y border-y bg-white">
      {checkDefinitions.map((definition) => {
        const status = checks[definition.key];

        return (
          <div
            key={definition.key}
            className="grid gap-2 py-3 sm:grid-cols-[minmax(170px,0.65fr)_auto_minmax(260px,1.35fr)] sm:items-center sm:gap-4"
          >
            <p className="text-sm font-medium text-foreground">{definition.label}</p>
            <Badge className="w-fit" variant={checkBadgeVariant(status)}>
              {status === "NOT_CHECKED" && definition.notCheckedLabel
                ? definition.notCheckedLabel
                : checkStatusLabel(status)}
            </Badge>
            <p className="text-sm leading-6 text-muted-foreground">
              {checkExplanation(status, definition)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
