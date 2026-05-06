import type { CollectionEntry } from "astro:content";

export const stripMarkdown = (markdown: string = "") => {
  return markdown
    .replace(/<!--[\s\S]*?-->/g, "") // Remove HTML comments
    .replace(/^---\n[\s\S]*?\n---\n/g, "") // Remove frontmatter
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links but keep text
    .replace(/[*_~`#|>+\-]/g, "") // Remove formatting characters
    .replace(/\n+/g, " ") // Replace newlines with spaces
    .trim();
};

export const getPostDescription = (post: CollectionEntry<"blog">) => {
  if (post.body) {
    const summaryText = stripMarkdown(post.body);
    if (summaryText.length > 0) {
      return summaryText.length > 150
        ? summaryText.substring(0, 150) + "..."
        : summaryText;
    }
  }

  return post.data.description || "";
};
