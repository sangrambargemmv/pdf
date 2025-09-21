import { useState } from "react";
import { Moon, Sun, FileText, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="text-white" size={16} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Image to PDF Converter
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Convert your images to PDF instantly
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              data-testid="button-help"
              className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
            >
              <HelpCircle size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
