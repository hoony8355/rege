
import React, { useState, useCallback } from 'react';
import { FileUpload } from './components/FileUpload';
import { ReportDisplay } from './components/ReportDisplay';
import { Spinner } from './components/Spinner';
import { generateReport } from './services/geminiService';
import { readFileAsText } from './utils/fileUtils';

const App: React.FC = () => {
    const [files, setFiles] = useState<{ [key: string]: File | null }>({
        device: null,
        weekly: null,
        keyword: null,
    });
    const [report, setReport] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleFileChange = useCallback((id: string, file: File | null) => {
        setFiles(prevFiles => ({ ...prevFiles, [id]: file }));
    }, []);

    const handleGenerateReport = async () => {
        if (!files.device || !files.weekly || !files.keyword) {
            setError('Please upload all three required CSV files.');
            return;
        }

        setIsLoading(true);
        setError('');
        setReport('');

        try {
            const deviceData = await readFileAsText(files.device);
            const weeklyData = await readFileAsText(files.weekly);
            const keywordData = await readFileAsText(files.keyword);
            
            const generatedReport = await generateReport(deviceData, weeklyData, keywordData);
            setReport(generatedReport);
        } catch (err) {
            console.error(err);
            setError('Failed to generate the report. Please check the console for more details.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const allFilesUploaded = files.device && files.weekly && files.keyword;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            <main className="container mx-auto px-4 py-8 md:py-12">
                <div className="max-w-4xl mx-auto">
                    <header className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
                            AI 광고 성과 보고서 생성기
                        </h1>
                        <p className="text-lg text-gray-600">
                            3개의 광고 데이터 CSV 파일을 업로드하여 AI 기반 분석 리포트를 받아보세요.
                        </p>
                    </header>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <FileUpload
                                id="device"
                                label="PC/모바일 데이터"
                                onFileSelect={handleFileChange}
                                fileName={files.device?.name}
                            />
                            <FileUpload
                                id="weekly"
                                label="주간 데이터"
                                onFileSelect={handleFileChange}
                                fileName={files.weekly?.name}
                            />
                            <FileUpload
                                id="keyword"
                                label="키워드 데이터"
                                onFileSelect={handleFileChange}
                                fileName={files.keyword?.name}
                            />
                        </div>
                        
                        <div className="text-center">
                            <button
                                onClick={handleGenerateReport}
                                disabled={!allFilesUploaded || isLoading}
                                className="w-full md:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                            >
                                {isLoading ? '보고서 생성 중...' : '보고서 생성'}
                            </button>
                        </div>
                    </div>
                    
                    {isLoading && (
                        <div className="mt-10 flex flex-col items-center justify-center text-center">
                             <Spinner />
                            <p className="text-lg font-semibold text-indigo-600 mt-4">AI가 보고서를 분석하고 생성하는 중입니다...</p>
                            <p className="text-gray-500">잠시만 기다려 주세요.</p>
                        </div>
                    )}

                    {error && (
                        <div className="mt-10 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                            <p className="font-bold">Error</p>
                            <p>{error}</p>
                        </div>
                    )}

                    {report && !isLoading && (
                        <div className="mt-10">
                           <ReportDisplay markdownContent={report} />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;
