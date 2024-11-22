import { getPosts } from '@/lib/mdx';
import BlogWrapper from '@/components/blog/BlogWrapper';
import { locales } from '@/navigation';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function BlogPage() {
  const posts = await getPosts();
  return <BlogWrapper posts={posts} />;
}