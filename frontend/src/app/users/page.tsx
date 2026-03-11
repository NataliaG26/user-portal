import UserList from '@/features/users/presentation/components/UserList';
import SavedUserList from '@/features/users/presentation/components/SavedUserList';

export default function UsersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Users</h1>
        <p className="text-gray-500">Browse and import users from ReqRes.</p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">All Users</h2>
        <UserList />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Saved Locally</h2>
        <SavedUserList />
      </section>
    </div>
  );
}