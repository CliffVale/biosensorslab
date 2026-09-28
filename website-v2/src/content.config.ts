import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const publications = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/publications" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    authors: z.array(z.string()),
    year: z.number(),
    venue: z.string(),
    type: z.enum(['paper', 'book', 'patent', 'software']).default('paper'),
    cover: image().optional(),
    doi: z.string().optional(),
    award: z.string().optional(),
    links: z.object({
      pdf: z.string().optional(),
      code: z.string().optional(),
      website: z.string().optional(),
      demo: z.string().optional(),
      slides: z.string().optional(),
      video: z.string().optional(),
      doi: z.string().optional(),
    }).optional(),
    featured: z.boolean().default(false),
    badges: z.array(z.object({
      text: z.string(),
      type: z.enum(['gold', 'blue', 'red', 'green', 'default']).default('default')
    })).optional(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/team" }),
  schema: ({ image }) => z.object({
    name: z.string(),
    role: z.enum([
      'Principal Investigator', 
      'Professor', 
      'Associate Professor',
      'Assistant Professor',
      'Postdoc', 
      'Research Scientist',
      'Research Assistant',
      'PhD Student', 
      'Master Student', 
      'Undergraduate', 
      'Alumni'
    ]),
    title: z.array(z.string()).optional(), // For specific academic titles like "Academician", "Changjiang Scholar"
    avatar: image().optional(),
    bio: z.string().optional(), // Short bio for card
    email: z.string().optional(),
    website: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    twitter: z.string().optional(),
    googleScholar: z.string().optional(),
    weight: z.number().default(100),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string().optional(),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/research" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    cover: image().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(100),
  }),
});

const patents = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/patents" }),
  schema: z.object({
    title: z.string(),
    number: z.string(), // Application / serial / docket number
    status: z
      .enum(['Granted', 'Filed', 'Application Submitted', 'Provisional Filed'])
      .default('Filed'),
    year: z.number(),
    jurisdiction: z.string().default('India'),
    date: z.string().optional(), // human-readable filing date, e.g. "17 August 2018"
    note: z.string().optional(),
    order: z.number().default(100),
  }),
});

const equipment = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/equipment" }),
  schema: ({ image }) => z.object({
    name: z.string(),
    function: z.string(), // Primary function
    category: z.string().optional(),
    brand: z.string().optional(),
    cover: image().optional(),
    order: z.number().default(100),
  }),
});

export const collections = {
  publications,
  team,
  news,
  research,
  equipment,
  patents,
};
