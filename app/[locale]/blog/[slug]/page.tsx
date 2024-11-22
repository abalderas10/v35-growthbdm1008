import { getPostBySlug, getPosts } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NewsletterSubscribe from '@/components/blog/NewsletterSubscribe';
import RecentPosts from '@/components/blog/RecentPosts';
import RelatedPosts from '@/components/blog/RelatedPosts';
import { notFound } from 'next/navigation';
import { locales } from '@/navigation';

export async function generateStaticParams() {
  const posts = await getPosts();
  const paths = [];
  
  for (const locale of locales) {
    for (const post of posts) {
      paths.push({
        locale,
        slug: post.slug
      });
    }
  }
  
  return paths;
}

export default async function BlogPost({ params }: { params: { slug: string; locale: string } }) {
  const post = await getPostBySlug(params.slug);
  const allPosts = await getPosts();
  
  if (!post) {
    notFound();
  }

  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const recentPosts = allPosts
    .filter(p => p.slug !== post.slug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="ghost" className="mb-4 hover:bg-blue-50 -ml-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Blog
              </Button>
            </Link>
            <span className="text-blue-600 font-medium">{post.category}</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-600">{post.date}</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-8 text-gray-900">{post.title}</h1>
          
          <div className="relative w-full h-[400px] mb-8">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>

          <div className="prose max-w-none mb-12">
            <MDXRemote source={post.content} />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              {relatedPosts.length > 0 && (
                <RelatedPosts posts={relatedPosts} currentSlug={post.slug} />
              )}
            </div>
            <div className="md:col-span-1">
              <NewsletterSubscribe />
              <div className="mt-8">
                <RecentPosts posts={recentPosts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}