import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Settl",
    short_name: "Settl",
    description: "The credit score for freelancers.",
    start_url: "/",
    display: "browser",
    background_color: "#F7FAFF",
    theme_color: "#004FC5",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
