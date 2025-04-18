// TypeScript interface to access the toast registry globally
declare global {
  interface Window {
    tinoToasts: Record<string, {
      show: (duration?: number) => void;
      dismiss: () => void;
      update: (options: {
        text?: string;
        icon?: string;
        buttonText?: string;
        buttonAction?: () => void;
      }) => void;
    }>;
  }
}

// Helper function to show a toast
export function showToast(options: {
  text: string;
  icon?: string;
  buttonText?: string;
  buttonAction?: () => void;
  duration?: number;
}) {
  if (typeof window !== 'undefined' && window.tinoToasts) {
    const toastIds = Object.keys(window.tinoToasts);
    if (toastIds.length > 0) {
      const toastId = toastIds[0];
      const toast = window.tinoToasts[toastId];
      
      // Update toast properties
      toast.update({
        text: options.text,
        icon: options.icon,
        buttonText: options.buttonText,
        buttonAction: options.buttonAction
      });
      
      // Show the toast
      toast.show(options.duration);
      return true;
    }
  }
  return false;
}