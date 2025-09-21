import { Loader2 } from "lucide-react";

interface LoadingModalProps {
  message: string;
}

export function LoadingModal({ message }: LoadingModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-testid="loading-modal">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4 text-center">
        <div className="flex items-center justify-center mb-4">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
        <p className="text-gray-900 dark:text-white font-medium" data-testid="text-loading-message">
          {message}
        </p>
      </div>
    </div>
  );
}
