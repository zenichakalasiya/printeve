import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { blogPosts } from "@/lib/data/blogs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/home/section-heading";

export function BlogPreview() {
  return (
    <section className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="From the blog"
            title="Guides, tips & inspiration"
            description="Get print-ready faster with advice from our team."
          />
          <Button variant="outline" asChild className="shrink-0">
            <Link href="/blogs">
              View all posts <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
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
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  {post.excerpt}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">{post.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
