
import React from 'react';
import { GenerateIcon } from './icons/GenerateIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { ShareIcon } from './icons/ShareIcon';
import { Spinner } from './Spinner';

interface PdfActionsProps {
    onGenerate: () => void;
    pdfFile: { url: string; name: string } | null;
    onShare: () => void;
    isGenerating: boolean;
    hasImages: boolean;
}

export const PdfActions: React.FC<PdfActionsProps> = ({ onGenerate, pdfFile, onShare, isGenerating, hasImages }) => {
    const canShare = !!(navigator.share && navigator.canShare);

    return (
        <section className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Step 3: Create & Export PDF</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Once you are happy with the image order, generate the PDF. You can then download it or share it directly if your browser supports it.</p>
            <div className="flex flex-wrap items-center gap-4">
                <button
                    onClick={onGenerate}
                    disabled={isGenerating || !hasImages}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    {isGenerating ? <Spinner /> : <GenerateIcon className="w-5 h-5" />}
                    <span>{isGenerating ? 'Generating...' : 'Generate PDF'}</span>
                </button>
                {pdfFile && (
                    <>
                        <a
                            href={pdfFile.url}
                            download={pdfFile.name}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 transition-colors"
                        >
                            <DownloadIcon className="w-5 h-5" />
                            <span>Download PDF</span>
                        </a>
                        {canShare && (
                            <button
                                onClick={onShare}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 transition-colors"
                            >
                                <ShareIcon className="w-5 h-5" />
                                <span>Share</span>
                            </button>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};
