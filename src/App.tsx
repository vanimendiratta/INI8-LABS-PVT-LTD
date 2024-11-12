import React from 'react';
import { PlusCircle, Users } from 'lucide-react';
import { User, UserFormData } from './types/user';
import { UserList } from './components/UserList';
import { UserForm } from './components/UserForm';

function App() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [showForm, setShowForm] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<User | undefined>();

  const handleAddUser = (data: UserFormData) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    setUsers([newUser, ...users]);
    setShowForm(false);
  };

  const handleUpdateUser = (data: UserFormData) => {
    if (!editingUser) return;
    
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id
        ? { ...user, ...data }
        : user
    );
    setUsers(updatedUsers);
    setEditingUser(undefined);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          </div>
          <button
            onClick={() => {
              setEditingUser(undefined);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            Add User
          </button>
        </div>

        {users.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No users yet</h3>
            <p className="text-gray-500">Get started by adding a new user</p>
          </div>
        ) : (
          <UserList
            users={users}
            onEdit={handleEdit}
            onDelete={handleDeleteUser}
          />
        )}

        {showForm && (
          <UserForm
            onSubmit={editingUser ? handleUpdateUser : handleAddUser}
            onClose={() => {
              setShowForm(false);
              setEditingUser(undefined);
            }}
            initialData={editingUser}
          />
        )}
      </div>
    </div>
  );
}

export default App;