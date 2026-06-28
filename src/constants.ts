import type { Props } from "astro";
import IconMail from "@/assets/icons/IconMail.svg";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconWhatsapp from "@/assets/icons/IconWhatsapp.svg";
import IconFacebook from "@/assets/icons/IconFacebook.svg";
import IconTelegram from "@/assets/icons/IconTelegram.svg";
import IconPinterest from "@/assets/icons/IconPinterest.svg";

interface ShareLink {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
}

interface SocialLink {
  name: string;
  url?: string;
  emoji: string;
  action?: "copy";
  copyText?: string;
  copiedLabel?: string;
}

interface SocialGroup {
  type: "group";
  ariaLabel: string;
  links: SocialLink[];
}

export type Social = SocialLink | SocialGroup;

export const TOOL_LINKS = [
  { name: "☁️ Cloud", url: "https://file.keita.cc/" },
  { name: "🎥 OBS Overlay", url: "https://obsliveoverlay.keita.cc/" },
  { name: "🍺 SillyTavern", url: "https://jg.keita.cc" },
  { name: "🚩 Server Status", url: "https://tz.keita.cc/" },
  { name: "🎮 ASF", url: "https://asf.keita.cc/" },
  { name: "☕️ The Last Stand", url: "https://ff14.cafe" },
] as const;

export const SOCIALS: Social[] = [
  {
    type: "group",
    ariaLabel: "Email Links",
    links: [
      { name: "Email", url: "mailto:hikeita@outlook.com", emoji: "📧" },
      { name: "Edu Email", url: "mailto:cjm49@columbia.edu", emoji: "🎓" },
    ],
  },
  { name: "GitHub", url: "https://github.com/zhui-zi", emoji: "🐙" },
  { name: "X", url: "https://x.com/azhuizi", emoji: "𝕏" },
  {
    type: "group",
    ariaLabel: "Gaming Profiles",
    links: [
      {
        name: "Steam",
        url: "https://steamcommunity.com/id/hikeita/",
        emoji: "🎮",
      },
      {
        name: "NS",
        emoji: "🕹️",
        action: "copy",
        copyText: "SW-3339-4585-7885",
        copiedLabel: "已复制",
      },
    ],
  },
  {
    name: "Discord",
    url: "http://discordapp.com/users/890138577185435688",
    emoji: "💬",
  },
] as const;

export const SHARE_LINKS: ShareLink[] = [
  {
    name: "WhatsApp",
    href: "https://wa.me/?text=",
    linkTitle: `Share this post via WhatsApp`,
    icon: IconWhatsapp,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sharer.php?u=",
    linkTitle: `Share this post on Facebook`,
    icon: IconFacebook,
  },
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: `Share this post on X`,
    icon: IconBrandX,
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: `Share this post via Telegram`,
    icon: IconTelegram,
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com/pin/create/button/?url=",
    linkTitle: `Share this post on Pinterest`,
    icon: IconPinterest,
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: `Share this post via email`,
    icon: IconMail,
  },
] as const;
