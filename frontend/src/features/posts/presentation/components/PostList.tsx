"use client";

import { useState } from "react";
import { usePosts, useDeletePost } from "../hooks/usePosts";
import PostForm from "./PostForm";
import { PostEntity } from "../../domain/entities/post.entity";
import { POSTS_LABELS } from "../labels";

/**
 * Component for displaying, editing and deleting posts.
 */
export default function PostList() {
  const { data: posts, isLoading, isError } = usePosts();
  const { mutate: deletePost } = useDeletePost();
  const [editingPost, setEditingPost] = useState<PostEntity | null>(null);
  const [showConfirm, setShowConfirm] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
        {POSTS_LABELS.postList.errorMessage}
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        {POSTS_LABELS.postList.emptyState}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          {editingPost?.id === post.id ? (
            <div>
              <p className="text-sm font-medium text-gray-500 mb-3">
                {POSTS_LABELS.postList.editingLabel}
              </p>
              <PostForm
                post={editingPost}
                authorUserId={post.authorUserId}
                onSuccess={() => setEditingPost(null)}
              />
              <button
                onClick={() => setEditingPost(null)}
                className="mt-2 text-sm text-gray-500 hover:text-gray-700"
              >
                {POSTS_LABELS.postList.cancelButton}
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{post.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{post.content}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {POSTS_LABELS.postList.authorLabel.replace(
                      "{authorUserId}",
                      String(post.authorUserId),
                    )}{" "}
                    · {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingPost(post)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    {POSTS_LABELS.postList.editButton}
                  </button>
                  <button
                    onClick={() => setShowConfirm(post.id)}
                    className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors"
                  >
                    {POSTS_LABELS.postList.deleteButton}
                  </button>
                </div>
              </div>

              {/* Delete confirmation */}
              {showConfirm === post.id && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md flex items-center justify-between">
                  <p className="text-sm text-red-600">
                    {POSTS_LABELS.postList.deleteConfirmMessage}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowConfirm(null)}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      {POSTS_LABELS.postList.deleteCancelButton}
                    </button>
                    <button
                      onClick={() => {
                        deletePost(post.id);
                        setShowConfirm(null);
                      }}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      {POSTS_LABELS.postList.deleteConfirmButton}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
