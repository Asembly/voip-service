interface HeaderProps {
  title?: string;
}

export function Header({ title = "Голосовой чат" }: HeaderProps) {
  return (
    <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="w-2 h-8 bg-indigo-500 rounded-full"></div>
        <h1 className="text-white text-xl font-bold">{title}</h1>
      </div>
    </div>
  );
}
