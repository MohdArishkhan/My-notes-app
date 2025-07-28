import React, { useEffect, useState } from "react";
import axios from "axios";

const NoteModal = ({ onClose, refreshNotes, existingNote }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    // Prefill if editing
    useEffect(() => {
        if (existingNote) {
            setTitle(existingNote.title);
            setDescription(existingNote.description);
        }
    }, [existingNote]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            setError("No authentication token found");
            return;
        }

        try {
            if (existingNote) {
                // EDIT mode
                await axios.put(`/api/notes/${existingNote._id}`, {
                    title,
                    description,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                // CREATE mode
                await axios.post("/api/notes", {
                    title,
                    description,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            refreshNotes();
            onClose();
        } catch (err) {
            setError("Failed to save note");
            console.error(err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-8 w-full max-w-md shadow-lg text-white">
                <h2 className="text-2xl mb-4 font-semibold">
                    {existingNote ? "Edit Note" : "Add Note"}
                </h2>
                {error && <p className="text-red-400 mb-2">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 rounded bg-gray-700 text-white mb-4"
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 rounded bg-gray-700 text-white mb-4"
                        rows={5}
                        required
                    ></textarea>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
                        >
                            {existingNote ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NoteModal;
