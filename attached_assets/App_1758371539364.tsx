import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageSelector } from './components/ImageSelector';
import { ImageList } from './components/ImageList';
import { PdfActions } from './components/PdfActions';
import { LoadingModal } from './components/LoadingModal';
import { Footer } from './components/Footer';
import type { ImageFile } from './types';

// This is required because we are loading jsPDF from a CDN.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const jspdf: any;

const App: React.FC = () => {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [pdfFile, setPdfFile] = useState<{ url: string, name: string, blob: Blob } | null>(null);

    const handleFilesSelected = (files: FileList) => {
        const newImages: ImageFile[] = Array.from(files)
            .filter(file => file.type.startsWith('image/'))
            .map(file => ({
                id: `${file.name}-${file.lastModified}-${Math.random()}`,
                file: file,
                previewUrl: URL.createObjectURL(file),
            }));
        setImages(prevImages => [...prevImages, ...newImages]);
        setPdfFile(null); // Reset PDF when new images are added
    };

    const reorderImages = (sourceIndex: number, destinationIndex: number) => {
        setImages(prevImages => {
            const newImages = [...prevImages];
            const [removed] = newImages.splice(sourceIndex, 1);
            newImages.splice(destinationIndex, 0, removed);
            return newImages;
        });
    };

    const removeImage = (id: string) => {
        setImages(prevImages => prevImages.filter(image => image.id !== id));
    };

    const generatePdf = useCallback(async () => {
        if (images.length === 0) {
            alert("Please select some images first.");
            return;
        }

        setIsLoading(true);
        setLoadingMessage('Initializing PDF document...');

        try {
            const { jsPDF } = jspdf;
            const doc = new jsPDF();

            for (let i = 0; i < images.length; i++) {
                const image = images[i];
                setLoadingMessage(`Processing image ${i + 1} of ${images.length}...`);

                // Add a new page for the second image onwards. The first image uses the default page.
                if (i > 0) {
                    doc.addPage();
                }

                const img = new Image();
                img.src = image.previewUrl;

                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = (err) => {
                        console.error(`Failed to load image: ${image.file.name}`, err);
                        reject(new Error(`Could not load image ${image.file.name} for PDF generation.`));
                    };
                });

                const pageWidth = doc.internal.pageSize.getWidth();
                const pageHeight = doc.internal.pageSize.getHeight();

                const imgWidth = img.width;
                const imgHeight = img.height;

                const aspectRatio = imgWidth / imgHeight;
                const pageAspectRatio = pageWidth / pageHeight;

                let finalWidth, finalHeight;

                if (aspectRatio > pageAspectRatio) {
                    // Image is wider than page, fit to width
                    finalWidth = pageWidth;
                    finalHeight = pageWidth / aspectRatio;
                } else {
                    // Image is taller than page, fit to height
                    finalHeight = pageHeight;
                    finalWidth = pageHeight * aspectRatio;
                }

                const x = (pageWidth - finalWidth) / 2;
                const y = (pageHeight - finalHeight) / 2;

                doc.addImage(img, 'JPEG', x, y, finalWidth, finalHeight);
            }

            setLoadingMessage('Finalizing PDF...');
            const pdfBlob = doc.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            const fileName = `converted-${new Date().toISOString().split('T')[0]}.pdf`;

            setPdfFile({ url: pdfUrl, name: fileName, blob: pdfBlob });
        } catch (error) {
            console.error('Failed to generate PDF:', error);
            alert(`An error occurred while generating the PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    }, [images]);
    
    const handleShare = async () => {
        if (!pdfFile || !navigator.share) return;
        
        const fileToShare = new File([pdfFile.blob], pdfFile.name, { type: 'application/pdf' });

        if (navigator.canShare && navigator.canShare({ files: [fileToShare] })) {
            try {
                await navigator.share({
                    files: [fileToShare],
                    title: 'My PDF Document',
                    text: 'Here is the PDF I created.',
                });
            } catch (error) {
                console.error('Error sharing:', error);
                alert("Sharing failed. You can still download the file.");
            }
        } else {
            alert("Your browser doesn't support sharing files. Please download the PDF instead.");
        }
    };


    return (
        <div className="min-h-screen flex flex-col text-slate-800 dark:text-slate-200">
            <Header />
            <main className="flex-grow container mx-auto p-4 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <ImageSelector onFilesSelected={handleFilesSelected} />
                    
                    {images.length > 0 && (
                        <>
                            <ImageList 
                                images={images} 
                                onReorder={reorderImages} 
                                onRemove={removeImage} 
                            />
                            <PdfActions 
                                onGenerate={generatePdf}
                                pdfFile={pdfFile}
                                onShare={handleShare}
                                isGenerating={isLoading}
                                hasImages={images.length > 0}
                            />
                        </>
                    )}
                </div>
            </main>
            <Footer />
            {isLoading && <LoadingModal message={loadingMessage} />}
        </div>
    );
};

export default App;