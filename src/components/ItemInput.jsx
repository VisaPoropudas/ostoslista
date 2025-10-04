import { useState } from "react";

export function ShoppingInput(props) {
    const { handleAddItem, favorites } = props;
    const [inputValue, setInputValue] = useState("");
    const [quantityValue, setQuantityValue] = useState("");
    const [showFavorites, setShowFavorites] = useState(false);

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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    return (
        <div className="input-section">
            <div className="input-container">
                <div className="input-with-favorites">
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={() => setShowFavorites(true)}
                        onKeyPress={handleKeyPress}
                        placeholder="Tuotteen nimi"
                    />
                    {showFavorites && favorites.length > 0 && (
                        <div className="favorites-dropdown">
                            {favorites.map((favorite, index) => (
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