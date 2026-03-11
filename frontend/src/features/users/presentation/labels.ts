export const USERS_LABELS = {
  userList: {
    searchPlaceholder: "Search by name or email...",
    emptyState: "No users found matching your search.",
    errorMessage: "Failed to load users. Please try again.",
    saveButton: "Save locally",
    savingButton: "Saving...",
    previousButton: "Previous",
    nextButton: "Next",
    pageInfo: "Page {page} of {totalPages}",
  },
  savedUserList: {
    emptyState: "No users saved locally yet. Import some from the list above.",
    errorMessage: "Failed to load saved users.",
    savedBadge: "Saved locally",
  },
} as const;
