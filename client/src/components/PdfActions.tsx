import { FileText, Download, Share, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PdfActionsProps {
  onGenerate: () => void;
  pdfFile: { url: string; name: string; blob: Blob } | null;
  onShare: () => void;
  isGenerating: boolean;
  hasImages: boolean;
}

export function PdfActions({
  onGenerate,
  pdfFile,
  onShare,
  isGenerating,
  hasImages,
}: PdfActionsProps) {
  const handleDownload = () => {
    if (pdfFile) {
      const link = document.createElement('a');
      link.href = pdfFile.url;
      link.download = pdfFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Generate PDF
      </h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={onGenerate}
          disabled={!hasImages || isGenerating}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:text-gray-500"
          data-testid="button-generate-pdf"
        >
          <FileText size={16} className="mr-2" />
          {isGenerating ? 'Generating...' : 'Generate PDF'}
        </Button>
        <Button
          onClick={handleDownload}
          disabled={!pdfFile}
          variant="secondary"
          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:bg-gray-100 disabled:text-gray-400"
          data-testid="button-download-pdf"
        >
          <Download size={16} className="mr-2" />
          Download
        </Button>
        <Button
          onClick={onShare}
          disabled={!pdfFile || !navigator.share}
          variant="secondary"
          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:bg-gray-100 disabled:text-gray-400"
          data-testid="button-share-pdf"
        >
          <Share size={16} className="mr-2" />
          Share
        </Button>
      </div>
      {hasImages && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
          <p className="text-sm text-blue-800 dark:text-blue-200 flex items-start">
            <Info size={16} className="mr-1 mt-0.5 flex-shrink-0" />
            Your PDF will contain {hasImages ? 'multiple' : '0'} pages, one for each image. 
            Processing happens entirely in your browser for privacy.
          </p>
        </div>
      )}
    </div>
  );
}
