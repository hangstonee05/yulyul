import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  lastModified: string;
  summary: string;
  category: string;
  tags: string[];
  content: string;
}

export function getSortedPostsData(): PostData[] {
  // 폴더가 없으면 빈 배열 반환
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      // 날짜 처리 (Date 객체인 경우 YYYY-MM-DD 문자열로 변환)
      let date = matterResult.data.date;
      if (date instanceof Date) {
        date = date.toISOString().split('T')[0];
      } else if (typeof date !== 'string') {
        date = new Date().toISOString().split('T')[0]; // 기본값
      }

      const stats = fs.statSync(fullPath);
      const lastModified = stats.mtime.toISOString().split('T')[0];

      return {
        ...matterResult.data,
        slug,
        title: matterResult.data.title || 'Untitled',
        date,
        lastModified,
        summary: matterResult.data.summary || '',
        category: matterResult.data.category || 'Uncategorized',
        tags: matterResult.data.tags || [],
        content: matterResult.content,
      } as PostData;
    });

  // 날짜순 정렬
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllCategories(): string[] {
  const posts = getSortedPostsData();
  const categories = posts.map(post => post.category);
  return Array.from(new Set(categories));
}

export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      slug: fileName.replace(/\.md$/, ''),
    };
  });
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  // 날짜 처리
  let date = matterResult.data.date;
  if (date instanceof Date) {
    date = date.toISOString().split('T')[0];
  } else if (typeof date !== 'string') {
    date = new Date().toISOString().split('T')[0];
  }

  const stats = fs.statSync(fullPath);
  const lastModified = stats.mtime.toISOString().split('T')[0];

  return {
    ...matterResult.data,
    slug,
    title: matterResult.data.title || 'Untitled',
    date,
    lastModified,
    summary: matterResult.data.summary || '',
    category: matterResult.data.category || 'Uncategorized',
    tags: matterResult.data.tags || [],
    content: matterResult.content,
  } as PostData;
}
