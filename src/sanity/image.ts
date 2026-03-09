import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

// Use any for source to avoid rigid type issues during build
export function urlFor(source: any) {
    return builder.image(source);
}
