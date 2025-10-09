import { useState } from "react";
import { ShoppingItemCard } from "./ItemCard";
import { ConfirmModal } from "./ConfirmModal";

export function ShoppingList(props) {
    const { shoppingItems, selectedTab, onClearPurchased, onReorderItems } = props;
    const [showClearModal, setShowClearModal] = useState(false);
    const [draggedItemId, setDraggedItemId] = useState(null);

    const filteredItems = selectedTab === 'Kaikki' ?
        shoppingItems :
        selectedTab === 'Kori' ?
            shoppingItems.filter(item => item.purchased) :
            shoppingItems.filter(item => !item.purchased);

    const purchasedCount = shoppingItems.filter(item => item.purchased).length;

    const handleClearClick = () => {
        setShowClearModal(true);
    };

    const handleConfirmClear = () => {
        onClearPurchased();
        setShowClearModal(false);
    };

    const handleCancelClear = () => {
        setShowClearModal(false);
    };

    const handleDragStart = (e, itemId) => {
        setDraggedItemId(itemId);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, targetItemId) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        if (draggedItemId === null || draggedItemId === targetItemId) {
            return;
        }

        const draggedIndex = shoppingItems.findIndex(item => item.id === draggedItemId);
        const targetIndex = shoppingItems.findIndex(item => item.id === targetItemId);

        if (draggedIndex === -1 || targetIndex === -1) {
            return;
        }

        const newItems = [...shoppingItems];
        const [draggedItem] = newItems.splice(draggedIndex, 1);
        newItems.splice(targetIndex, 0, draggedItem);

        onReorderItems(newItems);
    };

    const handleDrop = (e, targetItemId) => {
        e.preventDefault();
    };

    const handleDragEnd = () => {
        setDraggedItemId(null);
    };

    return (
        <div className="shopping-list-container">
            {filteredItems.length === 0 ? (
                <div className="empty-state">
                    <p>Ei tuotteita</p>
                </div>
            ) : (
                filteredItems.map((item) => {
                    return (
                        <ShoppingItemCard
                            key={item.id}
                            item={item}
                            {...props}
                            onDragStart={handleDragStart}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onDragEnd={handleDragEnd}
                        />
                    )
                })
            )}

            {selectedTab === 'Kori' && purchasedCount > 0 && (
                <button
                    onClick={handleClearClick}
                    className="clear-cart-btn-bottom"
                >
                    🗑️ Tyhjennä kori ({purchasedCount} tuotetta)
                </button>
            )}

            <ConfirmModal
                isOpen={showClearModal}
                title="Tyhjennä kori"
                message={`Haluatko varmasti poistaa kaikki ${purchasedCount} ostettua tuotetta?`}
                onConfirm={handleConfirmClear}
                onCancel={handleCancelClear}
            />
        </div>
    )
}