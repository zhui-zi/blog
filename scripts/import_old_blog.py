import html
import os
import re
import shutil
import xml.etree.ElementTree as ET

ROOT = r"c:\Users\keita\Documents\VSCode\blog"
OLD = os.path.join(ROOT, "old-blog")
XML_PATH = os.path.join(OLD, "local-search.xml")
OUT_ROOT = os.path.join(ROOT, "src", "data", "blog")
PUBLIC_IMG = os.path.join(ROOT, "public", "img")

SKIP_SLUGS = {"hello-world"}


def yaml_quote(value: str) -> str:
    if value is None:
        return '""'
    one = re.sub(r"\s+", " ", value).strip()
    one = html.unescape(one)
    one = one.replace("\\", "\\\\").replace('"', "\\\"")
    return f'"{one}"'


def extract_meta(html_text: str) -> dict:
    meta = {}
    def grab(pattern: str, key: str) -> None:
        m = re.search(pattern, html_text, re.IGNORECASE)
        if m:
            meta[key] = m.group(1)
    grab(r'<meta\s+name="description"\s+content="([^"]*)"', "description")
    grab(r'<meta\s+property="article:published_time"\s+content="([^"]*)"', "pub")
    grab(r'<meta\s+property="article:modified_time"\s+content="([^"]*)"', "mod")
    grab(r'<meta\s+name="author"\s+content="([^"]*)"', "author")
    return meta


def strip_html(text: str, limit: int = 160) -> str:
    plain = re.sub(r"<[^>]+>", " ", text)
    plain = re.sub(r"\s+", " ", plain).strip()
    if len(plain) > limit:
        plain = plain[:limit]
    return plain


def normalize_links(content: str) -> str:
    content = re.sub(r'href="/(\d{4}/\d{2}/\d{2}/[^/]+/)"', r'href="/posts/\1"', content)
    content = re.sub(r"href='/(\d{4}/\d{2}/\d{2}/[^/]+/)'", r"href='/posts/\1'", content)
    content = re.sub(r'href="https?://blog\.keita\.cc/(\d{4}/\d{2}/\d{2}/[^/]+/)"', r'href="/posts/\1"', content)
    content = re.sub(r'href="https?://keita\.cc/(\d{4}/\d{2}/\d{2}/[^/]+/)"', r'href="/posts/\1"', content)
    content = re.sub(r'src="https?://blog\.keita\.cc/', 'src="/', content)
    content = re.sub(r'src="https?://keita\.cc/', 'src="/', content)
    return content


def main() -> None:
    if not os.path.exists(XML_PATH):
        raise FileNotFoundError(XML_PATH)

    with open(XML_PATH, "r", encoding="utf-8", errors="ignore") as f:
        xml_text = f.read()

    root = ET.fromstring(xml_text)
    entries = root.findall(".//entry")
    imported = 0

    for entry in entries:
        link_el = entry.find("link")
        if link_el is None:
            continue
        link = link_el.attrib.get("href", "").strip()
        if not link:
            continue
        path = link.strip("/")
        parts = path.split("/")
        if len(parts) < 4:
            continue
        year, month, day = parts[0], parts[1], parts[2]
        slug = parts[-1]
        if slug in SKIP_SLUGS:
            continue

        title = entry.findtext("title", default="").strip()
        content = entry.findtext("content", default="")
        content = content.strip()
        content = normalize_links(content)

        categories = [c.text.strip() for c in entry.findall("./categories/category") if c.text]
        if not categories:
            categories = ["others"]

        index_path = os.path.join(OLD, path, "index.html")
        meta = {}
        if os.path.exists(index_path):
            with open(index_path, "r", encoding="utf-8", errors="ignore") as f:
                meta = extract_meta(f.read())

        description = meta.get("description") or strip_html(content)
        pub = meta.get("pub") or f"{year}-{month}-{day}T00:00:00Z"
        mod = meta.get("mod")
        author = meta.get("author") or "Keita"

        target_dir = os.path.join(OUT_ROOT, year, month, day)
        os.makedirs(target_dir, exist_ok=True)
        file_path = os.path.join(target_dir, f"{slug}.md")

        tag_lines = "\n".join([f"  - {yaml_quote(t)}" for t in categories])

        front = [
            "---",
            f"title: {yaml_quote(title)}",
            f"author: {yaml_quote(author)}",
            f"pubDatetime: {pub}",
        ]
        if mod and mod != pub:
            front.append(f"modDatetime: {mod}")
        front += [
            "featured: false",
            "draft: false",
            "tags:",
            tag_lines,
            f"description: {yaml_quote(description)}",
            "---",
            "",
            "",
        ]

        with open(file_path, "w", encoding="utf-8") as f:
            f.write("\n".join(front))
            f.write(content)

        imported += 1

    img_src = os.path.join(OLD, "img")
    if os.path.exists(img_src):
        os.makedirs(PUBLIC_IMG, exist_ok=True)
        shutil.copytree(img_src, PUBLIC_IMG, dirs_exist_ok=True)

    print(f"Imported posts: {imported}")


if __name__ == "__main__":
    main()
