import React, { useState, useEffect } from 'react'; // 【追加】useEffectをインポート
import { sendHidingSpotId } from '../services/socketService';
import ConfirmButton from '../components/ConfirmButton';
import Stage1 from '../components/stages/Stage1';
import myIcon from '../assets/icons/user_icon.png';

// 【追加】親(App.tsx)から受け取るPropsの型を定義
interface GamePageHideHidingProps {
    onTimeEnd: () => void;
}

// 【変更】コンポーネント名とPropsの受け取りを更新
const GamePageHideHidding: React.FC<GamePageHideHidingProps> = ({ onTimeEnd }) => {
    // --- 既存のState ---
    const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);

    // 【追加】残り時間を管理するためのState
    const [timeLeft, setTimeLeft] = useState(10); // 例として10秒に設定

  // --- 既存の関数 ---
    const confirmHidingSpot = () => {
        if (selectedSpotId) {
        sendHidingSpotId(selectedSpotId);
        // alertはゲームの流れを止めてしまうため、コンソールログなどに変更するのがおすすめです
        console.log(`ID: ${selectedSpotId} に隠れました！`);
        // ここでConfirmButtonを非表示にするなどのUI変更も考えられます
        }
    };

  // 【追加】タイマー処理 ---
    useEffect(() => {
    // 時間が0以下になったらタイマーを停止
        if (timeLeft <= 0) return;

        // 1秒ごとにtimeLeftを1ずつ減らすインターバルを設定
        const timerId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        // コンポーネントが使われなくなるときにタイマーをクリーンアップ
        return () => clearInterval(timerId);
    }, [timeLeft]); // timeLeftの値が変わるたびにこの処理が実行される

  // 【追加】時間切れの処理 ---
    useEffect(() => {
    // timeLeftがちょうど0になった瞬間に親コンポーネントの関数を呼び出す
        if (timeLeft === 0) {
            console.log("GamePageHideHiding: 時間切れです！onTimeEndを呼び出します。");
            onTimeEnd();
        }
    }, [timeLeft, onTimeEnd]); // timeLeftかonTimeEndが変わった時に実行

    return (
        <div>
        {/* 【追加】ヘッダー情報と残り時間を表示 */}
        <div className="game-header" style={{ textAlign: 'center', padding: '20px' }}>
            <h1>隠れる時間</h1>
            <h2>残り時間: {timeLeft}秒</h2>
            <p>鬼に見つからないように、隠れる場所を選んでください！</p>
        </div>

        {/* --- 既存のUI要素 --- */}
        <Stage1
            selectedSpotId={selectedSpotId}
            onSpotClick={setSelectedSpotId}
            userIcon={myIcon}
        />
        
        <ConfirmButton
            onClick={confirmHidingSpot}
            disabled={!selectedSpotId}
        />
        </div>
    );
};

// 【変更】エクスポートするコンポーネント名を更新
export default GamePageHideHidding;