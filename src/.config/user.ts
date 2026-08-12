import type { UserConfig } from '~/types'

export const userConfig: Partial<UserConfig> = {
  site: {
    title: '黑川启太',
    subtitle: 'Keita',
    author: '黑川启太',
    description: '從瘋人院逃離後重新回到社會。',
    website: 'https://keita.cc/',
    pageSize: 10,
    socialLinks: [
      { name: 'github', href: 'https://github.com/zhui-zi' },
      { name: 'twitter', href: 'https://x.com/azhuizi' },
      { name: 'steam', href: 'https://steamcommunity.com/id/hikeita/' },
      { name: 'discord', href: 'https://discordapp.com/users/890138577185435688' },
      { name: 'email', href: 'mailto:hikeita@outlook.com' },
      { name: 'rss', href: '/atom.xml' },
    ],
    navLinks: [
      { name: 'Posts', href: '/' },
      { name: 'Archive', href: '/archive' },
      { name: 'Categories', href: '/categories' },
      { name: 'About', href: '/about' },
    ],
    categoryMap: [],
    footer: [
      '© %year <a href="%website">%author</a>',
      'Theme <a target="_blank" rel="noopener noreferrer" href="https://github.com/moeyua/astro-theme-typography">Typography</a> by <a target="_blank" rel="noopener noreferrer" href="https://moeyua.com">Moeyua</a>',
      'Published with <a target="_blank" rel="noopener noreferrer" href="https://astro.build/">Astro</a>',
    ],
  },
  appearance: {
    theme: 'system',
    locale: 'zh-cn',
    colorsLight: {
      primary: '#2e405b',
      background: '#ffffff',
    },
    colorsDark: {
      primary: '#f3f0e8',
      background: '#232222',
    },
  },
  seo: {
    twitter: '@azhuizi',
  },
  rss: {
    fullText: true,
  },
}
