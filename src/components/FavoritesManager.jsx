import { useState } from "react";
import { ConfirmModal } from "./ConfirmModal";

export function FavoritesManager(props) {
    const { favorites, onAddFavorite, onRemoveFavorite } = props;
    const [newFavorite, setNewFavorite] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [favoriteToDelete, setFavoriteToDelete] = useState(null);

    const handleAdd = () => {
        if (newFavorite.trim()) {
            onAddFavorite(newFavorite.trim());
            setNewFavorite("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    const handleRemoveClick = (favoriteName) => {
        setFavoriteToDelete(favoriteName);
        setShowDeleteModal(true);
    };

    const handleConfirmRemove = () => {
        if (favoriteToDelete) {
            onRemoveFavorite(favoriteToDelete);
        }
        setShowDeleteModal(false);
        setFavoriteToDelete(null);
    };

    const handleCancelRemove = () => {
        setShowDeleteModal(false);
        setFavoriteToDelete(null);
    };

    return (
        <div className="favorites-manager">
            <h3>Hallinnoi suosikkeja</h3>
            <div className="favorites-add-section">
                <input
                    value={newFavorite}
                    onChange={(e) => setNewFavorite(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Lisää uusi suosikki"
                />
                <button onClick={handleAdd} className="add-favorite-btn">
                    Lisää
                </button>
            </div>
            <div className="favorites-list">
                {favorites.length === 0 ? (
                    <p className="no-favorites">Ei vielä suosikkeja</p>
                ) : (
                    favorites.map((favorite, index) => (
                        <div key={index} className="favorite-item-card">
                            <span>{favorite}</span>
                            <button
                                onClick={() => handleRemoveClick(favorite)}
                                className="remove-favorite-btn icon-btn"
                                title="Poista suosikeista"
                            >
                                ✕
                            </button>
                        </div>
                    ))
                )}
            </div>
            <ConfirmModal
                isOpen={showDeleteModal}
                title="Poista suosikki"
                message={favoriteToDelete ? `Haluatko varmasti poistaa suosikin "${favoriteToDelete}"?` : ''}
                onConfirm={handleConfirmRemove}
                onCancel={handleCancelRemove}
            />
        </div>
    );
}
