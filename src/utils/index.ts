import type { Post } from '~/types'
import { getCollection } from 'astro:content'
import dayjs from 'dayjs'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'

export async function getCategories() {
  const posts = await getPosts()
  const categories = new Map<string, Post[]>()

  for (const post of posts) {
    if (post.data.categories) {
      for (const c of post.data.categories) {
        const posts = categories.get(c) || []
        posts.push(post)
        categories.set(c, posts)
      }
    }
  }

  return categories
}

export async function getPosts(isArchivePage = false) {
  const posts = await getCollection('posts')

  posts.sort((a, b) => {
    if (isArchivePage) {
      return dayjs(a.data.pubDate).isBefore(dayjs(b.data.pubDate)) ? 1 : -1
    }

    const aDate = a.data.modDate ? dayjs(a.data.modDate) : dayjs(a.data.pubDate)
    const bDate = b.data.modDate ? dayjs(b.data.modDate) : dayjs(b.data.pubDate)

    return aDate.isBefore(bDate) ? 1 : -1
  })

  if (import.meta.env.PROD) {
    return posts.filter(post => post.data.draft !== true)
  }

  return posts
}

export function getPostId(post: Post | string) {
  const id = typeof post === 'string' ? post : post.id
  return id
    .split('/')
    .map(slugifyPathSegment)
    .join('/')
}

export function getPostPath(post: Post | string) {
  return `/posts/${getPostId(post)}/`
}

function slugifyPathSegment(segment: string) {
  return segment
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase('en-US')
    .replace(/[’']/g, '')
    .replace(/[^\p{Letter}\p{Number}.]+/gu, '-')
    .replace(/^-+|-+$/g, '')
}

const parser = new MarkdownIt()
const postDescriptionLength = 200

export function getPostDescription(post: Post) {
  if (post.data.description) {
    return post.data.description.slice(0, postDescriptionLength)
  }

  const html = parser.render(post.body || '')
  const sanitized = sanitizeHtml(html, { allowedTags: [] })
  const normalized = sanitized.replace(/\s+/g, ' ').trim()
  return normalized.slice(0, postDescriptionLength)
}

export function formatDate(date: Date, format: string = 'YYYY-MM-DD') {
  return dayjs(date).format(format)
}

export function getPathFromCategory(
  category: string,
  category_map: { name: string, path: string }[],
) {
  const mappingPath = category_map.find(l => l.name === category)
  return mappingPath ? mappingPath.path : category
}
