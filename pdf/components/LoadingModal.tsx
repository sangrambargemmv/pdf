
import React from 'react';
import { Spinner } from './Spinner';

interface LoadingModalProps {
    message: string;
}

export const LoadingModal: React.FC<LoadingModalProps> = ({ message }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
            <Spinner />
            <p className="text-white text-lg mt-4 font-semibold">{message || "Processing..."}</p>
        </div>
    );
};
