export function Tabs(props) {
    const { shoppingItems, selectedTab, setSelectedTab, onManageFavorites } = props;
    const tabs = ['Ostoslista', 'Korissa'/*, 'Kaikki'*/];

    return (
        <nav className="tab-container">
            <div className="tabs-row">
                {tabs.map((tab, tabIndex) => {
                    const numberOfItems = tab === 'Kaikki' ?
                        shoppingItems.length :
                        tab === 'Ostoslista' ?
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
            </div>
            <hr />
        </nav>
    )
}