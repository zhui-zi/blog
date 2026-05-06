import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/config";

import { getPostDescription } from "@/utils/getPostDescription";

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedPosts.map(post => ({
      link: getPath(post.id, post.filePath),
      title: post.data.title,
      description: getPostDescription(post),
      pubDate: new Date(post.data.modDatetime ?? post.data.pubDatetime),
    })),
  });
}
