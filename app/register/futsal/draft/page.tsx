'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Crown } from 'lucide-react'; // 왕관 추가

export default function FutsalDraft() {
  const router = useRouter();
  const sport = 'futsal';
  const option = 6;
  const key = sport;

  const [players, setPlayers] = useState<string[]>([]);
  const [remainPlayers, setRemainPlayers] = useState<string[]>([]);
  const [team1, setTeam1] = useState<string[]>([]);
  const [team2, setTeam2] = useState<string[]>([]);
  const [select, setSelect] = useState<string>('');
  const [cntTurn, setCntTurn] = useState<number>(1);
  const [ready, setReady] = useState(false);

  const saveToLocalStorage = useCallback(() => {
    if (typeof window !== 'undefined') {
      const data = { option, players, remainPlayers, team1, team2 };
      localStorage.setItem(key, JSON.stringify(data));
    }
  }, [players, remainPlayers, team1, team2, key, option]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      const initPlayers = parsed.players || [];
      const initRemain = parsed.remainPlayers ?? [...initPlayers];
      const initTeam1 = parsed.team1 ?? [];
      const initTeam2 = parsed.team2 ?? [];

      setPlayers(initPlayers);
      setRemainPlayers(initRemain);
      setTeam1(initTeam1);
      setTeam2(initTeam2);

      if (parsed.remainPlayers == null || parsed.team1 == null || parsed.team2 == null) {
        const updatedData = { option, players: initPlayers, remainPlayers: initRemain, team1: initTeam1, team2: initTeam2 };
        localStorage.setItem(key, JSON.stringify(updatedData));
      }
    }
    setReady(true);
  }, [key, option]);

  useEffect(() => {
    if (ready) {
      saveToLocalStorage();
    }
  }, [players, remainPlayers, team1, team2, ready, saveToLocalStorage]);

  const getCurrentTeam = (cnt: number) => (cnt % 4 === 0 || cnt % 4 === 1 ? 1 : 2);
  const getNextTurn = (cnt: number, select: string, t1: number, t2: number) => {
    const isLeaderPhase = t1 < 1 || t2 < 1;
    return select === 'opt1' ? cnt + 2 : (isLeaderPhase ? cnt + 2 : cnt + 1);
  };

  const handleDraft = (opt: string, player: string) => {
    if (select === '') return alert('뽑기 방식을 선택하세요!');
    const currentTeam = getCurrentTeam(cntTurn);
    if (currentTeam === 1) setTeam1((prev) => [...prev, player]);
    else setTeam2((prev) => [...prev, player]);
    setRemainPlayers((prev) => prev.filter((p) => p !== player));
    setCntTurn((prev) => getNextTurn(prev, opt, team1.length, team2.length));
  };

  const handleUndo = (opt: string, team: number, player: string) => {
    if (select === '') return;

    let undoAllowed = true;
    if (opt === 'opt1' || team1.length === 1 || team2.length === 1) {
      undoAllowed = (team === 1 && (cntTurn % 4 === 2 || cntTurn % 4 === 3)) || (team === 2 && (cntTurn % 4 === 0 || cntTurn % 4 === 1));
    } else {
      undoAllowed = (team === 1 && (cntTurn % 4 === 1 || cntTurn % 4 === 2)) || (team === 2 && (cntTurn % 4 === 0 || cntTurn % 4 === 3));
    }

    if (!undoAllowed) return alert('다른 팀의 차례입니다.');

    if (team === 1) setTeam1((prev) => prev.filter((p) => p !== player));
    else setTeam2((prev) => prev.filter((p) => p !== player));

    setRemainPlayers((prev) => [...prev, player]);
    setCntTurn((prev) => {
      const isLeaderPhase = team1.length === 1 || team2.length === 1;
      return opt === 'opt1' ? prev - 2 : (isLeaderPhase ? prev - 2 : prev - 1);
    });
  };

  const handleNext = () => router.push(`/register/${sport}/draft/formation`);
  const handlePrev = () => router.push(`/register?sport=${sport}`);
  const handleHome = () => router.push('/');
  const handleReset = () => {
    setTeam1([]);
    setTeam2([]);
    setRemainPlayers(players);
    setCntTurn(1);
    setSelect('');
  };

  const halfIndex = Math.ceil(remainPlayers.length / 2);
  const leftRemain = remainPlayers.slice(0, halfIndex);
  const rightRemain = remainPlayers.slice(halfIndex);

  if (!ready || players.length === 0) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center" style={{ background: 'linear-gradient(180deg, #111 0%, #000 100%)' }}>
      <div className="flex w-full max-w-7xl p-8 gap-8">
        {/* Team 1 */}
        <div className="flex-1 border-2 border-blue-400 rounded-2xl bg-black/30 p-6 shadow-2xl min-h-[600px]">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">Team 1</h2>
          <ul className="space-y-3">
            {team1.map((player, idx) => (
              <li
                key={idx}
                onClick={() => handleUndo(select, 1, player)}
                className={`cursor-pointer px-4 py-3 min-w-[150px] min-h-[48px] rounded-full shadow hover:scale-105 transition text-white flex items-center justify-center
                    ${idx === 0 
                      ? 'bg-gradient-to-br from-sky-300 to-indigo-400' 
                      : 'bg-gradient-to-br from-blue-400 to-blue-900'}`}
              >
                {player} {idx === 0 && <Crown size={16} className="ml-1 text-white animate-bounce" />}
              </li>
            ))}
          </ul>
        </div>

        {/* Center */}
        <div className="w-[400px] flex flex-col items-center bg-gray-100/10 border-2 border-purple-500 p-8 rounded-2xl shadow-2xl min-h-[600px]">
          <h2 className="text-3xl font-bold text-purple-400 mb-6">Pick!</h2>

          {/* 상태 메시지 */}
          {select === '' && <h3 className="text-lg text-white mb-4">뽑기 방식을 선택하세요</h3>}
          {(team1.length === 0 || team2.length === 0) && select !== '' && <h3 className="text-lg text-white mb-4">팀장을 뽑으세요</h3>}
          {(team1.length !== 0 && team2.length !== 0 && remainPlayers.length !== 0) && select !== '' && <h3 className="text-lg text-white mb-4">팀원을 뽑으세요</h3>}
          {remainPlayers.length === 0 && <h3 className="text-lg text-green-400 mb-4">다음을 누르세요</h3>}

          {/* 선택 버튼 */}
          <div className="flex space-x-4 mb-6">
            {['opt1', 'opt2'].map(opt => (
              <button
                key={opt}
                onClick={() => setSelect(opt)}
                disabled={select !== '' && select !== opt}
                className={`px-6 py-2 rounded-full font-semibold shadow-lg cursor-pointer transition ${
                  select === opt
                    ? 'bg-purple-500 text-white'
                    : 'bg-white text-black border-2 border-purple-500'
                }`}
              >
                {opt === 'opt1' ? '한명씩' : '두명씩'}
              </button>
            ))}
          </div>

          {/* 순서 표시 */}
          <h3 className={`font-bold mb-8 text-xl ${cntTurn % 4 === 0 || cntTurn % 4 === 1 ? 'text-blue-400' : 'text-red-400'}`}>
            순서: Team {cntTurn % 4 === 0 || cntTurn % 4 === 1 ? 1 : 2}
          </h3>

          {/* 남은 선수 */}
          <div className="flex w-full justify-around mb-8">
            <ul className="space-y-3">
              {leftRemain.map((player, idx) => (
                <li
                  key={idx}
                  onClick={() => handleDraft(select, player)}
                  className="cursor-pointer bg-white text-black px-4 py-3 min-w-[150px] min-h-[48px] rounded-full shadow hover:scale-105 transition flex items-center justify-center"
                >
                  {player}
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {rightRemain.map((player, idx) => (
                <li
                  key={idx}
                  onClick={() => handleDraft(select, player)}
                  className="cursor-pointer bg-white text-black px-4 py-3 min-w-[150px] min-h-[48px] rounded-full shadow hover:scale-105 transition flex items-center justify-center"
                >
                  {player}
                </li>
              ))}
            </ul>
          </div>

          {/* 하단 버튼 */}
          <div className="flex gap-4">
            <button onClick={handlePrev} className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg cursor-pointer hover:scale-105 transition">이전</button>
            <button onClick={handleHome} className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg cursor-pointer hover:scale-105 transition">홈</button>
            <button onClick={handleReset} className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg cursor-pointer hover:scale-105 transition">초기화</button>
            <button
              onClick={handleNext}
              disabled={remainPlayers.length !== 0}
              className={`px-5 py-2 rounded-full shadow-lg ${
                remainPlayers.length === 0
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gray-500 text-white cursor-not-allowed'
              } transition`}
            >
              다음
            </button>
          </div>
        </div>

        {/* Team 2 */}
        <div className="flex-1 border-2 border-red-400 rounded-2xl bg-black/30 p-6 shadow-2xl min-h-[600px]">
          <h2 className="text-2xl font-bold text-center mb-6 text-red-400">Team 2</h2>
          <ul className="space-y-3">
            {team2.map((player, idx) => (
              <li
                key={idx}
                onClick={() => handleUndo(select, 2, player)}
                className={`cursor-pointer px-4 py-3 min-w-[150px] min-h-[48px] rounded-full shadow hover:scale-105 transition text-white flex items-center justify-center
                    ${idx === 0 
                      ? 'bg-gradient-to-bl from-pink-300 to-rose-400' 
                      : 'bg-gradient-to-bl from-red-400 to-red-900'}`}
              >
                {player} {idx === 0 && <Crown size={16} className="ml-1 text-white animate-bounce" />}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}