import { useRef } from "react";
import { CloudUpload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageSelectorProps {
  onFilesSelected: (files: FileList) => void;
}

export function ImageSelector({ onFilesSelected }: ImageSelectorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="mb-8">
      <div
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer bg-white dark:bg-gray-800"
        onClick={handleFileSelect}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        data-testid="dropzone-images"
      >
        <div className="mx-auto w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
          <CloudUpload className="text-blue-500" size={24} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Drop your images here
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          or click to browse your files
        </p>
        <Button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          data-testid="button-select-images"
        >
          <Plus size={16} className="mr-2" />
          Select Images
        </Button>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
          Supports JPG, PNG, GIF, WebP up to 10MB each
        </p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        data-testid="input-file-images"
      />
    </div>
  );
}
