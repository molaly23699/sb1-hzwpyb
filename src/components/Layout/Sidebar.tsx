import React from 'react';
import { Users, Home } from 'lucide-react';
import type { Member } from '../../types/types';

interface SidebarProps {
  members: Member[];
  onSelectMember: (memberId: string) => void;
  onHome: () => void;
  selectedMemberId: string | null;
}

export default function Sidebar({ members, onSelectMember, onHome, selectedMemberId }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-900 h-screen fixed right-0 p-4 overflow-y-auto">
      <button 
        onClick={onHome}
        className="w-full mb-6 bg-indigo-600 text-white p-3 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
      >
        <Home className="h-5 w-5" />
        <span>الرئيسية</span>
      </button>

      <div className="mb-4 flex items-center gap-2 text-gray-400">
        <Users className="h-5 w-5" />
        <h2 className="font-semibold">الأعضاء</h2>
      </div>

      <div className="space-y-1">
        {members.map((member) => (
          <button
            key={member.id}
            onClick={() => onSelectMember(member.id)}
            className={`w-full text-right p-2 rounded-lg transition-colors ${
              selectedMemberId === member.id
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            {member.name}
          </button>
        ))}
      </div>
    </div>
  );
}