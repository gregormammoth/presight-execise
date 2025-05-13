import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="border p-4 rounded shadow">
      <div className="flex">
        <img src={user.avatar} alt="avatar" className="w-12 h-12 rounded-full" />
        <div className="ml-4">
          <div>{user.first_name} {user.last_name}</div>
          <div>{user.nationality} {user.age}</div>
          <div>
            {user.hobbies.slice(0, 2).join(', ')}
            {user.hobbies.length > 2 && ` +${user.hobbies.length - 2}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
