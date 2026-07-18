import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { blogPosts } from "@/lib/data/blogs";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Blog — PrintEve",
  description:
    "Guides, tips and inspiration on custom printing — paper stocks, print-ready files, labels and more, written for businesses that print.",
};

export default function BlogsPage() {
  const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];
  const rest = blogPosts.filter((p) => p.slug !== featured.slug);

  return (
    <>
      <PageHeader
        eyebrow="The PrintEve Journal"
        title="Guides, tips & inspiration"
        description="Practical advice to help you get print-ready and make your products look their best."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Featured */}
        <Link
          href={`/blogs/${featured.slug}`}
          className="group grid gap-6 lg:grid-cols-2 lg:items-center"
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <Badge>{featured.category}</Badge>
              <span>{featured.readTime}</span>
            </div>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-balance group-hover:text-brand sm:text-4xl">
              {featured.title}
            </h2>
            <p className="text-muted-foreground text-pretty">
              {featured.excerpt}
            </p>
            <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
              <span className="text-foreground">{featured.author}</span>
              <span>·</span>
              <span>{featured.date}</span>
            </div>
            <span className="text-brand mt-2 inline-flex items-center gap-1 text-sm font-medium">
              Read article <ArrowRight className="size-4" />
            </span>
          </div>
        </Link>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 border-t pt-12 md:grid-cols-3">
          {rest.map((post) => (
            <Card
              key={post.slug}
              className="group overflow-hidden p-0 transition-shadow hover:shadow-md"
            >
              <Link
                href={`/blogs/${post.slug}`}
                className="relative block aspect-[16/10] overflow-hidden"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <CardContent className="flex flex-col gap-3 pb-6">
                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-serif text-xl leading-snug font-medium">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="hover:text-brand transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  {post.excerpt}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {post.date}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
