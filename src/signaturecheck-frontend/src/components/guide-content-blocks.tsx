import { ArrowRight, BookOpen, CircleAlert, FileCheck2, Info } from "lucide-react";
import Link from "next/link";

import type { GuideBlock, GuidePageContent } from "@/content/guides";

export function QuickAnswer({ answer }: { answer: GuidePageContent["answer"] }) {
  return (
    <section id="tra-loi-ngan" className="scroll-mt-6 border-l-4 border-primary bg-accent px-5 py-5 sm:px-6">
      <div className="flex items-center gap-2 text-primary">
        <BookOpen className="h-5 w-5" aria-hidden={true} />
        <h2 className="text-lg font-semibold text-foreground">{answer.title}</h2>
      </div>
      <p className="mt-3 text-base leading-7 text-secondary-foreground">{answer.text}</p>
    </section>
  );
}

export function GuideBlockView({ block }: { block: GuideBlock }) {
  if (block.kind === "steps") {
    return <StepsBlock block={block} />;
  }

  if (block.kind === "definitions") {
    return <DefinitionsBlock block={block} />;
  }

  if (block.kind === "comparison") {
    return <ComparisonBlock block={block} />;
  }

  if (block.kind === "checklist") {
    return <ChecklistBlock block={block} />;
  }

  return <CalloutBlock block={block} />;
}

export function ToolCallout({
  tool,
  compact = false,
}: {
  tool: GuidePageContent["tool"];
  compact?: boolean;
}) {
  return (
    <aside
      className={`${compact ? "my-6" : "mt-10"} rounded-md border bg-white px-5 py-5 sm:px-6`}
      aria-label="Công cụ liên quan"
    >
      <div className="grid gap-4">
        <div>
          <p className="font-semibold text-foreground">{tool.title}</p>
          <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">{tool.text}</p>
        </div>
        <Link
          className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-blue-700 sm:w-fit"
          href={tool.href}
        >
          {tool.label}
          <ArrowRight className="h-4 w-4" aria-hidden={true} />
        </Link>
      </div>
    </aside>
  );
}

function SectionHeading({ block }: { block: Exclude<GuideBlock, { kind: "callout" }> }) {
  return (
    <>
      <h2 className="text-2xl font-semibold leading-tight text-foreground sm:text-3xl">{block.title}</h2>
      {block.lead ? <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">{block.lead}</p> : null}
    </>
  );
}

function StepsBlock({ block }: { block: Extract<GuideBlock, { kind: "steps" }> }) {
  return (
    <section id={block.id} className="scroll-mt-6 border-t py-10">
      <SectionHeading block={block} />
      <ol className="mt-7 border-t">
        {block.steps.map((step, index) => (
          <li className="grid gap-3 border-b py-5 sm:grid-cols-[2.5rem_11rem_1fr] sm:items-start" key={step.title}>
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-sm font-semibold text-primary">
              {index + 1}
            </span>
            <h3 className="font-semibold leading-6 text-foreground">{step.title}</h3>
            <p className="text-sm leading-6 text-muted-foreground">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function DefinitionsBlock({ block }: { block: Extract<GuideBlock, { kind: "definitions" }> }) {
  return (
    <section id={block.id} className="scroll-mt-6 border-t py-10">
      <SectionHeading block={block} />
      <dl className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {block.items.map((item) => (
          <div className="border-l-2 border-primary pl-4" key={item.title}>
            <dt className="font-semibold text-foreground">{item.title}</dt>
            <dd className="mt-1 text-sm leading-6 text-muted-foreground">{item.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function ComparisonBlock({ block }: { block: Extract<GuideBlock, { kind: "comparison" }> }) {
  return (
    <section id={block.id} className="scroll-mt-6 border-t py-10">
      <SectionHeading block={block} />
      <div className="mt-7 overflow-x-auto rounded-md border bg-white">
        <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
          <thead className="bg-slate-100 text-foreground">
            <tr>
              <th className="w-36 px-4 py-3 font-semibold" scope="col">
                Tiêu chí
              </th>
              <th className="px-4 py-3 font-semibold" scope="col">
                {block.leftLabel}
              </th>
              <th className="px-4 py-3 font-semibold" scope="col">
                {block.rightLabel}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {block.rows.map((row) => (
              <tr className="align-top" key={row.criterion}>
                <th className="px-4 py-4 font-semibold text-foreground" scope="row">
                  {row.criterion}
                </th>
                <td className="px-4 py-4 leading-6 text-muted-foreground">{row.left}</td>
                <td className="px-4 py-4 leading-6 text-muted-foreground">{row.right}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ChecklistBlock({ block }: { block: Extract<GuideBlock, { kind: "checklist" }> }) {
  return (
    <section id={block.id} className="scroll-mt-6 border-t py-10">
      <SectionHeading block={block} />
      <ul className="mt-7 divide-y border-y">
        {block.items.map((item) => (
          <li className="grid gap-2 py-5 sm:grid-cols-[1.1rem_12rem_1fr] sm:gap-4" key={item.title}>
            <FileCheck2 className="mt-1 hidden h-4 w-4 text-primary sm:block" aria-hidden={true} />
            <p className="font-semibold leading-6 text-foreground">{item.title}</p>
            <p className="text-sm leading-6 text-muted-foreground">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CalloutBlock({ block }: { block: Extract<GuideBlock, { kind: "callout" }> }) {
  const warning = block.tone === "warning";
  const Icon = warning ? CircleAlert : Info;

  return (
    <aside
      id={block.id}
      className={`scroll-mt-6 border-l-4 px-5 py-5 ${
        warning ? "border-amber-500 bg-amber-50 text-amber-950" : "border-sky-500 bg-sky-50 text-sky-950"
      }`}
    >
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden={true} />
        <div>
          <h2 className="font-semibold">{block.title}</h2>
          <p className="mt-2 text-sm leading-6 opacity-80">{block.text}</p>
        </div>
      </div>
    </aside>
  );
}
