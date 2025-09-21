import { useState } from "react";
import { X, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ImageFile } from "@/types";

interface ImageListProps {
  images: ImageFile[];
  onReorder: (sourceIndex: number, destinationIndex: number) => void;
  onRemove: (id: string) => void;
}

export function ImageList({ images, onReorder, onRemove }: ImageListProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    event.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      onReorder(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Selected Images ({images.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm cursor-move ${
              draggedIndex === index ? 'opacity-50' : ''
            }`}
            data-testid={`image-item-${index}`}
          >
            <img
              src={image.previewUrl}
              alt={image.file.name}
              className="w-full h-48 object-cover"
              data-testid={`image-preview-${index}`}
            />
            <div className="p-3">
              <p
                className="text-sm font-medium text-gray-900 dark:text-white truncate"
                title={image.file.name}
                data-testid={`text-filename-${index}`}
              >
                {image.file.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400" data-testid={`text-filesize-${index}`}>
                {(image.file.size / (1024 * 1024)).toFixed(1)} MB
              </p>
            </div>
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 w-6 h-6 rounded-full"
              onClick={() => onRemove(image.id)}
              data-testid={`button-remove-${index}`}
            >
              <X size={12} />
            </Button>
            <div className="absolute top-2 left-2 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center">
              <span className="text-xs font-medium" data-testid={`text-order-${index}`}>
                {index + 1}
              </span>
            </div>
            <div className="absolute bottom-2 right-2 text-gray-400 dark:text-gray-500">
              <GripVertical size={16} />
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 flex items-center">
        <GripVertical size={16} className="mr-1" />
        Drag images to reorder them in your PDF
      </p>
    </div>
  );
}
