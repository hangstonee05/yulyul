<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 프로젝트: yulyul

## 중요 사항

- 결과는 반드시 한글과 영어로만 출력
- .env 파일은 절대 커밋 금지

---

# PROJECT KNOWLEDGE BASE

**Generated:** 2026-04-11
**Stack:** Next.js 16.2.1 + TypeScript + Tailwind CSS v4 + Static Export

## OVERVIEW

Stock market intelligence blog with military OSINT aesthetic. Generates static pages from markdown posts. Displays US/KR stock info with real-time market data aesthetic.

## STRUCTURE

```
yulyul/
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # Reusable UI components
│   ├── lib/           # Utilities (posts.ts)
│   ├── context/       # React context (SidebarContext)
│   └── content/       # Markdown blog posts
├── public/
│   └── data/          # Static JSON (stock-info.json)
└── scripts/           # Data generation scripts
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Stock pages | `src/app/stock/[ticker]/` | generateStaticParams + generateMetadata |
| Blog posts | `src/app/blog/[slug]/` | Markdown rendering + react-markdown |
| Blog list | `src/app/blog/page.tsx` | Server component fetches posts |
| Home page | `src/app/page.tsx` | Stock cards + AdBanner |
| Post utilities | `src/lib/posts.ts` | gray-matter + fs operations |
| Context | `src/context/SidebarContext.tsx` | Menu state + category filter |
| Components | `src/components/` | Header, Sidebar, BlogListClient, AdBanner |

## CONVENTIONS (THIS PROJECT)

- Korean comments for business logic and explanations
- English comments for technical implementation details
- All source code and agent output must use Korean and English ONLY
- `"use client"` for interactive components
- Server components: `generateStaticParams`, `generateMetadata`
- Static export: `output: "export"` in next.config.ts
- No API routes (static site generation only)
- TypeScript strict typing on all interfaces

## ANTI-PATTERNS (THIS PROJECT)

- NO non-Korean/English characters in code comments or generated output
- NO `.env` commits — add to .gitignore
- NO `as any` type suppression
- NO server components importing client-only libraries
- NO dynamic routes without `generateStaticParams`
- NO Chinese characters (Hanja/한자/中文) in any output or code comments

---

## TEXT FILTERING RULES

### Chinese Character (Hanja) Blocking
All agent output, code comments, and generated content must use ONLY:
- Korean: 가-힣 (Hangul syllables only)
- English: a-zA-Z0-9
- Allowable: spaces, punctuation (.,;:!?-_(){}[])

**BLOCKED characters:**
- Chinese characters: [\u4E00-\u9FFF] (CJK Unified Ideographs)
- Japanese kanji/hiragana/katakana: [\u3040-\u309F\u30A0-\u30FF]
- Emoji and symbols beyond ASCII punctuation

### Why This Matters
If Hanja characters appear in output, it indicates the rule is not being enforced. When you encounter:
- "Justification" field with Hanja
- Any Chinese/Japanese characters in output
- Unexpected non-Latin text

→ Stop and remove/convert to Korean or English immediately.

### Enforcement
If Hanja is detected in output, do NOT proceed. Fix by replacing with:
1. Pure Korean (preferred)
2. English equivalent

---

### Extended Character Filtering Rules

#### Problematic Patterns to Avoid

Certain Korean grammatical forms and expressions closely resemble Chinese/Japanese characters and should be avoided:

| Pattern | Risk | Alternative |
|---------|------|-------------|
| `-면서/-으면서` | Looks like Chinese 边 | `-고` or `-해 가며` |
| `하면서` | Character collision | `하며` or `해 가며'` |
| `걸으면서` | Monitor closely | `걸으며'` or `걸어 가며'` |

#### Recommended Alternatives

```markdown
// AVOID (potential CJK collision)
- "검색하면서" → Looks similar to 边 character
- "하면서" → May appear as CJK
- "걸으면서" → Monitor

// USE INSTEAD
- "검색하며" ✓
- "검색해 가며" ✓
- "하며" ✓
- "해 가며" ✓
```

#### File Edit Safety Protocol

Before any file edit:
1. Check for CJK characters: grep pattern `[\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF]`
2. If edit fails repeatedly → rewrite entire file instead of incremental edit
3. After major edits → verify with final grep check

When encountering "oldString not found" errors:
- The content may have encoding drift
- DO NOT attempt incremental edits
- Rewrite the affected section completely

---

## UNIQUE STYLES

- Military/OSINT terminal aesthetic (Press Start 2P + JetBrains Mono fonts)
- Scanline effects, blue/cyan color scheme
- All caps headings, monospace UI elements
- "CLASSIFIED" / "INTELLIGENCE" / "SURVEILLANCE" themed copy

## COMMANDS

```bash
npm run dev      # Development server
npm run build    # Static export build
npm run lint     # ESLint check
```

## NEXT.JS APP ROUTER PATTERNS

```typescript
// Dynamic params (async in Next.js 16+)
export async function generateStaticParams() { ... }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { ... }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { ... }
```

## DATA FLOW

```
Markdown files (src/content/posts/)
    ↓ gray-matter parsing
PostData[] via getSortedPostsData()
    ↓
Blog pages (SSR via fs)
    ↓
ReactMarkdown rendering
```
