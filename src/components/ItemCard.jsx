import { useState } from "react";

export function ShoppingItemCard(props) {
    const { item, handleDeleteItem, handleTogglePurchased, handleEditItem, onAddFavorite, favorites } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(item.name);
    const [editQuantity, setEditQuantity] = useState(item.quantity);

    const handleSaveEdit = () => {
        handleEditItem(item.id, {
            name: editName.trim(),
            quantity: editQuantity.trim()
        });
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditName(item.name);
        setEditQuantity(item.quantity);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="card shopping-item editing">
                <div className="edit-inputs">
                    <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Tuotteen nimi"
                        className="edit-name-input"
                    />
                    <input
                        value={editQuantity}
                        onChange={(e) => setEditQuantity(e.target.value)}
                        placeholder="Määrä"
                        className="edit-quantity-input"
                    />
                </div>
                <div className="edit-buttons">
                    <button onClick={handleSaveEdit} className="save-btn">
                        Tallenna
                    </button>
                    <button onClick={handleCancelEdit} className="cancel-btn">
                        Peruuta
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`card shopping-item ${item.purchased ? 'purchased' : ''}`}>
            <div className="item-info">
                <div className="item-content">
                    <span className="item-name">{item.name}</span>
                    {item.quantity && <span className="item-quantity">({item.quantity})</span>}
                </div>
            </div>
            <div className="item-buttons">
                <button
                    onClick={() => handleTogglePurchased(item.id)}
                    className={item.purchased ? 'unpurchase-btn' : 'purchase-btn'}
                >
                    {item.purchased ? 'Peruuta' : 'Korissa'}
                </button>
                <button onClick={() => setIsEditing(true)} className="edit-btn">
                    Muokkaa
                </button>
                {!favorites.includes(item.name) && (
                    <button
                        onClick={() => onAddFavorite(item.name)}
                        className="favorite-btn"
                        title="Tallenna suosikiksi"
                    >
                        ⭐
                    </button>
                )}
                <button onClick={() => handleDeleteItem(item.id)} className="delete-btn">
                    Poista
                </button>
            </div>
        </div>
    );
}