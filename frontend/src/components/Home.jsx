import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteModal from "./NoteModal";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editNote, setEditNote] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const fetchNotes = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No authentication token found. Please log in.");
                return;
            }

            const searchParams = new URLSearchParams(location.search);
            const search = searchParams.get("search") || "";

            const { data } = await axios.get("/api/notes", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const filteredNotes = search
                ? data.filter((note) =>
                    note.title?.toLowerCase().includes(search.toLowerCase()) ||
                    note.description?.toLowerCase().includes(search.toLowerCase())
                )
                : data;

            setNotes(filteredNotes);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch notes");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
        } else {
            fetchNotes();
        }
    }, [location.search]);  // 🔥 search param change hone par bhi chale

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No authentication token found. Please log in.");
                return;
            }

            await axios.delete(`/api/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setNotes(notes.filter((note) => note._id !== id));
        } catch (err) {
            setError("Failed to delete note");
        }
    };

    const handleEdit = (note) => {
        setEditNote(note);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditNote(null);
    };

    // 🔍 Search box handler
    const handleSearch = (e) => {
        const query = e.target.value;
        const params = new URLSearchParams();
        if (query.trim()) params.set("search", query.trim());
        navigate(`?${params.toString()}`);
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 min-h-screen">
            {error && (
                <p className="text-red-400 mb-4 text-center text-lg">{error}</p>
            )}

            {/* 🔍 Search Input */}
            {/* <div className="mb-6 text-center">
                <input
                    type="text"
                    placeholder="Search notes..."
                    onChange={handleSearch}
                    defaultValue={new URLSearchParams(location.search).get("search") || ""}
                    className="w-full max-w-md px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-500"
                />
            </div> */}

            {/* 🔄 Create Note Button with Icon Spin */}
            <button
                onClick={() => setShowModal(true)}
                className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 hover:from-indigo-600 hover:to-blue-500 text-white shadow-xl rounded-full px-5 py-3 flex items-center gap-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl ring-2 ring-white/20 hover:ring-white cursor-pointer group"
            >
                <span className="text-2xl leading-none transition-transform duration-500 group-hover:rotate-180">➕</span>
                <span className="hidden sm:inline">Create Note</span>
            </button>
            {showModal && (
                <NoteModal
                    onClose={handleCloseModal}
                    refreshNotes={fetchNotes}
                    existingNote={editNote}
                />
            )}

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                    <div
                        key={note._id}
                        className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-2xl transition duration-300"
                    >
                        <h3 className="text-2xl font-semibold text-white mb-2">{note.title}</h3>
                        <p className="text-gray-300 text-base mb-4">{note.description}</p>
                        <p className="text-xs text-gray-500 italic mb-4">
                            Last Updated: {new Date(note.updatedAt).toLocaleString()}
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => handleEdit(note)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg transition"
                            >
                                ✏️ Edit
                            </button>
                            <button
                                onClick={() => handleDelete(note._id)}
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                            >
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
