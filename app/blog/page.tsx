import { getAllPosts } from '@/app/lib/blog';
import BlogPageClient from './BlogPageClient';

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogPageClient posts={posts} />;
}
