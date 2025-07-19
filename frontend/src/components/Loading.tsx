import React from 'react';

const Loading: React.FC = () => {
  const style: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#555',
  };

  return (
    <div style={style}>
      <p>ロード中...</p>
    </div>
  );
};

export default Loading;
