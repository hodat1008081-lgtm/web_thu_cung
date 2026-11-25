// src/App.jsx
// ==============================================================================
// PetCare Joy - Hệ Thống Bán & Chăm Sóc Thú Cưng Toàn Diện
// Phân chia nhiệm vụ dự án nhóm:
// - Đạt: Admin Dashboard (ManageProducts, ManageOrders) & Nuôi thú ảo (VirtualPet)
// - Vân: Tìm kiếm (SearchBar, FilterSidebar) & Nuôi thú ảo (LevelSystem)
// - Trâm: Xác thực (Login, Register), Giỏ hàng (CartItem, CartSidebar) & SizeAdvisor
// - San San: Sản phẩm (ProductList, ProductDetail) & SizeAdvisor
// - Hiển: Thanh toán (CheckoutForm, PaymentMethods) & Đề xuất (BehaviorAnalysis)
// - Vương: Tra cứu đơn hàng (TrackingTimeline) & Đề xuất (BehaviorAnalysis)
// ==============================================================================

import { useState, useMemo, useEffect, useCallback } from 'react';
import './App.css';

// 1. Single Source of Truth (StoreContext)
import { useStore } from './context/StoreContext';

// 2. Header & Footer
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// 3. Phân hệ Auth (Trâm)
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// 4. Phân hệ Products (San San)
import ProductList from './pages/Products/ProductList';
import ProductDetail from './pages/Products/ProductDetail';

// 5. Phân hệ Search & Filter (Vân)
import FilterSidebar from './components/Search/FilterSidebar';

// 6. Phân hệ Cart (Trâm)
import CartSidebar from './components/Cart/CartSidebar';

// 7. Phân hệ Checkout (Hiển)
import CheckoutForm from './pages/Checkout/CheckoutForm';
import PaymentMethods from './pages/Checkout/PaymentMethods';

// 8. Phân hệ Order Tracking (Vương)
import TrackingTimeline from './pages/OrderTracking/TrackingTimeline';

// 9. Phân hệ Admin (Đạt)
import AdminDashboard from './pages/Admin/AdminDashboard';

// 10. Phân hệ Virtual Pet (Đạt & Vân)
import VirtualPetDashboard from './components/VirtualPet/VirtualPetDashboard';

// 11. Phân hệ Size Advisor (Trâm & San San)
import SizeCalculator from './components/SizeAdvisor/SizeCalculator';

// 12. Phân hệ Product Recommender (Hiển & Vương)
import BehaviorAnalysis from './components/ProductRecommender/BehaviorAnalysis';

// Map đường dẫn URL <-> tab nội bộ
const getTabFromPath = (pathname) => {
  const clean = (pathname || '/').toLowerCase().replace(/\/+$/, '') || '/';
  switch (clean) {
    case '/admin':
      return 'admin';
    case '/checkout':
      return 'checkout';
    case '/tracking':
      return 'tracking';
    case '/virtual-pet':
      return 'virtual-pet';
    case '/size-advisor':
      return 'size-advisor';
    case '/recommender':
      return 'recommender';
    default:
      return 'home';
  }
};

const getPathFromTab = (tab) => {
  switch (tab) {
    case 'admin':
      return '/admin';
    case 'checkout':
      return '/checkout';
    case 'tracking':
      return '/tracking';
    case 'virtual-pet':
      return '/virtual-pet';
    case 'size-advisor':
      return '/size-advisor';
    case 'recommender':
      return '/recommender';
    default:
      return '/';
  }
};

