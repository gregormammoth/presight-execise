
import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { useOptions, useUsers } from './lib';
import { UserCard } from './ui';

const Users = () => {
  const parentRef = React.useRef();

  const [search, setSearch] = React.useState();
  const [hobby, setHobby] = React.useState();
  const [nationality, setNationality] = React.useState();

  const { hobbies, nationalities, isLoadingOptions } = useOptions();
  const { users, hasMoreUsers, incrementPage, resetPage, isLoadingUsers } = useUsers({ search, hobby, nationality });

  const rowVirtualizer = useVirtualizer({
    count: hasMoreUsers ? users.length + 1 : users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
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

  const onChangeSearch = (e) => {
    resetPage();
    setSearch(e.target.value);
  }

  const onChangeHobby = (e) => {
    resetPage();
    setHobby(e.target.value);
  };

  const onChangeNationality = (e) => {
    resetPage();
    setNationality(e.target.value);
  };

  return (
    <div
      ref={parentRef}
      className="h-screen overflow-auto p-4"
    >
      <form className='flex flex-col'>
        <label>
          Search&nbsp;
          <input onChange={onChangeSearch}/>
        </label>
        <label>
          Hobby&nbsp;
          <select onChange={onChangeHobby}>
            <option />
            {hobbies.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          Nationality
          <select onChange={onChangeNationality}>
            <option />
            {nationalities.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
        </label>
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
