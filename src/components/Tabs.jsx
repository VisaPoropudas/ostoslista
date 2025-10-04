import { useState } from "react";
import { ConfirmModal } from "./ConfirmModal";

export function Tabs(props) {
    const { shoppingItems, selectedTab, setSelectedTab, onManageFavorites, onClearPurchased } = props;
    const tabs = ['Lista', 'Kori'/*, 'Kaikki'*/];
    const [showClearModal, setShowClearModal] = useState(false);

    const purchasedCount = shoppingItems.filter(item => item.purchased).length;

    const handleClearClick = () => {
        if (purchasedCount === 0) return;
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
        <nav className="tab-container">
            <div className="tabs-row">
                {tabs.map((tab, tabIndex) => {
                    const numberOfItems = tab === 'Kaikki' ?
                        shoppingItems.length :
                        tab === 'Lista' ?
                            shoppingItems.filter(item => !item.purchased).length :
                            shoppingItems.filter(item => item.purchased).length;
                    return (
                        <button
                            key={tabIndex}
                            onClick={() => setSelectedTab(tab)}
                            className={'tab-button' + (tab === selectedTab ? ' tab-selected' : '')}>
                            <h4>{tab} <span>({numberOfItems})</span></h4>
                        </button>
                    )
                })}
                <button
                    onClick={onManageFavorites}
                    className="favorites-toggle-btn"
                    title="Hallinnoi suosikkeja"
                >
                    ⭐ Suosikit
                </button>
                {selectedTab === 'Kori' && purchasedCount > 0 && (
                    <button
                        onClick={handleClearClick}
                        className="clear-cart-btn"
                        title="Tyhjennä ostetut tuotteet"
                    >
                        🗑️ Tyhjennä kori
                    </button>
                )}
            </div>
            <hr />

            <ConfirmModal
                isOpen={showClearModal}
                title="Tyhjennä kori"
                message={`Haluatko varmasti poistaa kaikki ${purchasedCount} ostettua tuotetta?`}
                onConfirm={handleConfirmClear}
                onCancel={handleCancelClear}
            />
        </nav>
    )
}