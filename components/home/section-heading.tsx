import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "text-brand flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase",
            align === "center" && "justify-center"
          )}
        >
          <span className="bg-brand inline-block h-px w-6" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground max-w-2xl text-pretty">
          {description}
        </p>
      )}
    </div>
  );
}
