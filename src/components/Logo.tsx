interface LogoProps {
  isCollapsed?: boolean;
}

export default function Logo({ isCollapsed = false }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-[#1C39BB] flex items-center justify-center">
        <span className="text-white font-semibold">FT</span>
      </div>
      {!isCollapsed && (
        <span className="text-xl font-bold text-[#1C39BB]">FinTrack</span>
      )}
    </div>
  );
} 