import HeroSlider from "@/components/sections/HeroSlider";
import { VisaCarousel, HolidayCarousel, ActivityCarousel } from "@/components/sections/CardCarousels";
import FactsCounter from "@/components/sections/FactsCounter";
import Testimonials from "@/components/sections/Testimonials";
import { BlogSection } from "@/components/sections/BlogSection";
import {
  getVisas,
  getHolidays,
  getActivities,
  getTestimonials,
  getBlogs,
} from "@/sanity/fetch";

export default async function Home() {
  const [visas, holidays, activities, testimonials, blogs] = await Promise.all([
    getVisas(),
    getHolidays(),
    getActivities(),
    getTestimonials(),
    getBlogs(),
  ]);

  return (
    <>
      {/* ──── HERO SLIDER ──── */}
      <HeroSlider />

      {/* ──── PAGE TITLE ──── */}
      <section className="py-10 bg-white text-center">
        <h1 className="text-2xl md:text-3xl font-[Poppins] font-bold text-primary">
          Travel Management Company in Dubai
        </h1>
      </section>

      {/* ──── VISA CAROUSEL ──── */}
      <VisaCarousel visas={visas} />

      {/* ──── HOLIDAY CAROUSEL ──── */}
      <HolidayCarousel holidays={holidays} />

      {/* ──── ACTIVITY CAROUSEL ──── */}
      <ActivityCarousel activities={activities} />

      {/* ──── FACTS & FIGURES ──── */}
      <FactsCounter />

      {/* ──── TESTIMONIALS ──── */}
      <Testimonials testimonials={testimonials} />

      {/* ──── BLOG SECTION ──── */}
      <BlogSection blogs={blogs} />
    </>
  );
}
