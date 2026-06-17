import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { blogPosts, getBlogPost, type BlogBlock } from "@/lib/data/blogs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article not found — PrintEve" };
  return { title: `${post.title} — PrintEve`, description: post.excerpt };
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="font-serif mt-10 mb-3 text-2xl font-medium tracking-tight">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className="text-foreground/80 mt-4 leading-relaxed">{block.text}</p>
      );
    case "ul":
      return (
        <ul className="mt-4 flex flex-col gap-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className="bg-brand mt-2.5 inline-block size-1.5 shrink-0 rounded-full" />
              <span className="text-foreground/80">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="border-brand text-foreground my-8 border-l-2 pl-5 font-serif text-xl leading-snug italic">
          {block.text}
        </blockquote>
      );
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const more = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article>
      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 lg:px-8">
        <Link
          href="/blogs"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm"
        >
          <ArrowLeft className="size-4" /> All articles
        </Link>

        <div className="mt-6 flex items-center gap-2 text-xs">
          <Badge>{post.category}</Badge>
          <span className="text-muted-foreground">{post.readTime}</span>
        </div>

        <h1 className="font-serif mt-4 text-4xl font-medium tracking-tight text-balance sm:text-5xl sm:leading-[1.05]">
          {post.title}
        </h1>

        <div className="text-muted-foreground mt-4 flex items-center gap-2 text-sm">
          <span className="text-foreground font-medium">{post.author}</span>
          <span>·</span>
          <span>{post.date}</span>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl border">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 56rem"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-muted-foreground border-l-2 pl-4 text-lg text-pretty">
          {post.excerpt}
        </p>

        <div className="mt-6">
          {post.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <Separator className="my-10" />

        {/* End CTA */}
        <div className="bg-muted/40 flex flex-col items-start gap-3 rounded-2xl border p-6">
          <h3 className="font-serif text-xl font-medium tracking-tight">
            Ready to print it?
          </h3>
          <p className="text-muted-foreground text-sm">
            Upload your design and our team will check it's print-ready before
            anything goes to press.
          </p>
          <Button asChild>
            <Link href="/products">
              Browse products <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>

      {/* More articles */}
      {more.length > 0 && (
        <section className="border-t">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-medium tracking-tight">
              Keep reading
            </h2>
            <div className="mt-6 flex flex-col gap-4">
              {more.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blogs/${p.slug}`}
                  className="group hover:bg-muted/40 flex items-center justify-between gap-4 rounded-lg border p-4"
                >
                  <div>
                    <p className="text-muted-foreground text-xs">
                      {p.category} · {p.readTime}
                    </p>
                    <p className="font-serif mt-1 text-lg font-medium group-hover:text-brand">
                      {p.title}
                    </p>
                  </div>
                  <ArrowRight className="text-muted-foreground group-hover:text-brand size-5 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
