import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import { getInventory } from '../api/api';
import './Inventory.css';

const CATEGORIES = ['All', 'Produce', 'Proteins', 'Grains', 'Dairy', 'Canned Goods', 'Beverages', 'Household'];

function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await getInventory();
        setItems(response.data.items || []);
      } catch (err) {
        setError('Unable to load inventory. Please try again or ask a staff member.');
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const filtered =
    selectedCategory === 'All'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="inventory-container">
      <BackButton />
      <h1>Available Items Today</h1>
      <p className="inventory-description">
        Browse today's available food and household items. Quantities are updated in real time.
      </p>

      <div className="category-filter">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`category-btn${selectedCategory === cat ? ' active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {error && <div className="form-error">{error}</div>}

      {loading ? (
        <div className="loading">Loading inventory...</div>
      ) : filtered.length === 0 ? (
        <div className="empty-inventory">
          <p>No items available in this category right now. Please check with staff.</p>
        </div>
      ) : (
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Available Quantity</th>
              <th>Per Household</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className={item.quantity === 0 ? 'out-of-stock' : ''}>
                <td>{item.name}</td>
                <td>
                  <span className="category-tag">{item.category}</span>
                </td>
                <td>
                  {item.quantity > 0 ? (
                    <span className="in-stock">{item.quantity}</span>
                  ) : (
                    <span className="out-of-stock-label">Out of stock</span>
                  )}
                </td>
                <td>{item.limitPerHousehold || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Inventory;
