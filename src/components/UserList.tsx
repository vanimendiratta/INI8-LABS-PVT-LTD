import React from 'react';
import { Pencil, Trash2, User as UserIcon } from 'lucide-react';
import { User } from '../types/user';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export function UserList({ users, onEdit, onDelete }: UserListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02]"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <UserIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Date of Birth:</span>{' '}
              {new Date(user.dateOfBirth).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Joined:</span>{' '}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => onEdit(user)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(user.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}