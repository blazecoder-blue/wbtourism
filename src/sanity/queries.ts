// ──── GROQ QUERIES ────

// Visa
export const allVisasQuery = `*[_type == "visa"] | order(name asc) {
  name, country, region,
  "slug": slug.current,
  "image": image.asset->url,
  price, processingTime, validity
}`;

export const visaBySlugQuery = `*[_type == "visa" && slug.current == $slug][0] {
  name, country, region,
  "slug": slug.current,
  "image": image.asset->url,
  price, processingTime, validity,
  requirements, description
}`;

// Holiday
export const allHolidaysQuery = `*[_type == "holiday"] | order(name asc) {
  name, destination,
  "slug": slug.current,
  duration, price, badge,
  "image": image.asset->url
}`;

export const holidayBySlugQuery = `*[_type == "holiday" && slug.current == $slug][0] {
  name, destination,
  "slug": slug.current,
  duration, price, badge,
  "image": image.asset->url,
  description, inclusions, itinerary
}`;

// Activity
export const allActivitiesQuery = `*[_type == "activity"] | order(name asc) {
  name,
  "slug": slug.current,
  duration, price,
  "image": image.asset->url
}`;

export const activityBySlugQuery = `*[_type == "activity" && slug.current == $slug][0] {
  name,
  "slug": slug.current,
  duration, price, location,
  "image": image.asset->url,
  description, highlights
}`;

// Cruise
export const allCruisesQuery = `*[_type == "cruise"] | order(name asc) {
  name, ship, ports, duration, price, badge, destination, departureMonth,
  "slug": slug.current,
  "image": image.asset->url
}`;

export const cruiseBySlugQuery = `*[_type == "cruise" && slug.current == $slug][0] {
  name, ship, ports, duration, price, badge, destination, departureMonth,
  "slug": slug.current,
  "image": image.asset->url,
  description
}`;

// Staycation
export const allStaycationsQuery = `*[_type == "staycation"] | order(name asc) {
  name, location, duration, rating, price, badge,
  "slug": slug.current,
  "image": image.asset->url
}`;

export const staycationBySlugQuery = `*[_type == "staycation" && slug.current == $slug][0] {
  name, location, duration, rating, price, badge,
  "slug": slug.current,
  "image": image.asset->url,
  description
}`;

// Blog
export const allBlogsQuery = `*[_type == "blog"] | order(date desc) {
  title,
  "slug": slug.current,
  date, excerpt, category,
  "image": image.asset->url
}`;

export const blogBySlugQuery = `*[_type == "blog" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  date, excerpt, category,
  "image": image.asset->url,
  body
}`;

// Press Releases
export const allPressReleasesQuery = `*[_type == "pressRelease"] | order(date desc) {
  title,
  "slug": slug.current,
  date,
  "image": image.asset->url
}`;

// Testimonials
export const allTestimonialsQuery = `*[_type == "testimonial"] | order(_createdAt desc) {
  name, text, rating, service,
  "avatar": avatar.asset->url
}`;

// Site Settings
export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  siteName, tagline, description,
  "logo": logo.asset->url,
  contact, social
}`;
