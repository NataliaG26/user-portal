"use client";

import { useReqResUsers } from "../hooks/useReqResUsers";
import { useImportUser } from "../hooks/useUsers";
import { USERS_LABELS } from "../labels";

/**
 * Component for displaying a paginated list of users from ReqRes.
 * Supports client-side search/filter and local import.
 */
export default function UserList() {
  const {
    filteredUsers,
    isLoading,
    isError,
    page,
    setPage,
    search,
    setSearch,
    totalPages,
  } = useReqResUsers();

  const { mutate: importUser, isPending: isImporting } = useImportUser();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
        {USERS_LABELS.userList.errorMessage}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={USERS_LABELS.userList.searchPlaceholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Empty state */}
      {filteredUsers?.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {USERS_LABELS.userList.emptyState}
        </div>
      )}

      {/* Users list */}
      <div className="grid gap-4">
        {filteredUsers?.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-800">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => importUser(user.id)}
              disabled={isImporting}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-medium rounded-md transition-colors"
            >
              {isImporting
                ? USERS_LABELS.userList.savingButton
                : USERS_LABELS.userList.saveButton}
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 pt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
        >
          {USERS_LABELS.userList.previousButton}
        </button>
        <span className="text-sm text-gray-600">
          {USERS_LABELS.userList.pageInfo
            .replace("{page}", String(page))
            .replace("{totalPages}", String(totalPages))}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
        >
          {USERS_LABELS.userList.nextButton}
        </button>
      </div>
    </div>
  );
}
