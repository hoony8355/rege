
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface ReportDisplayProps {
    markdownContent: string;
}

export const ReportDisplay: React.FC<ReportDisplayProps> = ({ markdownContent }) => {
    const [copyStatus, setCopyStatus] = useState('Copy');

    useEffect(() => {
        if (copyStatus === 'Copied!') {
            const timer = setTimeout(() => setCopyStatus('Copy'), 2000);
            return () => clearTimeout(timer);
        }
    }, [copyStatus]);

    const handleCopy = () => {
        navigator.clipboard.writeText(markdownContent).then(() => {
            setCopyStatus('Copied!');
        }, () => {
            setCopyStatus('Failed');
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">생성된 AI 광고 분석 보고서</h2>
                <button
                    onClick={handleCopy}
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300 text-sm"
                >
                    <ClipboardIcon />
                    <span className="ml-2">{copyStatus}</span>
                </button>
            </div>
            <article className="prose prose-lg max-w-none p-6 md:p-8">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {markdownContent}
                </ReactMarkdown>
            </article>
        </div>
    );
};
