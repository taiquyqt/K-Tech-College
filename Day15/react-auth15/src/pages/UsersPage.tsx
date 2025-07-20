// pages/Users.tsx
import { useState, useEffect } from 'react';
import { apiClient } from '../libs/api-client';

interface User {
  id: number;
  fullName: string;
  username: string;
  status: 'active' | 'inactive' | string;
}

interface UserForm {
  fullName: string;
  username: string;
  password: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  const [userForm, setUserForm] = useState<UserForm>({
    fullName: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/security/users');
      setUsers(response.data || response);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrEditUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditing && editingUserId !== null) {
        // PATCH
        await apiClient.patch(`/security/users/${editingUserId}`, {
          fullName: userForm.fullName,
          username: userForm.username,
          password: userForm.password,
        });
      } else {
        // POST
        await apiClient.post('/security/users', userForm);
      }

      fetchUsers();
      setShowAddModal(false);
      setUserForm({ fullName: '', username: '', password: '' });
      setIsEditing(false);
      setEditingUserId(null);
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  const handleEditUser = (user: User) => {
    setUserForm({
      fullName: user.fullName,
      username: user.username,
      password: '', // Không show password cũ
    });
    setIsEditing(true);
    setEditingUserId(user.id);
    setShowAddModal(true);
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await apiClient.delete(`/security/users/${userId}`);
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <button
          onClick={() => {
            setShowAddModal(true);
            setUserForm({ fullName: '', username: '', password: '' });
            setIsEditing(false);
            setEditingUserId(null);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New User
        </button>
      </div>

      {loading ? (
        <div className="text-center">Loading users...</div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-500">No users found</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Full Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{user.id}</td>
                  <td className="px-6 py-4 text-sm">{user.fullName}</td>
                  <td className="px-6 py-4 text-sm">{user.username}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-semibold ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="bg-blue-500 p-1 mr-1 rounded-md hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 p-1 rounded-md hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? 'Edit User' : 'Add New User'}
            </h2>
            <form onSubmit={handleAddOrEditUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  value={userForm.fullName}
                  onChange={(e) => setUserForm({ ...userForm, fullName: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Username (Email)</label>
                <input
                  type="email"
                  value={userForm.username}
                  onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  value={userForm.password}
                  onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                  required={!isEditing}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setUserForm({ fullName: '', username: '', password: '' });
                    setIsEditing(false);
                    setEditingUserId(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {isEditing ? 'Update User' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
