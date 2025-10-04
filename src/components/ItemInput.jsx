import { useState, useEffect, useRef } from "react";

export function ShoppingInput(props) {
    const { handleAddItem, favorites } = props;
    const [inputValue, setInputValue] = useState("");
    const [quantityValue, setQuantityValue] = useState("");
    const [showFavorites, setShowFavorites] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowFavorites(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    const handleAdd = () => {
        if (!inputValue.trim()) return;

        handleAddItem({
            name: inputValue.trim(),
            quantity: quantityValue.trim()
        });

        setInputValue('');
        setQuantityValue('');
        setShowFavorites(false);
    };

    const handleSelectFavorite = (favorite) => {
        setInputValue(favorite);
        setShowFavorites(false);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        // Show favorites if input has focus and there's a match
        if (value.trim()) {
            const hasMatch = favorites.some(fav =>
                fav.toLowerCase().includes(value.toLowerCase())
            );
            setShowFavorites(hasMatch);
        } else {
            setShowFavorites(favorites.length > 0);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    // Filter favorites based on input value
    const filteredFavorites = favorites.filter(favorite =>
        favorite.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div className="input-section">
            <div className="input-container">
                <div className="input-with-favorites" ref={dropdownRef}>
                    <input
                        value={inputValue}
                        onChange={handleInputChange}
                        onFocus={() => setShowFavorites(favorites.length > 0)}
                        onKeyPress={handleKeyPress}
                        placeholder="Tuotteen nimi"
                    />
                    {showFavorites && filteredFavorites.length > 0 && (
                        <div className="favorites-dropdown">
                            {filteredFavorites.map((favorite, index) => (
                                <div
                                    key={index}
                                    className="favorite-item"
                                    onClick={() => handleSelectFavorite(favorite)}
                                >
                                    {favorite}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <input
                    value={quantityValue}
                    onChange={(e) => setQuantityValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Määrä"
                    className="quantity-input"
                />
            </div>
            <button onClick={handleAdd} className="add-button">
                Lisää ostoslistaan
            </button>
        </div>
    );
}