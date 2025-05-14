import React from 'react';
import { User } from '../../../model';

type UserCardProps = {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center">
        <img 
          src={user.avatar} 
          alt="avatar" 
          className="w-16 h-16 rounded-full border-2 border-blue-200 shadow-sm" 
        />
        <div className="ml-6">
          <div className="text-xl font-semibold text-gray-800">
            {user.first_name} {user.last_name}
          </div>
          <div className="text-gray-600 mt-1">
            <span className="font-medium">{user.nationality}</span>
            <span className="mx-2">•</span>
            <span>{user.age} years old</span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            <span className="font-medium">Hobbies: </span>
            {user.hobbies.slice(0, 2).join(', ')}
            {user.hobbies.length > 2 && (
              <span className="text-blue-500 font-medium"> +{user.hobbies.length - 2} more</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
