import data from "@/content/reviews.json";

export type Review = {
  name: string;
  text: string;
  rating: number;
  posted: string;
  initials: string;
  platform: string;
};

export const reviews: Review[] = data.reviews as Review[];
export const aggregate = data.aggregate as { rating: string; count: number };

// Public Google Maps listing for the business (for "read all reviews" links).
export const googleReviewsUrl =
  "https://www.google.com/maps/search/?api=1&query=Ocean+Coast+Recovery+Center+Costa+Mesa";
