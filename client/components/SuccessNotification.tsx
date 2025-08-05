import { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";
import { Button } from "./ui/button";

interface SuccessNotificationProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

export function SuccessNotification({ 
  isVisible, 
  message, 
  onClose, 
  autoClose = true, 
  duration = 3000 
}: SuccessNotificationProps) {
  
  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5">
      <div className="bg-green-600 text-white rounded-lg p-4 shadow-xl flex items-center space-x-3 min-w-[300px]">
        <CheckCircle className="h-5 w-5 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-medium">Success</p>
          <p className="text-sm text-green-100">{message}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-6 w-6 p-0 text-white hover:bg-green-700"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
