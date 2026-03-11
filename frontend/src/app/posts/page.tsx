import PostForm from '@/features/posts/presentation/components/PostForm';
import PostList from '@/features/posts/presentation/components/PostList';

export default function PostsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Posts</h1>
        <p className="text-gray-500">Create and manage your posts.</p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Create Post</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <PostForm authorUserId={1} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">All Posts</h2>
        <PostList />
      </section>
    </div>
  );
}