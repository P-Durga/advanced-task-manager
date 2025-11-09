import { X } from 'lucide-react';

export const ModalHeader = ({ children, onClose }) => (
  <div className="flex items-center justify-between p-4 border-b">
    <h2 className="text-xl font-bold">{children}</h2>
    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
      <X className="w-6 h-6" />
    </button>
  </div>
);