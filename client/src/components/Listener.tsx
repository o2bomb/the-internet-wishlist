import React from 'react'

interface ListenerProps {
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

export const Listener: React.FC<ListenerProps> = ({ children, onKeyDown }) => {
  return (
    <div onKeyDown={onKeyDown} tabIndex={-1} >
      {children}
    </div>
  );
}