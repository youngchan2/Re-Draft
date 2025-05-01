'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import Image from 'next/image';

const POSITION = ['top', 'jug', 'mid', 'adc', 'sup'];

export default function FutsalFormationPage() {
  const router = useRouter();
  const formationRef = useRef<HTMLDivElement>(null);
  const key = 'rift';

  const [positions, setPositions] = useState({
    team1: [] as { id: number; name: string; top: string; left: string }[],
    team2: [] as { id: number; name: string; top: string; left: string }[],
  });
  const [dragged, setDragged] = useState<{ team: 'team1' | 'team2'; playerID: number } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = JSON.parse(localStorage.getItem(key) || '{}');
    const t1: string[] = stored.team1 || [];
    const t2: string[] = stored.team2 || [];
    if (t1.length === 5 && t2.length === 5) {
      setPositions({
        team1: [
          { id: 1, name: t1[0], top: "20%", left: "25%" },
          { id: 2, name: t1[1], top: "35%", left: "30%" },
          { id: 3, name: t1[2], top: "45%", left: "40%" },
          { id: 4, name: t1[3], top: "80%", left: "70%" },
          { id: 5, name: t1[4], top: "80%", left: "60%" },
      ],
      team2: [
          { id: 1, name: t2[0], top: "10%", left: "30%" },
          { id: 2, name: t2[1], top: "20%", left: "45%" },
          { id: 3, name: t2[2], top: "30%", left: "55%" },
          { id: 4, name: t2[3], top: "55%", left: "80%" },
          { id: 5, name: t2[4], top: "45%", left: "80%" },
      ],
      });
    }
  }, []);

  const handleDragStart = (team: 'team1' | 'team2', id: number) => setDragged({ team, playerID: id });
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (team: 'team1' | 'team2', id: number) => {
    if (!dragged || dragged.team !== team) {
      alert('팀 변경 불가');
      return;
    }

    setPositions(prev => {
      // 1) 대상 팀 배열 복제
      const newTeam = prev[team].map(p => ({ ...p }));
      // 2) src/dst 인덱스 찾기
      const srcIdx = newTeam.findIndex(p => p.id === dragged.playerID);
      const dstIdx = newTeam.findIndex(p => p.id === id);
      // 3) 이름만 교체
      const tmp = newTeam[srcIdx].name;
      newTeam[srcIdx].name = newTeam[dstIdx].name;
      newTeam[dstIdx].name = tmp;
      // 4) 상태 저장
      const updated = { ...prev, [team]: newTeam };
      // 5) localStorage 갱신 (id 순서대로 names만 저장)
      const namesToStore = newTeam
        .sort((a, b) => a.id - b.id)
        .map(p => p.name);
      const storeObj = JSON.parse(localStorage.getItem(key) || '{}');
      storeObj[team] = namesToStore;
      localStorage.setItem(key, JSON.stringify(storeObj));

      return updated;
    });

    setDragged(null);
  };

  const handleSave = async () => {
    if (!formationRef.current) return;
    const canvas = await html2canvas(formationRef.current, {
      backgroundColor: null,
      useCORS: true,
      foreignObjectRendering: false,
    });
    canvas.toBlob(b => b && saveAs(b, 'formation.png'));
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #111 0%, #000 100%)' }}
    >
      <div
        ref={formationRef}
        className="relative w-full max-w-5xl aspect-[4/3] rounded-2xl shadow-2xl overflow-hidden"
        style={{ border: '4px solid #8b5cf6', backgroundColor: '#000000' }}
      >
        <img
          src="/rift.jpg"
          alt="Rift Field"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        
        {(['team1', 'team2'] as const).map((team) => (
          <React.Fragment key={team}>
            {positions[team].map((p) => {
              // const isDragging = dragged?.team === team && dragged?.playerID === p.id;
              const position = POSITION[p.id -1];
              return (
                <div
                  key={p.id}
                  draggable
                  onDragStart={() => handleDragStart(team, p.id)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(team, p.id)}
                  className={`absolute w-[7%] h-[9%] rounded-full flex flex-col items-center justify-center font-bold text-xs shadow-lg transition-transform duration-300`}
                  style={{
                    top: p.top,
                    left: p.left,
                    zIndex: 10,
                    // background: team === 'team1'
                    //   ? 'radial-gradient(circle at top left, #3b82f6, #1e3a8a)'
                    //   : 'radial-gradient(circle at top right, #ec4899, #9d174d)',
                    color: '#fff',
                    // border: '2px solid rgba(255,255,255,0.8)',
                  }}
                >
                  {/* <span>{p.name}</span> */}
                  <div className="flex flex-col items-center">
                    <img src={`/${position}_${team}.svg`} alt={position} className="w-4 h-4 mb-1" />
                    <span className="text-[10px]">{p.name}</span>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <div className="flex gap-6 mt-8">
        {['이전', '홈', '저장'].map((label, i) => {
          const onClick = i === 0 ? () => router.push('/register/rift/draft')
                        : i === 1 ? () => router.push('/')
                        : handleSave;
          return (
            <button
              key={label}
              onClick={onClick}
              className="px-6 py-3 rounded-full font-semibold shadow-xl text-white transition transform hover:scale-105"
              style={{
                background: 'linear-gradient(90deg, #a855f7, #6366f1)',
                boxShadow: '0 4px 14px rgba(168,85,247,0.6)',
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}