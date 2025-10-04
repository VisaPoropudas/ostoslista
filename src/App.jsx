import { useState, useEffect } from 'react'

import { Header } from './components/Header'
import { Tabs } from './components/Tabs'
import { ShoppingList } from './components/ShoppingList'
import { ShoppingInput } from './components/ItemInput'
import { FavoritesManager } from './components/FavoritesManager'
import './fanta.css'



function App() {

  const [shoppingItems, setShoppingItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Ostoslista');
  const [showFavoritesManager, setShowFavoritesManager] = useState(false);

  function handleAddItem(newItem) {
    const newShoppingList = [...shoppingItems, {
      id: Date.now(),
      name: newItem.name,
      quantity: newItem.quantity || '',
      purchased: false,
      isFavorite: favorites.includes(newItem.name)
    }];
    setShoppingItems(newShoppingList);
    saveShoppingData(newShoppingList);
  }

  function handleTogglePurchased(id) {
    const newShoppingList = shoppingItems.map(item =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    );
    setShoppingItems(newShoppingList);
    saveShoppingData(newShoppingList);
  }

  function handleDeleteItem(id) {
    const newShoppingList = shoppingItems.filter(item => item.id !== id);
    setShoppingItems(newShoppingList);
    saveShoppingData(newShoppingList);
  }

  function handleEditItem(id, updatedItem) {
    const newShoppingList = shoppingItems.map(item =>
      item.id === id ? { ...item, ...updatedItem } : item
    );
    setShoppingItems(newShoppingList);
    saveShoppingData(newShoppingList);
  }

  function handleAddFavorite(favoriteName) {
    if (!favorites.includes(favoriteName) && favoriteName.trim()) {
      const newFavorites = [...favorites, favoriteName.trim()];
      setFavorites(newFavorites);
      saveFavoritesData(newFavorites);
    }
  }

  function handleRemoveFavorite(favoriteName) {
    const newFavorites = favorites.filter(fav => fav !== favoriteName);
    setFavorites(newFavorites);
    saveFavoritesData(newFavorites);
  }

  function handleClearPurchased() {
    const newShoppingList = shoppingItems.filter(item => !item.purchased);
    setShoppingItems(newShoppingList);
    saveShoppingData(newShoppingList);
  }

  function saveShoppingData(items) {
    localStorage.setItem('shopping-list', JSON.stringify(items));
  }

  function saveFavoritesData(favs) {
    localStorage.setItem('shopping-favorites', JSON.stringify(favs));
  }

  useEffect(() => {
    // Load shopping list
    const storedList = localStorage.getItem('shopping-list');
    if (storedList) {
      setShoppingItems(JSON.parse(storedList));
    }

    // Load favorites
    const storedFavorites = localStorage.getItem('shopping-favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <>
      <Header shoppingItems={shoppingItems} />
      <Tabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        shoppingItems={shoppingItems}
        onManageFavorites={() => setShowFavoritesManager(!showFavoritesManager)}
        onClearPurchased={handleClearPurchased}
      />

      {showFavoritesManager && (
        <FavoritesManager
          favorites={favorites}
          onAddFavorite={handleAddFavorite}
          onRemoveFavorite={handleRemoveFavorite}
        />
      )}

      <ShoppingList
        shoppingItems={shoppingItems}
        selectedTab={selectedTab}
        handleDeleteItem={handleDeleteItem}
        handleTogglePurchased={handleTogglePurchased}
        handleEditItem={handleEditItem}
        onAddFavorite={handleAddFavorite}
        favorites={favorites}
      />

      <ShoppingInput
        handleAddItem={handleAddItem}
        favorites={favorites}
      />
    </>
  )
}

export default App
