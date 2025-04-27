import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';

interface ImportExportModalProps {
  onClose: () => void;
}

const ImportExportModal: React.FC<ImportExportModalProps> = ({ onClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const blob = new Blob([JSON.stringify(events, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calendar-events.json';
    link.click();
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (Array.isArray(data)) {
          localStorage.setItem('events', JSON.stringify(data));
          window.location.reload(); // Refresh calendar
        }
      } catch (err) {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImport(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImport(file);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-background p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-xl font-semibold">Import / Export Events</h2>
        
        <div
          className="border-2 border-dashed p-6 rounded-md text-center cursor-pointer"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <p>Drag and drop your .json file here to import</p>
        </div>

        <Button onClick={() => fileInputRef.current?.click()}>Select File to Import</Button>
        <input
          type="file"
          accept="application/json"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <Button onClick={handleExport}>Export Events as JSON</Button>

        <Button variant="destructive" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default ImportExportModal;
