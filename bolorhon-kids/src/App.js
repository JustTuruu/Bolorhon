import './App.css';
import { useState, useMemo } from 'react';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProductModal from './components/ProductModal';
import NotificationToast from './components/NotificationToast';
import ConfirmModal from './components/ConfirmModal';
import CartModal from './components/CartModal';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sortBy, setSortBy] = useState('name');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [showCategories, setShowCategories] = useState(false);

  // Map category values to display names
  const getCategoryDisplayName = (categoryValue) => {
    const categoryMap = {
      'all': 'Бүгд',
      'books': 'Ном',
      'strollers': 'Тэрэг', 
      'toys': 'POPMART',
      'care': 'Бүүвэйлэгч',
      'safety': 'Машины суудал',
      'feeding': 'Хооллолт',
      'clothes': 'Хувцас',
      'furniture': 'Манеж'
    };
    return categoryMap[categoryValue] || 'Бүгд';
  };

  const categories = [
    { id: 'all', name: 'Бүгд', icon: '🌟', count: 0, description: 'Бүх бүтээгдэхүүн' },
    { id: 'strollers', name: 'Хүүхдийн тэрэг', icon: '🚗', count: 0, description: 'Аюулгүй тэрэгнүүд' },
    { id: 'clothes', name: 'Хувцас', icon: '👶', count: 0, description: 'Зөөлөн хүүхдийн хувцас' },
    { id: 'toys', name: 'Тоглоом', icon: '🧸', count: 0, description: 'Хөгжүүлэх тоглоомууд' },
    { id: 'feeding', name: 'Хоол тэжээл', icon: '🍼', count: 0, description: 'Хоолны хэрэгсэл' },
    { id: 'safety', name: 'Хамгаалалт', icon: '🛡️', count: 0, description: 'Аюулгүй байдлын хэрэгсэл' },
    { id: 'care', name: 'Арчилгаа', icon: '🧴', count: 0, description: 'Хүүхэд арчилгааны бүтээгдэхүүн' },
    { id: 'furniture', name: 'Тавилга', icon: '🪑', count: 0, description: 'Хүүхдийн тавилга' },
    { id: 'books', name: 'Ном', icon: '📚', count: 0, description: 'Хүүхдийн номнууд' }
  ];

  const products = useMemo(() => [
    {
      id: 1,
      name: 'Хүүхдийн тэрэг',
      price: 450000,
      category: 'strollers',
      image: '/images/tereg/tereg1.png', // Жинхэнэ зураг ашиглах
      emoji: '🚗', // Emoji-г тусад нь хадгалах
      description: 'Хөнгөн жинтэй, хялбар эвхэх боломжтой. Аюулгүй, тав тухтай.',
      rating: 4.8,
      inStock: true,
      badge: 'Шинэ',
      colors: ['Улаан', 'Цэнхэр', 'Ногоон']
    },
    {
      id: 2,
      name: 'Хүүхдийн хамгаалалтын дэвсгэр',
      price: 65000,
      category: 'safety',
      image: '/images/car-seat.jpg',
      emoji: '🛡️',
      description: 'Хамгаалалттай, зөөлөн материалаар хийсэн. Машинд аюулгүй зорчих.',
      rating: 4.9,
      inStock: true,
      badge: 'Хямд',
      colors: ['Хар', 'Саарал']
    },
    {
      id: 3,
      name: 'Хүүхдийн тоглоомын багц',
      price: 120000,
      category: 'toys',
      image: '/images/toy-set.jpg',
      emoji: '🧸',
      description: 'Хөгжүүлэх тоглоомуудын иж бүрдэл. Оюуныг хөгжүүлэх.',
      rating: 4.7,
      inStock: true,
      badge: '',
      colors: ['Олон өнгө']
    },
    {
      id: 4,
      name: 'Хүүхдийн хоолны хэрэгсэл',
      price: 35000,
      category: 'feeding',
      image: '🍼',
      description: 'Аюулгүй материалаар хийсэн хоолны хэрэгсэл. BPA-гүй.',
      rating: 4.6,
      inStock: true,
      badge: 'Хямд',
      colors: ['Цагaan', 'Ягаан']
    },
    {
      id: 5,
      name: 'Хүүхдийн зөөлөн хувцас',
      price: 85000,
      category: 'clothes',
      image: '👶',
      description: '100% органик хөвөнөөр хийсэн. Арьсанд найрсаг.',
      rating: 4.9,
      inStock: false,
      badge: 'Органик',
      colors: ['Цагaan', 'Шар', 'Ягаан']
    },
    {
      id: 6,
      name: 'Premium хүүхдийн тэрэг',
      price: 890000,
      category: 'strollers',
      image: '🚙',
      description: 'Өндөр чанартай, олон функцтэй тэрэг. Европын стандарт.',
      rating: 5.0,
      inStock: true,
      badge: 'VIP',
      colors: ['Хар', 'Саарал', 'Цэнхэр']
    },
    {
      id: 7,
      name: 'Хүүхдийн шампунь',
      price: 25000,
      category: 'care',
      image: '🧴',
      description: 'Зөөлөн, нүдэнд орохгүй шампунь. Гипоаллергенийн.',
      rating: 4.5,
      inStock: true,
      badge: 'Шинэ',
      colors: ['Цагaan']
    },
    {
      id: 8,
      name: 'Хүүхдийн ширээ сандал',
      price: 180000,
      category: 'furniture',
      image: '🪑',
      description: 'Өсөх боломжтай ширээ сандал. Эргономик дизайн.',
      rating: 4.6,
      inStock: true,
      badge: '',
      colors: ['Модны', 'Цагaan']
    },
    {
      id: 9,
      name: 'Өнгөт дүрсний ном',
      price: 15000,
      category: 'books',
      image: '📚',
      description: 'Хүүхдэд зориулсан өнгөлөг дүрстэй ном. Суралцах.',
      rating: 4.8,
      inStock: true,
      badge: 'Боловсрол',
      colors: ['Олон өнгө']
    },
    {
      id: 10,
      name: 'Хүүхдийн унтлагын иж',
      price: 95000,
      category: 'clothes',
      image: '🛌',
      description: 'Зөөлөн унтлагын хувцас. Байгалийн материал.',
      rating: 4.7,
      inStock: true,
      badge: '',
      colors: ['Цэнхэр', 'Ягаан', 'Шар']
    },
    {
      id: 11,
      name: 'Авто суудлын хамгаалалт',
      price: 125000,
      category: 'safety',
      image: '🚗',
      description: 'Машины суудалд хамгаалалт. Аюулгүй зорчих.',
      rating: 4.9,
      inStock: true,
      badge: 'Шинэ',
      colors: ['Хар', 'Саарал']
    },
    {
      id: 12,
      name: 'Хөгжүүлэх тоглоом',
      price: 75000,
      category: 'toys',
      image: '🎯',
      description: 'Логик хөгжүүлэх тоглоом. 3+ насны хүүхдэд.',
      rating: 4.6,
      inStock: true,
      badge: '',
      colors: ['Олон өнгө']
    }
  ], []);

  // Update category counts
  const categoriesWithCounts = categories.map(category => ({
    ...category,
    count: category.id === 'all' ? products.length : products.filter(p => p.category === category.id).length
  }));

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'name':
        default: return a.name.localeCompare(b.name);
      }
    });
    
    return filtered;
  }, [selectedCategory, searchQuery, priceRange, sortBy, products]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (product) => {
    if (!product.inStock) {
      showNotification('❌ Энэ бүтээгдэхүүн дууссан байна', 'error');
      return;
    }
    
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        showNotification('✅ Сагсанд нэмэгдлээ', 'success');
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      showNotification('🛒 Шинэ бүтээгдэхүүн нэмэгдлээ!', 'success');
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const confirmRemoveFromCart = (productId) => {
    const product = cartItems.find(item => item.id === productId);
    setConfirmAction({
      message: `"${product.name}"-г сагснаас хасах уу?`,
      onConfirm: () => {
        removeFromCart(productId);
        showNotification('🗑️ Сагснаас хасагдлаа', 'info');
        setShowConfirmModal(false);
      },
      onCancel: () => setShowConfirmModal(false)
    });
    setShowConfirmModal(true);
  };

  const handleBuyNow = (product) => {
    showNotification('💳 Худалдан авах системд холбогдож байна...', 'info');
    // Энд худалдан авах логик нэмэх
  };

  const handleCheckout = () => {
    showNotification('💳 Төлбөрийн хуудас руу шилжиж байна...', 'info');
    setShowCart(false);
    // Энд checkout логик нэмэх
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };



  // Админ систем
  const handleAdminLogin = (success) => {
    if (success) {
      setIsAdminLoggedIn(true);
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setIsAdminMode(false);
  };

  // URL-аас админ режим шалгах
  if (window.location.pathname === '/admin' || isAdminMode) {
    if (!isAdminLoggedIn) {
      return <AdminLogin onLogin={handleAdminLogin} />;
    }
    return <AdminDashboard onLogout={handleAdminLogout} />;
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container header-container">
          <div className="logo">
            <img 
              className="logo-img" 
              src="/images/logo.jpg" 
              alt="Болорхон Kids"
              width="50"
              height="50"
              style={{width: '50px', height: '50px'}}
            />
            <div className="logo-text">
              <h1>Болорхон Kids</h1>
              <p>Хүүхдийн бүх хэрэгцээ</p>
            </div>
          </div>
          
          <div className="header-search">
            <div className="search-container">
              <input
                type="text"
                placeholder="🔍 Хайлт хийх..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="header-search-input"
              />
              <button className="search-btn">
                <span>🔍</span>
              </button>
            </div>
          </div>
          
          <div className="header-filters">
            <div className="dropdown-filter">
              <button 
                className="dropdown-btn"
                onClick={() => setShowCategories(!showCategories)}
              >
                📂 {getCategoryDisplayName(selectedCategory)}
                <span className={`dropdown-arrow ${showCategories ? 'open' : ''}`}>▼</span>
              </button>
              {showCategories && (
                <div className="dropdown-menu categories-dropdown">
                  <div className="dropdown-section">
                    <h4>� Ангиллууд</h4>
                    <div className="category-list">
                      <button 
                        onClick={() => {setSelectedCategory('all'); setShowCategories(false);}} 
                        className={selectedCategory === 'all' ? 'active' : ''}
                      >
                        🌟 Бүгд
                      </button>
                      <button 
                        onClick={() => {setSelectedCategory('toys'); setShowCategories(false);}} 
                        className={selectedCategory === 'toys' ? 'active' : ''}
                      >
                        🎨 POPMART
                      </button>
                      <button 
                        onClick={() => {setSelectedCategory('books'); setShowCategories(false);}} 
                        className={selectedCategory === 'books' ? 'active' : ''}
                      >
                        📚 Ном
                      </button>
                      <button 
                        onClick={() => {setSelectedCategory('strollers'); setShowCategories(false);}} 
                        className={selectedCategory === 'strollers' ? 'active' : ''}
                      >
                        🚗 Тэрэг
                      </button>
                      <button 
                        onClick={() => {setSelectedCategory('safety'); setShowCategories(false);}} 
                        className={selectedCategory === 'safety' ? 'active' : ''}
                      >
                        🪑 Машины суудал
                      </button>
                      <button 
                        onClick={() => {setSelectedCategory('care'); setShowCategories(false);}} 
                        className={selectedCategory === 'care' ? 'active' : ''}
                      >
                        👶 Бүүвэйлэгч
                      </button>
                      <button 
                        onClick={() => {setSelectedCategory('furniture'); setShowCategories(false);}} 
                        className={selectedCategory === 'furniture' ? 'active' : ''}
                      >
                        🏠 Манеж
                      </button>
                      <button 
                        onClick={() => {setSelectedCategory('clothes'); setShowCategories(false);}} 
                        className={selectedCategory === 'clothes' ? 'active' : ''}
                      >
                        👕 Хувцас
                      </button>
                      <button 
                        onClick={() => {setSelectedCategory('care'); setShowCategories(false);}} 
                        className={selectedCategory === 'care' ? 'active' : ''}
                      >
                        🛁 Ванн
                      </button>
                      <button 
                        onClick={() => {setSelectedCategory('furniture'); setShowCategories(false);}} 
                        className={selectedCategory === 'furniture' ? 'active' : ''}
                      >
                        🛏️ Модон ор
                      </button>
                      <button 
                        onClick={() => {setSelectedCategory('safety'); setShowCategories(false);}} 
                        className={selectedCategory === 'safety' ? 'active' : ''}
                      >
                        🔧 Хэрэгсэл
                      </button>
                      <button 
                        onClick={() => {setSelectedCategory('clothes'); setShowCategories(false);}} 
                        className={selectedCategory === 'clothes' ? 'active' : ''}
                      >
                        🦶 Хөлд оруулагч
                      </button>
                      <button 
                        onClick={() => {setSelectedCategory('toys'); setShowCategories(false);}} 
                        className={selectedCategory === 'toys' ? 'active' : ''}
                      >
                        🧸 Тоглоом
                      </button>
                      <button 
                        onClick={() => {setSelectedCategory('feeding'); setShowCategories(false);}} 
                        className={selectedCategory === 'feeding' ? 'active' : ''}
                      >
                        🍼 Хооллолт
                      </button>
                    </div>
                  </div>
                  <div className="dropdown-section price-section">
                    <h4>💰 Үнийн хязгаар</h4>
                    <div className="price-filter-dropdown">
                      <span className="price-display">{priceRange[1].toLocaleString()}₮ хүртэл</span>
                      <input
                        type="range"
                        min="0"
                        max="3000000"
                        step="10000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="price-range-dropdown"
                      />
                      <div className="price-labels">
                        <span>0₮</span>
                        <span>3,000,000₮</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <nav className="nav">
            <button 
              className="admin-access-btn"
              onClick={() => setIsAdminMode(true)}
              title="Админ хэсэг"
            >
              🔐
            </button>
            <button 
              className="cart-btn"
              onClick={() => setShowCart(!showCart)}
              title="Сагс"
            >
              🛒
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className='hero-content'>
          <img src="/images/hero/hero1.png" alt="Хүүхдийн бүтээгдэхүүн" className="hero-img" />
        </div>
      </section>

      <div className="container">
        {/* Search and Filters */}
        

        {/* Categories */}
        {/* <section className="categories">
          <h3>Ангилал сонгох</h3>
          <div className="category-grid">
            {categoriesWithCounts.map(category => (
              <button
                key={category.id}
                className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <div className="category-info">
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">({category.count})</span>
                  <span className="category-desc">{category.description}</span>
                </div>
              </button>
            ))}
          </div>
        </section> */}

        {/* Products */}
        <section className="products">
          <div className="products-header">
            <h3>Бүтээгдэхүүн ({filteredProducts.length})</h3>
            {searchQuery && (
              <p className="search-results">"{searchQuery}" хайлтын үр дүн</p>
            )}
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <div className="no-products-icon">🔍</div>
              <h4>Илэрц олдсонгүй</h4>
              <p>Таны хайлтад тохирох бүтээгдэхүүн олдсонгүй. Өөр түлхүүр үг оролдоод үзнэ үү.</p>
              <button 
                className="reset-search-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setPriceRange([0, 1000000]);
                }}
              >
                Хайлтыг цэвэрлэх
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image" onClick={() => openProductModal(product)}>
                    {product.image && product.image.startsWith('/images/') ? (
                      <>
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="product-img"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentNode.querySelector('.product-emoji-fallback').style.display = 'flex';
                          }}
                        />
                        <div className="product-emoji-fallback" style={{display: 'none'}}>
                          {product.emoji}
                        </div>
                      </>
                    ) : (
                      <div className="product-emoji">
                        {product.emoji || product.image}
                      </div>
                    )}
                    {product.badge && <span className={`product-badge ${product.badge.toLowerCase()}`}>{product.badge}</span>}
                    {!product.inStock && <span className="out-of-stock">Дууссан</span>}
                  </div>
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p className="product-description">{product.description}</p>
                    
                    <div className="product-meta">
                      <div className="product-rating">
                        <span>⭐ {product.rating}</span>
                      </div>
                      
                      <div className="product-colors">
                        <span>Өнгө: {product.colors.join(', ')}</span>
                      </div>
                    </div>
                    
                    <div className="product-price">
                      {product.price.toLocaleString()}₮
                    </div>
                    
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? '🛒 Сагсанд хийх' : '❌ Дууссан'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Shopping Cart Modal */}
      <CartModal
        isOpen={showCart}
        cartItems={cartItems}
        onClose={() => setShowCart(false)}
        onRemoveItem={confirmRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {/* Product Detail Modal */}
      <ProductModal
        isOpen={showProductModal}
        product={selectedProduct}
        onClose={() => setShowProductModal(false)}
        onAddToCart={addToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        confirmAction={confirmAction}
        onClose={() => setShowConfirmModal(false)}
      />

      {/* Notification Toast */}
      <NotificationToast
        notification={notification}
        onClose={() => setNotification(null)}
      />

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section"> 
              <img 
                className="footer-logo" 
                src="/images/Logo.jpg" 
                alt="Болорхон Kids"
                width="45"
                height="45"
                style={{width: '45px', height: '45px'}}
              /> 
              <h4>👶 Болорхон Kids</h4>
              <p>Хүүхдийн аюулгүй, чанартай бүтээгдэхүүн</p>
            </div>
            <div className="footer-section">
              <h4>Холбоо барих</h4>
              <p>📧 info@bolorhonkids.mn</p>
              <p>📞 +976 99628060</p>
            </div>
            <div className="footer-section">
              <h4>Дагах</h4>
              <p>📘 Facebook</p>
              <p>📷 Instagram</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Болорхон Kids. Бүх эрх хуулиар хамгаалагдсан.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
