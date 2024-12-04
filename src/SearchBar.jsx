import React from "react";
import toast from 'react-hot-toast';

const SearchBar = ({ onSubmit }) => {

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const topic = evt.target.elements.topic.value.trim();

        // Jeśli temat wyszukiwania jest pusty, wyświetlamy powiadomienie
        if (topic === "") {
            toast.error("Please enter search term!"); // Komunikat o błędzie
            return;
        }

        onSubmit(topic); // Wywołanie funkcji onSubmit (w App.js)
        evt.target.reset(); // Resetujemy pole wyszukiwania
    };

    return( 
        <header>
            <form onSubmit={handleSubmit}>
                <input
                    className="input"
                    type="text"
                    name="topic"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
                <button type="submit">Search</button>
            </form>
        </header>
    );
}

export default SearchBar;
