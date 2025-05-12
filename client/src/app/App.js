
import React from 'react';
import { useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { useUsers } from './lib';
import { UserCard } from './ui';
import './index.css';

const App = () => {
  const parentRef = React.useRef();

  const { users, hasMoreUsers, incrementPage, isLoadingUsers } = useUsers();

  const rowVirtualizer = useVirtualizer({
    count: hasMoreUsers ? users.length + 1 : users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });

  useEffect(() => {
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

  return (
    <div
      ref={parentRef}
      className="h-screen overflow-auto p-4"
    >
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

export default App;
