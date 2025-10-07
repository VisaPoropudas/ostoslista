import { useState } from "react";
import { ShoppingItemCard } from "./ItemCard";
import { ConfirmModal } from "./ConfirmModal";

export function ShoppingList(props) {
    const { shoppingItems, selectedTab, onClearPurchased } = props;
    const [showClearModal, setShowClearModal] = useState(false);

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