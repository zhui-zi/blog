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
      { name: 'email-outline', label: 'Email', href: 'mailto:hikeita@outlook.com' },
      { name: 'school-outline', label: 'Edu Email', href: 'mailto:cjm49@columbia.edu' },
      { name: 'github', label: 'GitHub', href: 'https://github.com/zhui-zi' },
      { name: 'twitter', label: 'X', href: 'https://x.com/azhuizi' },
      { name: 'steam', label: 'Steam', href: 'https://steamcommunity.com/id/hikeita/' },
      {
        name: 'nintendo-switch',
        label: 'Nintendo Switch',
        copyText: 'SW-3339-4585-7885',
        copiedLabel: '已复制',
      },
      {
        name: 'discord',
        label: 'Discord',
        href: 'https://discordapp.com/users/890138577185435688',
      },
    ],
    navLinks: [
      { name: 'Posts', href: '/' },
      { name: 'Archive', href: '/archive' },
    ],
    categoryMap: [],
    footer: [
      '© %year <a href="%website">%author</a>',
      'Published with <a target="_blank" rel="noopener noreferrer" href="https://astro.build/">Astro</a>',
    ],
  },
  appearance: {
    theme: 'system',
    locale: 'zh-cn',
    colorsLight: {
      primary: '#332f2a',
      background: '#e6e0d3',
    },
    colorsDark: {
      primary: '#e6e0d3',
      background: '#332f2a',
    },
    fonts: {
      header: '"Noto Serif SC","Source Han Serif SC","Source Han Serif CN","Songti SC","STSong",serif',
      ui: '"Noto Serif SC","Source Han Serif SC","Source Han Serif CN","Songti SC","STSong",serif',
    },
  },
  seo: {
    twitter: '@azhuizi',
  },
  rss: {
    fullText: true,
  },
}
