"use client";

import { useSavedUsers } from "../hooks/useUsers";
import { USERS_LABELS } from "../labels";

/**
 * Component for displaying locally saved users.
 */
export default function SavedUserList() {
  const { data: users, isLoading, isError } = useSavedUsers();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
        {USERS_LABELS.savedUserList.errorMessage}
      </div>
    );
  }

  if (!users?.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        {USERS_LABELS.savedUserList.emptyState}
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-4 p-4 bg-white border border-green-200 rounded-lg shadow-sm"
        >
          {user.avatar && (
            <img
              src={user.avatar}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-gray-800">
                {user.firstName} {user.lastName}
              </p>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                {USERS_LABELS.savedUserList.savedBadge}
              </span>
            </div>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
