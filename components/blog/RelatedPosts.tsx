import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
}

interface RelatedPostsProps {
  posts: Post[];
  currentSlug: string;
}

const RelatedPosts = ({ posts, currentSlug }: RelatedPostsProps) => {
  const relatedPosts = posts
    .filter(post => post.slug !== currentSlug)
    .slice(0, 3);

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">Artículos Relacionados</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="relative w-full h-40 mb-4">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <h3 className="font-semibold mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;