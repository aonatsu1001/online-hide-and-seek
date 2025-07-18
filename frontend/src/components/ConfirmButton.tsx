import React from 'react';

// このコンポーネントが受け取るデータ（props）の型を定義
interface ConfirmButtonProps {
    // ボタンがクリックされたときに実行する関数
    onClick: () => void;
    // ボタンを無効化するかどうか（trueならクリックできない）
    disabled: boolean;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ onClick, disabled }) => {
  // ボタンのスタイルを定義
    const style: React.CSSProperties = {
        position: 'fixed',    // 画面に位置を固定する
        bottom: '30px',       // 画面の下から30pxの位置
        left: '50%',          // 画面の横方向中央
        transform: 'translateX(-50%)', // 中央から自身の幅の半分だけ左にずらし、真ん中に配置
        padding: '12px 24px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: disabled ? '#ccc' : '#007bff', // disabled状態なら灰色に
        border: 'none',
        borderRadius: '30px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // 少し影をつける
        cursor: disabled ? 'not-allowed' : 'pointer', // カーソルの形を変える
        transition: 'background-color 0.3s',
        zIndex: 1000,         // 他の要素より手前（上）に表示するための番号
    };

    return (
        <button style={style} onClick={onClick} disabled={disabled}>
        ここに隠す
        </button>
    );
};

export default ConfirmButton;