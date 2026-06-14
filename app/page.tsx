import { Hero } from "@/components/home/hero";
import { Categories } from "@/components/home/categories";
import { FeaturedProducts } from "@/components/home/featured-products";
import { UspCards } from "@/components/home/usp-cards";
import { HowItWorks } from "@/components/home/how-it-works";
import { UpcomingFeatures } from "@/components/home/upcoming-features";
import { Testimonials } from "@/components/home/testimonials";
import { BlogPreview } from "@/components/home/blog-preview";
import { SupportCta } from "@/components/home/support-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <UspCards />
      <HowItWorks />
      <UpcomingFeatures />
      <Testimonials />
      <BlogPreview />
      <SupportCta />
    </>
  );
}
