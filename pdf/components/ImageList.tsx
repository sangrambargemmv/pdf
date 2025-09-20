
import React from 'react';
import type { ImageFile } from '../types';
import { ArrowUpIcon } from './icons/ArrowUpIcon';
import { ArrowDownIcon } from './icons/ArrowDownIcon';
import { TrashIcon } from './icons/TrashIcon';

interface ImageListProps {
    images: ImageFile[];
    onReorder: (sourceIndex: number, destinationIndex: number) => void;
    onRemove: (id: string) => void;
}

export const ImageList: React.FC<ImageListProps> = ({ images, onReorder, onRemove }) => {
    return (
        <section className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Step 2: Arrange Your Images</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Images will appear in the PDF in the order shown below. Use the arrows to reorder them or the trash icon to remove an image.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map((image, index) => (
                    <div key={image.id} className="relative group border-2 border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden aspect-square">
                        <img src={image.previewUrl} alt={image.file.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col items-center justify-center p-2">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                                <button
                                    onClick={() => onReorder(index, index - 1)}
                                    disabled={index === 0}
                                    className="p-2 bg-white/80 rounded-full text-slate-800 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
                                    title="Move Up"
                                >
                                    <ArrowUpIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => onRemove(image.id)}
                                    className="p-2 bg-red-500/80 rounded-full text-white hover:bg-red-500"
                                    title="Remove"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => onReorder(index, index + 1)}
                                    disabled={index === images.length - 1}
                                    className="p-2 bg-white/80 rounded-full text-slate-800 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
                                    title="Move Down"
                                >
                                    <ArrowDownIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="text-white text-xs font-mono mt-2 truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full text-center" title={image.file.name}>
                                {index + 1}. {image.file.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
