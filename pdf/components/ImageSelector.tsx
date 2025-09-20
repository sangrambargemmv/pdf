
import React, { useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageSelectorProps {
    onFilesSelected: (files: FileList) => void;
}

export const ImageSelector: React.FC<ImageSelectorProps> = ({ onFilesSelected }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            onFilesSelected(event.target.files);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <section className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 mb-8 text-center">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Step 1: Select Your Images</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Click the button below to choose multiple images from your device. Your files are processed locally and are never uploaded.</p>
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
            />
            <button
                onClick={handleClick}
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 transition-colors"
            >
                <UploadIcon className="w-5 h-5" />
                <span>Select Images</span>
            </button>
        </section>
    );
};
