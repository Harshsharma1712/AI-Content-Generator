import React, { useState } from "react";
import axios from "axios";

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleGenerate = async () => {
        setLoading(true);
        setResponse("");

        try {
            const res = await axios.post<{ response: string }>(
                `${import.meta.env.VITE_BACKEND_URL}/generate`,
                { prompt }
            );
            setResponse(res.data.response);
        } catch (error) {
            console.error("Error fetching response:", error);
            setResponse("Failed to fetch response");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Future AI</h1>
            <div className="flex-grow flex flex-col max-w-2xl mx-auto w-full bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex-grow p-4 overflow-y-auto">
                    {response && (
                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-700 mb-2">Response:</h3>
                            <p className="bg-gray-100 p-3 rounded-lg text-gray-800">{response}</p>
                        </div>
                    )}
                </div>
                <div className="border-t border-gray-200 p-4">
                    <textarea
                        rows={3}
                        value={prompt}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
                        placeholder="Enter your prompt here"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Generating..." : "Generate"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;

