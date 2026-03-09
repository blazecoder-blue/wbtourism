"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "0q9vyzhv";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
    name: "wb-tourism",
    title: "WB Tourism CMS",
    projectId,
    dataset,
    plugins: [structureTool(), visionTool()],
    schema: {
        types: schemaTypes,
    },
    basePath: "/studio",
});
