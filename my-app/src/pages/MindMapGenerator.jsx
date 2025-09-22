import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FiUploadCloud, FiCheckCircle, FiLoader, FiEye, FiDownload, FiTrash2 } from "react-icons/fi";
import Tree from 'react-d3-tree';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function MindMapGenerator() {
    const [file, setFile] = useState(null);
    const [uploadError, setUploadError] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [jobs, setJobs] = useState([]);
    const pollRefs = useRef({});

    useEffect(() => {
        fetchMindmaps();
        return () => {
            Object.values(pollRefs.current).forEach(clearInterval);
        };
    }, []);

    async function fetchMindmaps() {
        try {
            const res = await axios.get("http://localhost:8000/api/mindmaps");
            // The fix: Ensure 'jobs' is always an array, even if the API returns null/empty.
            setJobs(res.data || []);
        } catch (err) {
            console.error("Failed to fetch mindmaps", err);
        }
    }

    function handleFileChange(e) {
        setUploadError("");
        const f = e.target.files?.[0];
        if (!f) return setFile(null);
        if (f.type !== "application/pdf") {
            setUploadError("Only PDF files are allowed.");
            return setFile(null);
        }
        if (f.size > MAX_FILE_SIZE) {
            setUploadError("File is larger than 10MB.");
            return setFile(null);
        }
        setFile(f);
    }

    async function handleUpload(e) {
        e.preventDefault();
        setUploadError("");
        if (!file) return setUploadError("Please choose a PDF file (≤10MB).");

        const fd = new FormData();
        fd.append("file", file);

        try {
            setIsUploading(true);
            const resp = await axios.post("http://localhost:8000/api/mindmaps/upload", fd, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const { jobId } = resp.data;
            const newJob = {
                id: jobId,
                title: file.name.replace(/\.[^/.]+$/, ""),
                status: "processing",
                createdAt: new Date().toISOString(),
                size: `${Math.round(file.size / 1024)} KB`,
                mindmapData: null,
            };
            setJobs((p) => [newJob, ...p]);
            setFile(null);
            startPolling(jobId);
        } catch (err) {
            console.error(err);
            setUploadError("Upload failed. Try again.");
        } finally {
            setIsUploading(false);
        }
    }

    function startPolling(jobId) {
        if (pollRefs.current[jobId]) clearInterval(pollRefs.current[jobId]);
        const interval = setInterval(async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/mindmaps/job/${jobId}`);
                const job = res.data;
                setJobs((prev) =>
                    prev.map((j) => (j.id === jobId ? { ...j, ...job } : j))
                );
                if (job.status === "completed" || job.status === "failed") {
                    clearInterval(pollRefs.current[jobId]);
                    delete pollRefs.current[jobId];
                }
            } catch (err) {
                console.error("poll error", err);
            }
        }, 2500);
        pollRefs.current[jobId] = interval;
    }

    async function handleDelete(id) {
        if (!confirm("Delete this mind map?")) return;
        try {
            await axios.delete(`/api/mindmaps/${id}`);
            setJobs((p) => p.filter((j) => j.id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete");
        }
    }

    function renderStatusTag(status) {
        if (status === "completed")
            return (
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-800 text-green-300">
                    Completed
                </span>
            );
        if (status === "processing")
            return (
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-700 text-slate-200">
                    Processing
                </span>
            );
        if (status === "failed")
            return (
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-800 text-red-300">
                    Failed
                </span>
            );
        return null;
    }
    
    const transformData = (data) => {
        if (!data) return null;
        const rootNode = {
            name: data.central_idea,
            children: data.branches.map(branch => ({
                name: branch.name,
                children: branch.sub_branches.map(sub => ({ name: sub }))
            }))
        };
        return rootNode;
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold text-slate-100 mb-6">
                <span className="inline-block mr-2">🧠</span> Mind Map Generator
            </h2>

            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-6">
                    <div className="flex-1">
                        <h3 className="text-lg font-medium text-white mb-2">
                            Upload Study Material
                        </h3>
                        <p className="text-sm text-slate-400 mb-4">
                            Upload PDF notes or documents to generate interactive mind maps.
                            Supports PDF files up to 10MB.
                        </p>

                        <form onSubmit={handleUpload} className="space-y-4">
                            <label
                                htmlFor="file"
                                className="block border-2 border-dashed border-slate-700 rounded-md p-6 text-center cursor-pointer"
                            >
                                <div className="flex flex-col items-center justify-center gap-3">
                                    <FiUploadCloud className="text-4xl text-slate-300" />
                                    <div className="text-slate-300">Upload your study notes</div>
                                    <div className="text-xs text-slate-500">
                                        PDF format only • Max 10MB
                                    </div>
                                    <input
                                        id="file"
                                        type="file"
                                        accept="application/pdf"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </div>
                            </label>

                            <div className="flex items-center gap-3">
                                <button
                                    type="submit"
                                    disabled={isUploading || !file}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-md text-white text-sm"
                                >
                                    {isUploading ? "Uploading..." : "Generate Mind Map"}
                                </button>

                                <div className="text-sm text-slate-400">
                                    {file ? (
                                        <div>
                                            <span className="font-medium text-slate-100">
                                                {file.name}
                                            </span>{" "}
                                            <span className="text-xs text-slate-400">
                                                • {Math.round(file.size / 1024)} KB
                                            </span>
                                        </div>
                                    ) : (
                                        "No file chosen"
                                    )}
                                </div>
                            </div>

                            {uploadError && (
                                <div className="text-sm text-red-400">{uploadError}</div>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <h4 className="text-lg text-slate-100 font-medium mb-3">
                    Your Mind Maps
                </h4>
                <div className="space-y-3">
                    {Array.isArray(jobs) && jobs.length === 0 && (
                        <div className="text-slate-400">No generated mind maps yet.</div>
                    )}
                    {Array.isArray(jobs) && jobs.map((j) => (
                        <div key={j.id} className="bg-slate-900 border border-slate-700 p-3 rounded">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div>
                                        {j.status === "completed" ? (
                                            <FiCheckCircle className="text-green-400 text-xl" />
                                        ) : (
                                            <FiLoader className="animate-spin text-slate-400 text-xl" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">{j.title}</div>
                                        <div className="text-xs text-slate-400">
                                            {j.createdAt ? new Date(j.createdAt).toLocaleString() : "just now"}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {renderStatusTag(j.status)}
                                    {j.status === "completed" && (
                                        <button
                                            onClick={() => alert('View Mind Map not implemented yet.')}
                                            className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200"
                                        >
                                            <FiEye /> View
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(j.id)}
                                        title="Delete mindmap"
                                        className="p-2 rounded hover:bg-red-700 text-red-300"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>

                            {j.status === 'completed' && j.mindmapData && (
                                <div className="mt-4 border-t border-slate-700 pt-4">
                                    <h5 className="text-sm font-medium text-slate-300 mb-2">Mind Map Preview</h5>
                                    <div style={{ width: '100%', height: '400px' }}>
                                        <Tree
                                            data={transformData(j.mindmapData)}
                                            translate={{ x: 100, y: 200 }}
                                            orientation="horizontal"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}