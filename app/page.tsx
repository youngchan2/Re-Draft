'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FutsalField from '@/components/futsalfield'; 
import Rift from '@/components/Rift';

export default function HomePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (sport: string) => {
    setSelected(sport);
    router.push(`/register?sport=${sport}`);
  };

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen p-5 box-border overflow-y-auto"
      style={{ background: 'linear-gradient(180deg, #111 0%, #000 100%)' }}
    >
      <div className="flex flex-wrap justify-center gap-5 w-full max-w-[1200px]">

        {/* 박스 하나의 패턴 */}
        {['rift', 'futsal', 'soccer'].map((sport) => (
          <div
            key={sport}
            className={`group relative flex flex-col items-center justify-center rounded-lg shadow-md cursor-pointer transition-transform transform hover:-translate-y-1 hover:shadow-lg
              w-[calc(33.33%-20px)] max-w-[300px] aspect-square overflow-hidden
              ${selected === sport ? 'scale-105' : ''}
            `}
            onClick={() => handleSelect(sport)}
          >
            {/* 기본 밝은 배경 */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-300 to-sky-500 transition-opacity duration-300" />

            {/* hover 시 덮는 진한 배경 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* 선택된 경우 진한 배경 위에 추가 레이어 */}
            {selected === sport && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-700 opacity-100" />
            )}

            <div className="relative z-10 w-4/5 max-h-[200px] flex items-center justify-center">
              {sport === 'futsal' ? (
                <FutsalField bg="#0" className="group-hover:stroke-cyan-400" />
              ) : (
                <div className="text-center text-white">
                  {sport === 'rift' ? (
                    <Rift className="group-hover:stroke-cyan-400" />
                  ) : '11vs11 축구 (임시)'}
                </div>
              )}
            </div>
            <span className="relative z-10 mt-2 text-base font-bold text-center text-white">
              {sport === 'rift' ? '5vs5 협곡' : sport === 'futsal' ? '6vs6 풋살' : '11vs11 축구'}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}