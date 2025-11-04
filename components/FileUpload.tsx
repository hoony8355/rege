
import React from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface FileUploadProps {
    id: string;
    label: string;
    onFileSelect: (id: string, file: File | null) => void;
    fileName?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ id, label, onFileSelect, fileName }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        onFileSelect(id, file);
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg h-full transition-colors duration-300 hover:border-indigo-500 hover:bg-indigo-50">
            <label htmlFor={id} className="cursor-pointer flex flex-col items-center text-center">
                <UploadIcon />
                <span className="mt-2 text-sm font-semibold text-gray-600">{label}</span>
                 <p className="mt-1 text-xs text-gray-500 truncate max-w-full px-2">
                    {fileName ? fileName : 'CSV 파일 선택'}
                 </p>
            </label>
            <input
                id={id}
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
};