export default function App() {
  const {
    currentUser,
    products,
    cartItems,
    wishlist,
    logout,
    addToCart,
    updateCartQty,
    removeCartItem,
    toggleWishlist,
    placeOrder,
  } = useStore();

  // Điều hướng chính: 'home' | 'product-detail' | 'checkout' | 'tracking' | 'admin' | 'virtual-pet' | 'size-advisor' | 'recommender'
  const [currentTab, setCurrentTab] = useState(() => {
    const initialTab = getTabFromPath(window.location.pathname);
    if (initialTab === 'admin' && currentUser?.role !== 'admin') {
      return 'home';
    }
    if (initialTab === 'checkout' && !currentUser) {
      return 'home';
    }
    return initialTab;
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  // Tìm kiếm và lọc
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(true);

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Thông báo toast (hiện cảnh báo ngay nếu bị chặn /admin hoặc /checkout khi tải trang)
  const [toastMessage, setToastMessage] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    if (path === '/admin' && currentUser?.role !== 'admin') {
      return '⛔ Bạn không có quyền truy cập /admin! Tự động điều hướng về trang chủ.';
    }
    if (path === '/checkout' && !currentUser) {
      return '🔒 Vui lòng đăng nhập để tiếp tục thanh toán!';
    }
    return null;
  });

  // Modals (hỗ trợ mở sẵn nếu người dùng truy cập /login, /register hoặc bị chặn từ /checkout)
  const [isAuthOpen, setIsAuthOpen] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    return path === '/login' || path === '/register' || (path === '/checkout' && !currentUser);
  });
  const [authMode, setAuthMode] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    return path === '/register' ? 'register' : 'login';
  });
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    return path === '/checkout' && !currentUser ? 'checkout' : null;
  });
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Thông tin checkout đồng bộ từ currentUser (không dùng dữ liệu ảo hardcode)
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Form, 2: Payment
  const [customerInfo, setCustomerInfo] = useState(() => ({
    fullName: currentUser?.name || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    city: 'HCM',
    deliveryTime: 'morning',
    note: '',
  }));
  const [currentOrderTrackingId, setCurrentOrderTrackingId] = useState('');

  // State Nuôi Thú Ảo (Đạt & Vân)
  const [virtualPet, setVirtualPet] = useState({
    name: 'Bé Poodle Bon Bon',
    type: 'dog',
    level: 2,
    exp: 65,
    points: 180,
    hunger: 75,
    happiness: 90,
    cleanliness: 80,
    title: 'Cún Con Thông Minh',
  });

  // Toast helper
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  // Cập nhật thông tin giao hàng khi đăng nhập/đăng xuất
  const syncCustomerInfoFromUser = useCallback((user) => {
    if (user) {
      setCustomerInfo((prev) => ({
        ...prev,
        fullName: user.name || prev.fullName || '',
        phone: user.phone || prev.phone || '',
        address: user.address || prev.address || '',
      }));
    } else {
      setCustomerInfo({
        fullName: '',
        phone: '',
        address: '',
        city: 'HCM',
        deliveryTime: 'morning',
        note: '',
      });
    }
  }, []);

  // Điều hướng đồng bộ URL + Bảo vệ route /admin & /checkout
  const navigateToTab = useCallback(
    (tab) => {
      if (tab === 'admin' && currentUser?.role !== 'admin') {
        showToast('⛔ Bạn không có quyền truy cập Trang Quản Trị! (Chỉ dành cho Admin)');
        setCurrentTab('home');
        if (window.location.pathname !== '/') {
          window.history.replaceState(null, '', '/');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (tab === 'checkout' && !currentUser) {
        showToast('🔒 Vui lòng đăng nhập hoặc đăng ký để tiến hành thanh toán!');
        setRedirectAfterLogin('checkout');
        setAuthMode('login');
        setIsAuthOpen(true);
        window.history.pushState(null, '', '/login');
        return;
      }

      setCurrentTab(tab);
      const nextPath = getPathFromTab(tab);
      if (window.location.pathname !== nextPath) {
        window.history.pushState(null, '', nextPath);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [currentUser, showToast]
  );

  // Đồng bộ URL history & lắng nghe popstate trình duyệt (không gọi setState đồng bộ trong effect)
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    if (path === '/admin' && currentUser?.role !== 'admin') {
      window.history.replaceState(null, '', '/');
    } else if (path === '/checkout' && !currentUser) {
      window.history.replaceState(null, '', '/login');
    }

    const handlePopState = () => {
      const nextPath = window.location.pathname.toLowerCase();
      if (nextPath === '/login' || nextPath === '/register') {
        setAuthMode(nextPath === '/register' ? 'register' : 'login');
        setIsAuthOpen(true);
        return;
      }
      setIsAuthOpen(false);
      const targetTab = getTabFromPath(nextPath);
      if (targetTab === 'admin' && currentUser?.role !== 'admin') {
        showToast('⛔ Bạn không có quyền truy cập Trang Quản Trị!');
        setCurrentTab('home');
        window.history.replaceState(null, '', '/');
        return;
      }
      if (targetTab === 'checkout' && !currentUser) {
        showToast('🔒 Vui lòng đăng nhập để thanh toán!');
        setRedirectAfterLogin('checkout');
        setAuthMode('login');
        setIsAuthOpen(true);
        window.history.replaceState(null, '', '/login');
        return;
      }
      setCurrentTab(targetTab);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentUser, showToast]);

  // Chuyển hướng sang trang /login
  const openLoginPage = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
    window.history.pushState(null, '', mode === 'register' ? '/register' : '/login');
  };

  const closeAuthModal = () => {
    setIsAuthOpen(false);
    setRedirectAfterLogin(null);
    const backPath = getPathFromTab(currentTab);
    if (window.location.pathname === '/login' || window.location.pathname === '/register') {
      window.history.replaceState(null, '', backPath);
    }
  };

  // Thêm vào giỏ hàng (kèm kiểm tra tồn kho)
  const handleAddToCart = (product) => {
    const res = addToCart(product, product.quantity || 1);
    if (res?.message) showToast(res.message);
  };

  // Cập nhật số lượng giỏ hàng (chặn vượt quá tồn kho)
  const handleUpdateQty = (id, delta, selectedSize) => {
    const res = updateCartQty(id, delta, selectedSize);
    if (!res.ok && res.message) {
      showToast(res.message);
    }
  };

  // Xóa sản phẩm khỏi giỏ
  const handleRemoveCartItem = (id, selectedSize) => {
    removeCartItem(id, selectedSize);
    showToast('Đã xóa sản phẩm khỏi giỏ hàng.');
  };

  // Toggle wishlist
  const handleToggleWishlist = (productId) => {
    const added = toggleWishlist(productId);
    showToast(added ? '❤️ Đã thêm vào danh sách yêu thích!' : 'Đã xóa khỏi danh sách yêu thích');
  };

  // Xem chi tiết sản phẩm
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mua ngay từ trang chi tiết (kiểm tra stock & bắt buộc đăng nhập)
  const handleBuyNow = (product) => {
    const res = addToCart(product, product.quantity || 1);
    if (!res.ok) {
      showToast(res.message);
      return;
    }

    if (!currentUser) {
      showToast('🔒 Vui lòng đăng nhập hoặc đăng ký tài khoản để mua hàng!');
      setRedirectAfterLogin('checkout');
      openLoginPage('login');
      return;
    }

    setCheckoutStep(1);
    navigateToTab('checkout');
  };

  // Tiến hành checkout từ Giỏ hàng (chặn khách vãng lai chưa đăng nhập)
  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    if (!currentUser) {
      showToast('🔒 Bạn chưa đăng nhập! Vui lòng đăng nhập để tiến hành thanh toán.');
      setRedirectAfterLogin('checkout');
      openLoginPage('login');
      return;
    }
    setCheckoutStep(1);
    navigateToTab('checkout');
  };

  // Xác nhận đặt hàng từ PaymentMethods (trừ kho tự động & lưu đơn thật vào StoreContext)
  const handleConfirmOrder = ({ customerInfo: formInfo, paymentMethod }) => {
    const res = placeOrder({ customerInfo: formInfo, paymentMethod });

    if (res.requireLogin) {
      showToast(res.message);
      setRedirectAfterLogin('checkout');
      openLoginPage('login');
      return;
    }

    if (!res.ok) {
      showToast(`⚠️ ${res.message}`);
      return;
    }

    setCurrentOrderTrackingId(res.order.id);
    showToast(`🎉 Đặt hàng thành công! Mã đơn: ${res.order.id} (Trạng thái: Chờ xác nhận)`);
    navigateToTab('tracking');
  };

  // Đăng xuất tài khoản
  const handleLogout = () => {
    logout();
    syncCustomerInfoFromUser(null);
    showToast('👋 Đã đăng xuất tài khoản.');
    if (currentTab === 'admin' || currentTab === 'checkout') {
      setCurrentTab('home');
      window.history.replaceState(null, '', '/');
    }
  };

  // Đổi voucher từ Virtual Pet
  const handleClaimVoucher = () => {
    if (virtualPet.points < 100) {
      alert('Bạn chưa đủ điểm thưởng (Cần tối thiểu 100 điểm)! Hãy tiếp tục chăm sóc bé nhé.');
      return;
    }
    setVirtualPet((p) => ({ ...p, points: p.points - 100 }));
    showToast(`🎁 Đã đổi thành công Voucher 50.000₫! Áp dụng cho lần mua sắm tiếp theo.`);
  };

  // Hàm đặt lại toàn bộ tìm kiếm & bộ lọc (Vân)
  const handleResetFilters = () => {
    setActiveCategory('all');
    setPriceRange('all');
    setSortBy('default');
    setSearchTerm('');
  };

  // Bộ lọc sản phẩm (Vân & San San)
  const filteredProducts = useMemo(() => {
    let list = products.filter((prod) => {
      // 1. Lọc theo danh mục / Loài thú cưng
      const matchCategory = activeCategory === 'all' || prod.category === activeCategory;

      // 2. Lọc theo từ khóa tìm kiếm (tên, phân loại, mô tả, đặc điểm tags)
      const cleanSearch = searchTerm.toLowerCase().trim();
      let matchSearch = true;
      if (cleanSearch) {
        const inName = prod.name ? prod.name.toLowerCase().includes(cleanSearch) : false;
        const inCat = prod.categoryName ? prod.categoryName.toLowerCase().includes(cleanSearch) : false;
        const inDesc = prod.description ? prod.description.toLowerCase().includes(cleanSearch) : false;
        const inTags = prod.tags && Array.isArray(prod.tags)
          ? prod.tags.some((t) => t.toLowerCase().includes(cleanSearch))
          : false;
        matchSearch = inName || inCat || inDesc || inTags;
      }

      // 3. Lọc theo khoảng giá tiền
      let matchPrice = true;
      if (priceRange === 'under-1m') matchPrice = prod.price < 1000000;
      else if (priceRange === '1m-5m') matchPrice = prod.price >= 1000000 && prod.price <= 5000000;
      else if (priceRange === '5m-10m') matchPrice = prod.price > 5000000 && prod.price <= 10000000;
      else if (priceRange === 'above-10m') matchPrice = prod.price > 10000000;

      return matchCategory && matchSearch && matchPrice;
    });

    // 4. Sắp xếp danh sách kết quả
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, activeCategory, searchTerm, priceRange, sortBy]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Cuộn đến phần sản phẩm
  const scrollToProducts = () => {
    navigateToTab('home');
    setTimeout(() => {
      const el = document.getElementById('featured-products');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="app-container">
      {/* =========================================================
          1. HEADER (Tích hợp SearchBar của Vân, Cart & Auth của Trâm)
         ========================================================= */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalCartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => openLoginPage('login')}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        onOpenServiceModal={() => setIsServiceModalOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigateTab={navigateToTab}
        currentTab={currentTab}
      />

      {/* =========================================================
          NỘI DUNG CHÍNH THEO CÁC PHÂN HỆ
         ========================================================= */}

      {/* VIEW 1: TRANG CHỦ (Home) */}
      {currentTab === 'home' && (
        <main>
          {/* Banner Hero */}
          <section className="hero-section">
            <div className="container">
              <div className="hero-banner-card">
                <div className="hero-grid">
                  <div className="hero-text-content">
                    <div className="hero-badge-pill">
                      <span>✨</span> Cửa Hàng & Spa Thú Cưng Đạt Chuẩn 5 Sao
                    </div>

                    <h1 className="hero-title">
                      Ngôi Nhà Hạnh Phúc Cho <span className="hero-title-highlight">Thú Cưng Yêu Quý</span> Của Bạn
                    </h1>

                    <p className="hero-description">
                      Cung cấp các bé cún, mèo thuần chủng 100% khỏe mạnh đã tiêm phòng đủ mũi, cùng đầy đủ thức ăn dinh dưỡng nhập khẩu và dịch vụ spa cắt tỉa lông chuyên nghiệp nhất.
                    </p>

                    <div className="hero-cta-group">
                      <button className="btn-primary-cta" onClick={scrollToProducts}>
                        <span>🐾 Khám Phá Thú Cưng Ngay</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </button>

                      <button className="btn-secondary-cta" onClick={() => setIsServiceModalOpen(true)}>
                        <span>✂️ Đặt Lịch Spa Làm Đẹp</span>
                      </button>
                    </div>

                    <div className="hero-stats-row">
                      <div className="stat-item">
                        <span className="stat-num">15,000<span>+</span></span>
                        <span className="stat-label">Bé cưng đã tìm thấy chủ</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-num">100<span>%</span></span>
                        <span className="stat-label">Cam kết thuần chủng & ngừa bệnh</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-num">4.9<span>/5★</span></span>
                        <span className="stat-label">Đánh giá từ khách hàng yêu pet</span>
                      </div>
                    </div>
                  </div>

                  <div className="hero-image-wrapper">
                    <div className="hero-main-photo-frame">
                      <img
                        src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&auto=format&fit=crop&q=80"
                        alt="Chó và mèo cưng đáng yêu"
                        className="hero-main-photo"
                      />
                    </div>

                    <div className="floating-badge badge-top-left">
                      <div className="floating-icon-circle yellow">⭐</div>
                      <div>
                        <div className="floating-badge-title">Đánh giá 5.0 Sao</div>
                        <div className="floating-badge-sub">Hơn 2,800 phản hồi tốt</div>
                      </div>
                    </div>

                    <div className="floating-badge badge-bottom-right">
                      <div className="floating-icon-circle green">🎁</div>
                      <div>
                        <div className="floating-badge-title">Tặng Quà 500k</div>
                        <div className="floating-badge-sub">Cho đơn đón cún & mèo mới</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cam kết 4 dịch vụ vàng */}
          <section className="trust-features-section">
            <div className="container">
              <div className="trust-features-grid">
                <div className="trust-card">
                  <div className="trust-icon-box orange">🚚</div>
                  <div>
                    <div className="trust-title">Giao Hàng Siêu Tốc 2H</div>
                    <div className="trust-desc">Đưa đón thú cưng bằng xe chuyên dụng an toàn tuyệt đối</div>
                  </div>
                </div>

                <div className="trust-card">
                  <div className="trust-icon-box green">🛡️</div>
                  <div>
                    <div className="trust-title">Bảo Hành Sức Khỏe 30 Ngày</div>
                    <div className="trust-desc">Cam kết đổi bé mới nếu phát sinh bệnh truyền nhiễm Care/Parvo</div>
                  </div>
                </div>

                <div className="trust-card">
                  <div className="trust-icon-box blue">🩺</div>
                  <div>
                    <div className="trust-title">Bác Sĩ Thú Y Đồng Hành</div>
                    <div className="trust-desc">Tư vấn dinh dưỡng, tiêm chủng & khám định kỳ miễn phí</div>
                  </div>
                </div>

                <div className="trust-card">
                  <div className="trust-icon-box purple">💬</div>
                  <div>
                    <div className="trust-title">Hỗ Trợ Chăm Sóc 24/7</div>
                    <div className="trust-desc">Đội ngũ chuyên viên yêu thú cưng sẵn sàng hỗ trợ bất kỳ lúc nào</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Nút bật/tắt bộ lọc nâng cao */}
          <div className="container" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
            <button
              onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: showAdvancedFilter ? '#ff6b35' : '#ffffff',
                color: showAdvancedFilter ? '#ffffff' : '#1e293b',
                padding: '8px 18px',
                borderRadius: '50px',
                border: '1.5px solid #fed7aa',
                fontWeight: '700',
                fontSize: '0.88rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              }}
            >
              <span>{showAdvancedFilter ? '✕ Đóng Bộ Lọc' : '⚙️ Bộ Lọc Nâng Cao (Vân)'}</span>
            </button>
          </div>

          {/* Khu vực Sản phẩm có thể kèm FilterSidebar */}
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: showAdvancedFilter ? '280px 1fr' : '1fr', gap: '30px', alignItems: 'start' }}>
              {showAdvancedFilter && (
                <FilterSidebar
                  selectedCategory={activeCategory}
                  setSelectedCategory={setActiveCategory}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  totalResults={filteredProducts.length}
                  onResetFilters={handleResetFilters}
                />
              )}

              {/* Danh sách sản phẩm (San San) & Tích hợp Bộ lọc (Vân) */}
              <ProductList
                products={filteredProducts}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onResetFilters={handleResetFilters}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
                onSelectProduct={handleSelectProduct}
              />
            </div>
          </div>

          {/* Dịch vụ chăm sóc Spa */}
          <section className="services-section">
            <div className="container">
              <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 20px' }}>
                <div className="section-tagline" style={{ justifyContent: 'center' }}>
                  <span>✨</span> Dịch Vụ Chuẩn 5 Sao
                </div>
                <h2 className="section-main-heading">
                  Chăm Sóc Thú Cưng <span>Toàn Diện & Chuyên Nghiệp</span>
                </h2>
                <p style={{ color: '#64748b', marginTop: '10px' }}>
                  Chúng tôi không chỉ cung cấp thú cưng mà còn đồng hành chăm lo trọn đời cho các bé bằng tất cả tình thương.
                </p>
              </div>

              <div className="services-grid">
                <div className="service-card s1">
                  <div className="service-icon-wrap">✂️</div>
                  <h3 className="service-title">Spa, Tắm & Cắt Tỉa Lông</h3>
                  <p className="service-desc">
                    Quy trình 10 bước chuẩn quốc tế: Tắm sấy khử mùi, vắt tuyến hôi, vệ sinh tai móng, cắt tỉa tạo kiểu hot trend cho bé cưng luôn thơm tho, xinh xắn.
                  </p>
                  <button className="service-action-link" onClick={() => setIsServiceModalOpen(true)}>
                    <span>Đặt lịch Spa ngay</span> &rarr;
                  </button>
                </div>

                <div className="service-card s2">
                  <div className="service-icon-wrap">🏥</div>
                  <h3 className="service-title">Khám Thú Y & Tiêm Chủng</h3>
                  <p className="service-desc">
                    Đội ngũ bác sĩ thú y giàu kinh nghiệm với trang thiết bị xét nghiệm, siêu âm hiện đại. Tiêm phòng vacxin đầy đủ, tẩy giun và cấp sổ theo dõi định kỳ.
                  </p>
                  <button className="service-action-link" onClick={() => setIsServiceModalOpen(true)}>
                    <span>Tư vấn bác sĩ miễn phí</span> &rarr;
                  </button>
                </div>

                <div className="service-card s3">
                  <div className="service-icon-wrap">🏨</div>
                  <h3 className="service-title">Khách Sạn Thú Cưng (Pet Hotel)</h3>
                  <p className="service-desc">
                    Phòng máy lạnh 24/24 có camera riêng theo dõi qua điện thoại. Chế độ dinh dưỡng cao cấp, vui chơi vận động ngoài trời hàng ngày khi bạn bận đi xa.
                  </p>
                  <button className="service-action-link" onClick={() => setIsServiceModalOpen(true)}>
                    <span>Xem phòng & bảng giá</span> &rarr;
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* VIEW 2: CHI TIẾT SẢN PHẨM (San San) */}
      {currentTab === 'product-detail' && (
        <ProductDetail
          product={selectedProduct}
          onBack={() => navigateToTab('home')}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      )}

      {/* VIEW 3: THANH TOÁN (Hiển - Ép buộc đăng nhập mới được đặt hàng) */}
      {currentTab === 'checkout' && (
        !currentUser ? (
          <div className="container" style={{ padding: '80px 20px', textAlign: 'center', maxWidth: '520px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔒</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1e293b' }}>
              Vui Lòng Đăng Nhập Để Thanh Toán
            </h3>
            <p style={{ color: '#64748b', marginTop: '8px', marginBottom: '20px' }}>
              Để bảo vệ quyền lợi bảo hành thú cưng và theo dõi đơn hàng, bạn cần đăng nhập tài khoản trước khi đặt hàng.
            </p>
            <button
              type="button"
              className="btn-primary-cta"
              onClick={() => {
                setRedirectAfterLogin('checkout');
                openLoginPage('login');
              }}
            >
              🔐 Đăng Nhập Ngay
            </button>
          </div>
        ) : (
          <div className="container" style={{ padding: '40px 20px 80px' }}>
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 30px' }}>
              <h2 className="section-main-heading">
                Thanh Toán & <span>Đón Bé Về Nhà</span>
              </h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
                <button
                  className={`tab-btn ${checkoutStep === 1 ? 'active' : ''}`}
                  onClick={() => setCheckoutStep(1)}
                >
                  1. Thông tin giao nhận
                </button>
                <button
                  className={`tab-btn ${checkoutStep === 2 ? 'active' : ''}`}
                  onClick={() => setCheckoutStep(2)}
                >
                  2. Phương thức thanh toán
                </button>
              </div>
            </div>

            <div style={{ maxWidth: '780px', margin: '0 auto' }}>
              {checkoutStep === 1 ? (
                <CheckoutForm
                  formData={customerInfo}
                  setFormData={setCustomerInfo}
                  onNextStep={() => setCheckoutStep(2)}
                />
              ) : (
                <PaymentMethods
                  cartItems={cartItems}
                  customerInfo={customerInfo}
                  onConfirmOrder={handleConfirmOrder}
                  onBackToForm={() => setCheckoutStep(1)}
                  onRequireLogin={() => {
                    showToast('🔒 Vui lòng đăng nhập tài khoản để đặt hàng!');
                    setRedirectAfterLogin('checkout');
                    openLoginPage('login');
                  }}
                />
              )}
            </div>
          </div>
        )
      )}

      {/* VIEW 4: TRA CỨU ĐƠN HÀNG (Vương & Đồng bộ StoreContext) */}
      {currentTab === 'tracking' && (
        <TrackingTimeline
          key={currentOrderTrackingId || 'tracking-view'}
          initialOrderId={currentOrderTrackingId}
          onGoShopping={scrollToProducts}
          onNotify={showToast}
        />
      )}

      {/* VIEW 5: QUẢN TRỊ ADMIN (Đạt & Phân quyền Role: Admin) */}
      {currentTab === 'admin' && (
        currentUser?.role === 'admin' ? (
          <AdminDashboard
            onBackToStore={() => navigateToTab('home')}
            onNotify={showToast}
          />
        ) : (
          <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '14px' }}>⛔</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b' }}>
              Truy Cập Bị Từ Chối!
            </h3>
            <p style={{ color: '#64748b', marginTop: '10px', maxWidth: '480px', margin: '10px auto 24px' }}>
              Chỉ tài khoản Quản trị viên (Admin) mới có quyền truy cập vào phân hệ này. Bạn đang đăng nhập với tài khoản người dùng thông thường hoặc chưa đăng nhập.
            </p>
            <button className="btn-primary-cta" onClick={() => navigateToTab('home')}>
              ← Quay Về Trang Chủ
            </button>
          </div>
        )
      )}

      {/* VIEW 6: NUÔI THÚ CƯNG ẢO (Đạt & Vân) */}
      {currentTab === 'virtual-pet' && (
        <div className="container" style={{ padding: '20px 20px 80px' }}>
          <VirtualPetDashboard
            petState={virtualPet}
            setPetState={setVirtualPet}
            onClaimVoucher={handleClaimVoucher}
            onNavigateToShop={(actionType) => {
              if (actionType === 'cart') {
                setIsCartOpen(true);
              } else {
                navigateToTab('home');
                scrollToProducts();
              }
            }}
          />
        </div>
      )}

      {/* VIEW 7: TƯ VẤN KÍCH THƯỚC (Trâm & San San) */}
      {currentTab === 'size-advisor' && (
        <SizeCalculator
          onSelectRecommendedCategory={(cat) => {
            setActiveCategory(cat);
            navigateToTab('home');
            scrollToProducts();
          }}
        />
      )}

      {/* VIEW 8: ĐỀ XUẤT SẢN PHẨM / CHUẨN ĐOÁN (Hiển & Vương) */}
      {currentTab === 'recommender' && (
        <BehaviorAnalysis onAddComboToCart={handleAddToCart} />
      )}

      {/* =========================================================
          FOOTER (Thông tin đầy đủ các chi nhánh & CSKH)
         ========================================================= */}
      <Footer onSubscribeSuccess={() => showToast('🎉 Cảm ơn bạn! Mã voucher PETJOY10 đã gửi tới email.')} />

      {/* =========================================================
          MODALS & POPUPS
         ========================================================= */}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notice">
          <span>🐾</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Giỏ hàng Drawer / Modal (Trâm) */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedCheckout={handleProceedCheckout}
      />

      {/* Modal Đăng nhập / Đăng ký (Trâm & Phân quyền Role-based) */}
      {isAuthOpen && (
        <div className="modal-overlay" onClick={closeAuthModal}>
          {authMode === 'login' ? (
            <Login
              onLoginSuccess={(user) => {
                syncCustomerInfoFromUser(user);
                setIsAuthOpen(false);
                showToast(
                  `🎉 Xin chào, ${user.name}! Đăng nhập thành công (${
                    user.role === 'admin' ? '👑 Quản Trị Viên' : 'Khách Hàng'
                  }).`
                );
                if (redirectAfterLogin) {
                  const target = redirectAfterLogin;
                  setRedirectAfterLogin(null);
                  setCurrentTab(target);
                  window.history.replaceState(null, '', getPathFromTab(target));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  const backPath = getPathFromTab(currentTab);
                  window.history.replaceState(null, '', backPath);
                }
              }}
              onSwitchToRegister={() => openLoginPage('register')}
              onClose={closeAuthModal}
            />
          ) : (
            <Register
              onRegisterSuccess={(newUser) => {
                syncCustomerInfoFromUser(newUser);
                setIsAuthOpen(false);
                showToast(
                  `🎉 Chúc mừng ${newUser.name} đã đăng ký tài khoản thành công với vai trò: Khách Hàng (User)!`
                );
                if (redirectAfterLogin) {
                  const target = redirectAfterLogin;
                  setRedirectAfterLogin(null);
                  setCurrentTab(target);
                  window.history.replaceState(null, '', getPathFromTab(target));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  const backPath = getPathFromTab(currentTab);
                  window.history.replaceState(null, '', backPath);
                }
              }}
              onSwitchToLogin={() => openLoginPage('login')}
              onClose={closeAuthModal}
            />
          )}
        </div>
      )}

      {/* Modal Đặt lịch Spa & Dịch vụ */}
      {isServiceModalOpen && (
        <div className="modal-overlay" onClick={() => setIsServiceModalOpen(false)}>
          <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsServiceModalOpen(false)}>
              ✕
            </button>
            <h3 className="modal-title">Đặt Lịch Spa & Chăm Sóc Thú Cưng</h3>
            <p className="modal-subtitle">
              Để lại thông tin, chuyên viên Spa PetCare Joy sẽ gọi xác nhận trong 10 phút!
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsServiceModalOpen(false);
                showToast('✨ Đã nhận lịch hẹn! Chuyên viên sẽ gọi xác nhận ngay.');
              }}
            >
              <div className="form-group">
                <label className="form-label">Họ tên chủ bé</label>
                <input type="text" required placeholder="VD: Hoàng Anh" className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Số điện thoại liên hệ</label>
                <input type="tel" required placeholder="0988 xxx xxx" className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Dịch vụ cần đặt</label>
                <select className="form-input" style={{ background: '#fff' }}>
                  <option>✂️ Spa, tắm dưỡng & cắt tỉa tạo kiểu lông</option>
                  <option>🏥 Khám thú y & Tiêm phòng vacxin</option>
                  <option>🏨 Khách sạn thú cưng (Pet Hotel cao cấp)</option>
                  <option>🦷 Vệ sinh răng miệng & Lấy cao răng</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Bé cưng là gì?</label>
                <input type="text" placeholder="VD: Bé Cún Poodle 4kg hoặc Bé Mèo Anh 3kg" className="form-input" />
              </div>

              <button type="submit" className="submit-btn-full">
                Xác Nhận Đặt Lịch Hẹn
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
