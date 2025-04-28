'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import FutsalField from '@/components/FutsalField';
import { Crown } from 'lucide-react'; // 왕관 아이콘

export default function FutsalFormationPage() {
  const router = useRouter();
  const formationRef = useRef<HTMLDivElement>(null);
  const key = 'futsal';

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
    if (t1.length === 6 && t2.length === 6) {
      setPositions({
        team1: [
          { id: 1, name: `${t1[0]}(C)`, top: '30%', left: '40%' },
          { id: 2, name: t1[1], top: '60%', left: '40%' },
          { id: 3, name: t1[2], top: '45%', left: '31%' },
          { id: 4, name: t1[3], top: '60%', left: '25%' },
          { id: 5, name: t1[4], top: '30%', left: '25%' },
          { id: 6, name: t1[5], top: '45%', left: '13%' },
        ],
        team2: [
          { id: 1, name: `${t2[0]}(C)`, top: '30%', left: '55%' },
          { id: 2, name: t2[1], top: '60%', left: '55%' },
          { id: 3, name: t2[2], top: '45%', left: '64%' },
          { id: 4, name: t2[3], top: '60%', left: '70%' },
          { id: 5, name: t2[4], top: '30%', left: '70%' },
          { id: 6, name: t2[5], top: '45%', left: '81.5%' },
        ],
      });
    }
  }, []);

  const handleDragStart = (team: 'team1' | 'team2', id: number) => setDragged({ team, playerID: id });
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (team: 'team1' | 'team2', id: number) => {
    if (!dragged || dragged.team !== team) return alert('팀 변경 불가');
    const pos = { ...positions };
    const src = pos[team].find(p => p.id === dragged.playerID)!;
    const dst = pos[team].find(p => p.id === id)!;
    [src.top, dst.top] = [dst.top, src.top];
    [src.left, dst.left] = [dst.left, src.left];
    setPositions(pos);
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
        <FutsalField />
        
        {['team1', 'team2'].map((team) => (
          <React.Fragment key={team}>
            {positions[team as 'team1' | 'team2'].map((p) => {
              const isCaptain = p.name.includes('(C)');
              const isDragging = dragged?.team === team && dragged?.playerID === p.id;

              return (
                <div
                  key={p.id}
                  draggable
                  onDragStart={() => handleDragStart(team as any, p.id)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(team as any, p.id)}
                  className={`absolute w-[7%] h-[9%] rounded-full flex flex-col items-center justify-center font-bold text-xs shadow-lg transition-transform duration-300 ${
                    isDragging ? 'animate-bounce' : ''
                  }`}
                  style={{
                    top: p.top,
                    left: p.left,
                    background: team === 'team1'
                      ? 'radial-gradient(circle at top left, #3b82f6, #1e3a8a)'
                      : 'radial-gradient(circle at top right, #ec4899, #9d174d)',
                    color: '#fff',
                    border: '2px solid rgba(255,255,255,0.8)',
                  }}
                >
                  {isCaptain && <Crown size={14} className="mb-0.5" />}
                  {p.name.replace('(C)', '')}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <div className="flex gap-6 mt-8">
        {['이전', '홈', '저장'].map((label, i) => {
          const onClick = i === 0 ? () => router.push('/register/futsal/draft')
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