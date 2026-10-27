import { useEffect, useState } from "react";
import TheatreService from "./services/TheatreService";
import "./App.css";

function App() {
    const [theatres, setTheatres] = useState([]);
    const [showTitle, setShowTitle] = useState("");
    const [language, setLanguage] = useState("");
    const [showDate, setShowDate] = useState("");
    const [ticketPrice, setTicketPrice] = useState("");
    const [searchId, setSearchId] = useState("");
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadTheatres();
    }, []);

    function loadTheatres() {
        TheatreService.getAllTheatres()
            .then(function (response) {
                setTheatres(response.data);
            })
            .catch(function () {
                setMessage("Unable to load shows. Check the backend.");
            });
    }

    function clearForm() {
        setShowTitle("");
        setLanguage("");
        setShowDate("");
        setTicketPrice("");
        setEditId(null);
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (showTitle.trim() === "" || language.trim() === "") {
            setMessage("Please enter the show title and language.");
            return;
        }

        if (showDate === "" || ticketPrice === "") {
            setMessage("Please enter the date and ticket price.");
            return;
        }

        if (Number(ticketPrice) < 0) {
            setMessage("Ticket price cannot be negative.");
            return;
        }

        const theatre = {
            showTitle: showTitle,
            language: language,
            showDate: showDate,
            ticketPrice: Number(ticketPrice)
        };

        if (editId === null) {
            TheatreService.addTheatre(theatre)
                .then(function () {
                    setMessage("Show added successfully.");
                    clearForm();
                    loadTheatres();
                })
                .catch(function () {
                    setMessage("Unable to add show.");
                });
        } else {
            TheatreService.updateTheatre(editId, theatre)
                .then(function () {
                    setMessage("Show updated successfully.");
                    clearForm();
                    loadTheatres();
                })
                .catch(function () {
                    setMessage("Unable to update show.");
                });
        }
    }

    function handleSearch(event) {
        event.preventDefault();

        if (searchId === "" || Number(searchId) <= 0) {
            setMessage("Enter a valid show ID.");
            return;
        }

        TheatreService.getTheatreById(searchId)
            .then(function (response) {
                setTheatres([response.data]);
                setMessage("Show found.");
            })
            .catch(function () {
                setMessage("Show not found.");
                setTheatres([]);
            });
    }

    function handleEdit(theatre) {
        setEditId(theatre.id);
        setShowTitle(theatre.showTitle);
        setLanguage(theatre.language);
        setShowDate(theatre.showDate);
        setTicketPrice(String(theatre.ticketPrice));
        setMessage("Edit the details and click Update Show.");
        window.scrollTo(0, 0);
    }

    function handleDelete(id) {
        const confirmed = window.confirm("Are you sure you want to delete this show?");

        if (confirmed) {
            TheatreService.deleteTheatre(id)
                .then(function () {
                    setMessage("Show deleted successfully.");
                    loadTheatres();
                })
                .catch(function () {
                    setMessage("Unable to delete show.");
                });
        }
    }

    function handleViewAll() {
        setSearchId("");
        setMessage("");
        loadTheatres();
    }

    return (
        <div className="app">
            <header className="header">
                <h1>TheatreShow Management</h1>
                <p>Manage theatre shows in one place</p>
            </header>

            <main className="container">
                <section className="form-section">
                    <h2>{editId === null ? "Add Theatre Show" : "Update Theatre Show"}</h2>

                    <form onSubmit={handleSubmit}>
                        <label>Show Title</label>
                        <input
                            type="text"
                            value={showTitle}
                            onChange={(event) => setShowTitle(event.target.value)}
                            placeholder="Enter show title"
                            required
                        />

                        <label>Language</label>
                        <input
                            type="text"
                            value={language}
                            onChange={(event) => setLanguage(event.target.value)}
                            placeholder="Enter language"
                            required
                        />

                        <label>Show Date</label>
                        <input
                            type="date"
                            value={showDate}
                            onChange={(event) => setShowDate(event.target.value)}
                            required
                        />

                        <label>Ticket Price</label>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={ticketPrice}
                            onChange={(event) => setTicketPrice(event.target.value)}
                            placeholder="Enter ticket price"
                            required
                        />

                        <div className="button-group">
                            <button type="submit">
                                {editId === null ? "Add Show" : "Update Show"}
                            </button>

                            <button type="button" className="secondary" onClick={clearForm}>
                                Clear
                            </button>
                        </div>
                    </form>
                </section>

                {message !== "" && <p className="message">{message}</p>}

                <section className="list-section">
                    <h2>Theatre Shows</h2>

                    <form className="search-form" onSubmit={handleSearch}>
                        <input
                            type="number"
                            min="1"
                            value={searchId}
                            onChange={(event) => setSearchId(event.target.value)}
                            placeholder="Search by show ID"
                        />

                        <button type="submit">Search</button>

                        <button
                            type="button"
                            className="secondary"
                            onClick={handleViewAll}
                        >
                            View All
                        </button>
                    </form>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Show Title</th>
                                    <th>Language</th>
                                    <th>Show Date</th>
                                    <th>Ticket Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {theatres.length === 0 ? (
                                    <tr>
                                        <td colSpan="6">No theatre shows found.</td>
                                    </tr>
                                ) : (
                                    theatres.map(function (theatre) {
                                        return (
                                            <tr key={theatre.id}>
                                                <td>{theatre.id}</td>
                                                <td>{theatre.showTitle}</td>
                                                <td>{theatre.language}</td>
                                                <td>{theatre.showDate}</td>
                                                <td>{theatre.ticketPrice}</td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleEdit(theatre)}
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="delete"
                                                            onClick={() => handleDelete(theatre.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;