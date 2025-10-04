import { ShoppingItemCard } from "./ItemCard";

export function ShoppingList(props) {
    const { shoppingItems, selectedTab } = props;

    const filteredItems = selectedTab === 'Kaikki' ?
        shoppingItems :
        selectedTab === 'Kori' ?
            shoppingItems.filter(item => item.purchased) :
            shoppingItems.filter(item => !item.purchased);

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
        </div>
    )
}