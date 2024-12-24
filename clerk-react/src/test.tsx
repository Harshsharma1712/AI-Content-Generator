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
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Google Gemini AI Integration</h1>
            <textarea
                rows={5}
                cols={50}
                value={prompt}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here"
            />
            <br />
            <button onClick={handleGenerate} disabled={loading}>
                {loading ? "Generating..." : "Generate"}
            </button>
            <div style={{ marginTop: "20px" }}>
                <h3>Response:</h3>
                <p>{response}</p>
            </div>
        </div>
    );
};

export default App;
