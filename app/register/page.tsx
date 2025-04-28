'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const sportToOption: { [key: string]: number } = {
  rift: 5,
  futsal: 6,
  soccer: 11,
};

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sport = searchParams.get('sport');

  const [saveOption, setSaveOption] = useState<number | null>(null);
  const [players, setPlayers] = useState<string[]>([]);
  const [newPlayer, setNewPlayer] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined' && sport) {
      const stored = localStorage.getItem(sport);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPlayers(parsed.players || []);
        setSaveOption(parsed.option || sportToOption[sport]);
      } else {
        const newGameData = { option: sportToOption[sport], players: [] };
        localStorage.setItem(sport, JSON.stringify(newGameData));
        setPlayers([]);
        setSaveOption(sportToOption[sport]);
      }
    }
  }, [sport]);

  const addPlayer = () => {
    const trimmedPlayer = newPlayer.trim();

    if (trimmedPlayer === '') {
      alert('선수 이름을 입력하세요');
      return;
    }
    if (saveOption && players.length === 2 * saveOption) {
      alert('선수 정원을 초과했습니다');
      setNewPlayer('');
      return;
    }
    if (players.includes(trimmedPlayer)) {
      alert('이미 등록된 선수입니다');
      setNewPlayer('');
      return;
    }

    const updatedPlayers = [...players, trimmedPlayer];
    setPlayers(updatedPlayers);
    setNewPlayer('');

    if (sport) {
      const current = JSON.parse(localStorage.getItem(sport) || '{}');
      localStorage.setItem(
        sport,
        JSON.stringify({
          ...current,
          players: updatedPlayers,
        }),
      );
    }
  };

  const deletePlayer = (player: string) => {
    const updatedPlayers = players.filter((p) => p !== player);
    setPlayers(updatedPlayers);

    if (sport) {
      const current = JSON.parse(localStorage.getItem(sport) || '{}');
      localStorage.setItem(
        sport,
        JSON.stringify({
          ...current,
          players: updatedPlayers,
        }),
      );
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addPlayer();
  };

  const handleNext = () => {
    if (sport) {
      router.push(`/register/${sport}/draft`);
    }
  };

  const handlePrev = () => {
    router.push('/');
  };

  const handleReset = () => {
    setPlayers([]);
    if (sport) {
      const current = JSON.parse(localStorage.getItem(sport) || '{}');
      localStorage.setItem(
        sport,
        JSON.stringify({
          ...current,
          players: [],
          remainPlayers: [],
          team1: [],
          team2: [],
        }),
      );
    }
  };

  const halfIndex = Math.ceil(players.length / 2);
  const leftPlayers = players.slice(0, halfIndex);
  const rightPlayers = players.slice(halfIndex);

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center" style={{ background: 'linear-gradient(180deg, #111 0%, #000 100%)' }}>
      <div className="max-w-4xl mx-auto p-8 bg-black/30 rounded-2xl shadow-2xl">
        {/* 상단 제목 */}
        <h1 className="text-4xl font-bold mb-6 border-b-2 border-blue-400 pb-2 text-center bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          선 수 등 록
        </h1>

        {/* 선택한 옵션 표시 */}
        <p className="text-center text-lg mb-8 text-blue-300 font-semibold">
          {saveOption ? `${saveOption} vs ${saveOption}` : '로딩 중...'}
        </p>

        {/* 선수 입력 폼 */}
        <form onSubmit={handleSubmit} className="flex justify-center items-center gap-4 mb-8">
          <input
            type="text"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            placeholder="선수 입력"
            className="border-2 border-blue-400 rounded-full px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow bg-white text-black"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-6 py-2 rounded-full hover:scale-105 transition shadow-lg"
          >
            추가
          </button>
        </form>

        {/* 선수 목록 */}
        <div className="flex flex-col items-center justify-center mb-12">
          <h2 className="text-xl font-bold mb-4 text-center text-indigo-300">선수 목록 {players.length}명</h2>

          <div className="flex justify-center gap-8">
            {/* 왼쪽 목록 */}
            <ul className="flex flex-col gap-3">
              {leftPlayers.map((player, index) => (
                <li
                  key={index}
                  className="w-32 h-12 flex items-center justify-between bg-white px-4 rounded-full shadow-md border-2 border-blue-100 hover:scale-105 transition text-black overflow-hidden whitespace-nowrap text-ellipsis"
                >
                  <span className="overflow-hidden whitespace-nowrap text-ellipsis">{player}</span>
                  <button
                    type="button"
                    onClick={() => deletePlayer(player)}
                    className="text-red-400 hover:text-red-600 ml-2"
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>

            {/* 오른쪽 목록 */}
            <ul className="flex flex-col gap-3">
              {rightPlayers.map((player, index) => (
                <li
                  key={index}
                  className="w-32 h-12 flex items-center justify-between bg-white px-4 rounded-full shadow-md border-2 border-blue-100 hover:scale-105 transition text-black overflow-hidden whitespace-nowrap text-ellipsis"
                >
                  <span className="overflow-hidden whitespace-nowrap text-ellipsis">{player}</span>
                  <button
                    type="button"
                    onClick={() => deletePlayer(player)}
                    className="text-red-400 hover:text-red-600 ml-2"
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-center space-x-6">
          <button
            type="button"
            onClick={handlePrev}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:scale-105 transition shadow-lg"
          >
            이전
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-700 text-white hover:scale-105 transition shadow-lg"
          >
            초기화
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={saveOption ? players.length !== 2 * saveOption : true}
            className={`px-6 py-2 rounded-full shadow-lg transition ${
              saveOption && players.length === 2 * saveOption
                ? 'bg-gradient-to-r from-green-400 to-green-600 hover:scale-105 text-white'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}