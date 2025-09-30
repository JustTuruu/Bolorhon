import React, { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats] = useState({
    totalProducts: 12,
    totalOrders: 48,
    totalRevenue: 2340000,
    totalUsers: 156,
    pendingOrders: 8,
    lowStock: 3
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Хөнгөн хүүхдийн тэрэг',
      price: 450000,
      category: 'strollers',
      stock: 15,
      sold: 8
    },
    {
      id: 2,
      name: 'Хүүхдийн хамгаалалтын дэвсгэр',
      price: 65000,
      category: 'safety',
      stock: 25,
      sold: 12
    }
  ]);

  const [orders] = useState([
    {
      id: 'ORD-001',
      customer: 'Болдбаатар',
      items: 3,
      total: 520000,
      status: 'pending',
      date: '2025-09-27'
    },
    {
      id: 'ORD-002', 
      customer: 'Саруул',
      items: 1,
      total: 450000,
      status: 'shipped',
      date: '2025-09-26'
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'strollers',
    description: '',
    stock: '',
    image: ''
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      id: products.length + 1,
      ...newProduct,
      price: parseInt(newProduct.price),
      stock: parseInt(newProduct.stock),
      sold: 0
    };
    setProducts([...products, product]);
    setNewProduct({
      name: '',
      price: '',
      category: 'strollers',
      description: '',
      stock: '',
      image: ''
    });
    alert('Бүтээгдэхүүн амжилттай нэмэгдлээ! ✅');
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Бүтээгдэхүүнийг устгах уу?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const renderDashboard = () => (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h2>📊 Удирдлагын самбар</h2>
        <p>Ерөнхий статистик ба мэдээлэл</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card products">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{stats.totalProducts}</h3>
            <p>Нийт бүтээгдэхүүн</p>
          </div>
        </div>
        
        <div className="stat-card orders">
          <div className="stat-icon">🛒</div>
          <div className="stat-info">
            <h3>{stats.totalOrders}</h3>
            <p>Нийт захиалга</p>
          </div>
        </div>
        
        <div className="stat-card revenue">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>{stats.totalRevenue.toLocaleString()}₮</h3>
            <p>Нийт орлого</p>
          </div>
        </div>
        
        <div className="stat-card users">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalUsers}</h3>
            <p>Бүртгэгчид</p>
          </div>
        </div>
        
        <div className="stat-card pending">
          <div className="stat-icon">⏰</div>
          <div className="stat-info">
            <h3>{stats.pendingOrders}</h3>
            <p>Хүлээгдэж буй захиалга</p>
          </div>
        </div>
        
        <div className="stat-card stock">
          <div className="stat-icon">⚠️</div>
          <div className="stat-info">
            <h3>{stats.lowStock}</h3>
            <p>Дуусч буй бараа</p>
          </div>
        </div>
      </div>
      
      <div className="recent-activity">
        <h3>🔔 Сүүлийн үйл ажиллагаа</h3>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-icon">🛒</span>
            <span>Шинэ захиалга - ORD-003 (250,000₮)</span>
            <span className="activity-time">5 минутын өмнө</span>
          </div>
          <div className="activity-item">
            <span className="activity-icon">📦</span>
            <span>"Хүүхдийн тоглоом" үлдэгдэл бага байна</span>
            <span className="activity-time">1 цагийн өмнө</span>
          </div>
          <div className="activity-item">
            <span className="activity-icon">👤</span>
            <span>Шинэ хэрэглэгч бүртгүүллээ</span>
            <span className="activity-time">2 цагийн өмнө</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="products-management">
      <div className="section-header">
        <h2>📦 Бүтээгдэхүүний удирдлага</h2>
        <button className="add-btn" onClick={() => setActiveTab('add-product')}>
          ➕ Шинэ бүтээгдэхүүн нэмэх
        </button>
      </div>
      
      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Нэр</th>
              <th>Үнэ</th>
              <th>Ангилал</th>
              <th>Үлдэгдэл</th>
              <th>Зарагдсан</th>
              <th>Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>#{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString()}₮</td>
                <td>{product.category}</td>
                <td className={product.stock < 10 ? 'low-stock' : ''}>{product.stock}</td>
                <td>{product.sold}</td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn">✏️</button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAddProduct = () => (
    <div className="add-product">
      <div className="section-header">
        <h2>➕ Шинэ бүтээгдэхүүн нэмэх</h2>
      </div>
      
      <form onSubmit={handleAddProduct} className="product-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Бүтээгдэхүүний нэр</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              placeholder="Жишээ: Хүүхдийн тэрэг"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Үнэ (₮)</label>
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
              placeholder="450000"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Ангилал</label>
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
            >
              <option value="strollers">Хүүхдийн тэрэг</option>
              <option value="clothes">Хувцас</option>
              <option value="toys">Тоглоом</option>
              <option value="feeding">Хоол тэжээл</option>
              <option value="safety">Хамгаалалт</option>
              <option value="care">Арчилгаа</option>
              <option value="furniture">Тавилга</option>
              <option value="books">Ном</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Үлдэгдэл</label>
            <input
              type="number"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
              placeholder="25"
              required
            />
          </div>
          
          <div className="form-group full-width">
            <label>Тайлбар</label>
            <textarea
              value={newProduct.description}
              onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
              placeholder="Бүтээгдэхүүний дэлгэрэнгүй тайлбар..."
              rows="3"
            />
          </div>
          
          <div className="form-group full-width">
            <label>Зураг (emoji эсвэл URL)</label>
            <input
              type="text"
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
              placeholder="🚗 эсвэл зургийн холбоос"
            />
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            ✅ Бүтээгдэхүүн нэмэх
          </button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => setActiveTab('products')}
          >
            ❌ Цуцлах
          </button>
        </div>
      </form>
    </div>
  );

  const renderOrders = () => (
    <div className="orders-management">
      <div className="section-header">
        <h2>📋 Захиалгын удирдлага</h2>
      </div>
      
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Захиалгын дугаар</th>
              <th>Үйлчлүүлэгч</th>
              <th>Бараа</th>
              <th>Дүн</th>
              <th>Төлөв</th>
              <th>Огноо</th>
              <th>Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td><strong>{order.id}</strong></td>
                <td>{order.customer}</td>
                <td>{order.items} бараа</td>
                <td>{order.total.toLocaleString()}₮</td>
                <td>
                  <span className={`status ${order.status}`}>
                    {order.status === 'pending' ? '⏰ Хүлээгдэж байна' : '🚚 Илгээгдсэн'}
                  </span>
                </td>
                <td>{order.date}</td>
                <td>
                  <div className="action-buttons">
                    <button className="view-btn">👁️</button>
                    <button className="print-btn">🖨️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="header-left">
          <h1>👶 Болорхон Kids - Админ</h1>
          <span className="admin-badge">Администратор</span>
        </div>
        <div className="header-right">
          <button className="logout-btn" onClick={onLogout}>
            🚪 Гарах
          </button>
        </div>
      </div>
      
      <div className="admin-content">
        <div className="admin-sidebar">
          <nav className="admin-nav">
            <button 
              className={activeTab === 'dashboard' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Үндсэн самбар
            </button>
            <button 
              className={activeTab === 'products' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab('products')}
            >
              📦 Бүтээгдэхүүн
            </button>
            <button 
              className={activeTab === 'orders' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab('orders')}
            >
              📋 Захиалга
            </button>
            <button 
              className={activeTab === 'users' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab('users')}
            >
              👥 Хэрэглэгчид
            </button>
            <button 
              className={activeTab === 'analytics' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab('analytics')}
            >
              📈 Статистик
            </button>
            <button 
              className={activeTab === 'settings' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ Тохиргоо
            </button>
          </nav>
        </div>
        
        <div className="admin-main">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'add-product' && renderAddProduct()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'users' && (
            <div className="coming-soon">
              <h2>👥 Хэрэглэгчдийн удирдлага</h2>
              <p>Тун удахгүй бэлэн болно...</p>
            </div>
          )}
          {activeTab === 'analytics' && (
            <div className="coming-soon">
              <h2>📈 Статистик ба тайлан</h2>
              <p>Тун удахгүй бэлэн болно...</p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="coming-soon">
              <h2>⚙️ Тохиргоо</h2>
              <p>Тун удахгүй бэлэн болно...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;