export function Header(props) {
    const { shoppingItems } = props;
    const totalItems = shoppingItems.length;
    const unpurchasedItems = shoppingItems.filter(item => !item.purchased).length;
    const purchasedItems = shoppingItems.filter(item => item.purchased).length;

    return (
        <header>
            <h1>🛒 Ostoslista</h1>
            <div className="header-stats">
                <p>Yhteensä: {totalItems} tuotetta</p>
                <p>Ostettavana: {unpurchasedItems} | Korissa: {purchasedItems}</p>
            </div>
        </header>
    )
}
