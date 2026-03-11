"use client";

import { useState } from "react";
import { useCreatePost, useUpdatePost } from "../hooks/usePosts";
import { PostEntity } from "../../domain/entities/post.entity";
import { POSTS_LABELS } from "../labels";

interface PostFormProps {
  /** Post to edit — if provided, form is in edit mode */
  post?: PostEntity;
  /** Author user ID */
  authorUserId: number;
  /** Callback fired after successful submit */
  onSuccess?: () => void;
}

/**
 * Form component for creating and editing posts.
 * Handles both create and update flows.
 */
export default function PostForm({
  post,
  authorUserId,
  onSuccess,
}: PostFormProps) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");

  const { mutate: createPost, isPending: isCreating } = useCreatePost();
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();

  const isPending = isCreating || isUpdating;
  const isEditMode = !!post;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      updatePost({ id: post.id, data: { title, content } }, { onSuccess });
    } else {
      createPost({ title, content, authorUserId }, { onSuccess });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {POSTS_LABELS.postForm.titleLabel}{" "}
          <span className="text-red-500">
            {POSTS_LABELS.postForm.titleRequired}
          </span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={POSTS_LABELS.postForm.titlePlaceholder}
          minLength={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {POSTS_LABELS.postForm.contentLabel}{" "}
          <span className="text-red-500">
            {POSTS_LABELS.postForm.contentRequired}
          </span>
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={POSTS_LABELS.postForm.contentPlaceholder}
          rows={4}
          minLength={10}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium rounded-md transition-colors"
      >
        {isPending
          ? POSTS_LABELS.postForm.savingButton
          : isEditMode
            ? POSTS_LABELS.postForm.updateButton
            : POSTS_LABELS.postForm.createButton}
      </button>
    </form>
  );
}
