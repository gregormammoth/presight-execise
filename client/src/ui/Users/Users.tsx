import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { useOptions, useUsers } from './lib';
import { UserCard } from './ui';

const Users: React.FC = () => {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const [search, setSearch] = React.useState<string>('');
  const [hobby, setHobby] = React.useState<string>('');
  const [nationality, setNationality] = React.useState<string>('');

  const { hobbies, nationalities, isLoadingOptions } = useOptions();
  const { users, hasMoreUsers, incrementPage, resetPage, isLoadingUsers } = useUsers({ search, hobby, nationality });

  const rowVirtualizer = useVirtualizer({
    count: hasMoreUsers ? users.length + 1 : users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 148,
    overscan: 5,
  });

  React.useEffect(() => {
    const lastItem = rowVirtualizer.getVirtualItems().at(-1);
    if (!lastItem) return;

    if (
      lastItem.index >= users.length - 1 &&
      !isLoadingUsers &&
      hasMoreUsers
    ) {
      incrementPage();
    }
  }, [rowVirtualizer.getVirtualItems(), isLoadingUsers]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetPage();
    setSearch(e.target.value);
  }

  const onChangeHobby = (e: React.ChangeEvent<HTMLSelectElement>) => {
    resetPage();
    setHobby(e.target.value);
  };

  const onChangeNationality = (e: React.ChangeEvent<HTMLSelectElement>) => {
    resetPage();
    setNationality(e.target.value);
  };

  return (
    <div
      ref={parentRef}
      className="h-screen overflow-auto p-4"
    >
      <form className="flex flex-col gap-4 mb-6 p-4 bg-white rounded-lg shadow">
        <div className="flex flex-col">
          <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="search">
            Search
          </label>
          <input
            id="search"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={onChangeSearch}
            placeholder="Search users..."
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="hobby">
            Hobby
          </label>
          <select
            id="hobby"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={onChangeHobby}
          >
            <option value="">Any</option>
            {hobbies.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="nationality">
            Nationality
          </label>
          <select
            id="nationality"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={onChangeNationality}
          >
            <option value="">Any</option>
            {nationalities.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </form>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const user = users[virtualRow.index];
          return (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {user && <UserCard user={user} />}
            </div>
          );
        })}
      </div>
      {isLoadingUsers && <div>Loading...</div>}
    </div>
  );
};

export default Users;
