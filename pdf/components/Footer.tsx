
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-slate-800/50 mt-8">
            <div className="container mx-auto px-4 md:px-8 py-4 text-center text-slate-500 dark:text-slate-400">
                <p>&copy; {new Date().getFullYear()} Image to PDF Converter. All rights reserved. Works offline.</p>
            </div>
        </footer>
    );
};
