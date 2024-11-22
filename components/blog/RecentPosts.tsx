import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  category: string;
}

interface RecentPostsProps {
  posts: Post[];
}

const RecentPosts = ({ posts }: RecentPostsProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Artículos Recientes</h2>
      <div className="grid gap-4">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 flex gap-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-500">{post.date}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;