
import React from 'react';
import { FileIcon } from './icons/FileIcon';

export const Header: React.FC = () => {
    return (
        <header className="bg-white dark:bg-slate-800/50 shadow-md backdrop-blur-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 md:px-8 py-4 flex items-center gap-4">
                <FileIcon className="h-8 w-8 text-indigo-500" />
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Image to PDF Converter
                </h1>
            </div>
        </header>
    );
};
