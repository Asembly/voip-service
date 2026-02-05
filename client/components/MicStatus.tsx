interface MicStatusProps {
  isRecording: boolean;
}

export function MicStatus({ isRecording }: MicStatusProps) {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-700 mb-4">
        <div
          className={`w-12 h-12 rounded-full transition-all duration-300 ${
            isRecording ? "bg-red-500 animate-pulse" : "bg-green-500"
          }`}
        />
      </div>
      <h2 className="text-white text-xl font-semibold mb-2">
        {isRecording ? "Микрофон включен" : "Микрофон выключен"}
      </h2>
      <p className="text-gray-400 text-sm">
        {isRecording
          ? "Нажми чтобы выключить голосовой чат"
          : "Нажми чтобы включить голосовой чат"}
      </p>
    </div>
  );
}
