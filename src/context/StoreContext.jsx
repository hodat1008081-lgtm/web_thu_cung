// src/context/StoreContext.jsx
// Single Source of Truth (Context + localStorage) cho toàn bộ nghiệp vụ PetCare Joy
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { INITIAL_PRODUCTS, normalizeProduct } from '../data/products';
import { DEFAULT_ADMIN_USER, INITIAL_USERS } from '../data/mockData';

const StoreContext = createContext(null);

const STORAGE_KEYS = {
  USERS: 'petcare_users',
  CURRENT_USER: 'petcare_current_user',
  PRODUCTS: 'petcare_products',
  ORDERS: 'petcare_orders',
  CART: 'petcare_cart',
  WISHLIST: 'petcare_wishlist',
};

// Map trạng thái cũ (nếu còn sót trong localStorage) sang chuẩn Tiếng Việt thống nhất
const normalizeOrderStatus = (status) => {
  switch (status) {
    case 'pending':
    case 'Chờ xác nhận':
      return 'Chờ xác nhận';
    case 'shipping':
    case 'Đang giao':
      return 'Đang giao';
    case 'completed':
    case 'Hoàn thành':
      return 'Hoàn thành';
    case 'cancelled':
    case 'Đã hủy':
      return 'Đã hủy';
    default:
      return 'Chờ xác nhận';
  }
};

// Đọc an toàn từ localStorage, có fallback nếu dữ liệu rỗng hoặc lỗi format
const safeLoadStorage = (key, getDefault, validateAndNormalize) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) {
      return getDefault();
    }
    const parsed = JSON.parse(raw);
    return validateAndNormalize ? validateAndNormalize(parsed) : parsed;
  } catch (err) {
    console.warn(`Lỗi đọc localStorage [${key}], khôi phục mặc định:`, err);
    return getDefault();
  }
};

export function StoreProvider({ children }) {
  // 1. Bảng USERS (luôn đảm bảo có tài khoản Admin mặc định)
  const [users, setUsers] = useState(() =>
    safeLoadStorage(
      STORAGE_KEYS.USERS,
      () => INITIAL_USERS,
      (parsed) => {
        if (!Array.isArray(parsed)) return INITIAL_USERS;
        const validUsers = parsed.filter((u) => u && typeof u === 'object' && u.email);
        const hasAdmin = validUsers.some(
          (u) => u.email.toLowerCase() === DEFAULT_ADMIN_USER.email.toLowerCase()
        );
        return hasAdmin ? validUsers : [DEFAULT_ADMIN_USER, ...validUsers];
      }
    )
  );

  // 2. Bảng CURRENT_USER
  const [currentUser, setCurrentUser] = useState(() =>
    safeLoadStorage(
      STORAGE_KEYS.CURRENT_USER,
      () => null,
      (parsed) => {
        if (!parsed || typeof parsed !== 'object' || !parsed.email) return null;
        return parsed;
      }
    )
  );

  // 3. Bảng PRODUCTS (chỉ khởi tạo từ INITIAL_PRODUCTS nếu localStorage chưa có)
  const [products, setProducts] = useState(() =>
    safeLoadStorage(
      STORAGE_KEYS.PRODUCTS,
      () => INITIAL_PRODUCTS.map(normalizeProduct).filter(Boolean),
      (parsed) => {
        if (!Array.isArray(parsed)) {
          return INITIAL_PRODUCTS.map(normalizeProduct).filter(Boolean);
        }
        return parsed.map(normalizeProduct).filter(Boolean);
      }
    )
  );

  // 4. Bảng ORDERS (đơn hàng thực tế do khách đặt)
  const [orders, setOrders] = useState(() =>
    safeLoadStorage(
      STORAGE_KEYS.ORDERS,
      () => [],
      (parsed) => {
        if (!Array.isArray(parsed)) return [];
        return parsed
          .filter((o) => o && typeof o === 'object' && o.id)
          .map((o) => ({
            ...o,
            status: normalizeOrderStatus(o.status),
            items: Array.isArray(o.items) ? o.items : [],
            stockRestored: Boolean(o.stockRestored),
          }));
      }
    )
  );

  // 5. Giỏ hàng & Wishlist lưu bền vững
  const [cartItems, setCartItems] = useState(() =>
    safeLoadStorage(
      STORAGE_KEYS.CART,
      () => [],
      (parsed) => (Array.isArray(parsed) ? parsed.filter((i) => i && i.id) : [])
    )
  );

  const [wishlist, setWishlist] = useState(() =>
    safeLoadStorage(
      STORAGE_KEYS.WISHLIST,
      () => [],
      (parsed) => (Array.isArray(parsed) ? parsed : [])
    )
  );

  // Đồng bộ tự động xuống localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (e) {
      console.error('Lỗi lưu users:', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    } catch (e) {
      console.error('Lỗi lưu currentUser:', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Lỗi lưu products:', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Lỗi lưu orders:', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Lỗi lưu cart:', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Lỗi lưu wishlist:', e);
    }
  }, [wishlist]);

  // =========================================================================
  // 1. NGHIỆP VỤ XÁC THỰC & PHÂN QUYỀN (AUTH)
  // =========================================================================
  const login = useCallback(
    (identifier, password) => {
      const cleanId = (identifier || '').trim().toLowerCase();
      if (!cleanId || !password) {
        return { ok: false, message: 'Vui lòng nhập đầy đủ Email/SĐT và Mật khẩu!' };
      }

      const found = users.find(
        (u) =>
          (u.email?.toLowerCase() === cleanId || (u.phone && u.phone.replace(/\s+/g, '') === cleanId.replace(/\s+/g, ''))) &&
          u.password === password
      );

      if (!found) {
        return {
          ok: false,
          message: 'Tài khoản hoặc mật khẩu không chính xác! Vui lòng kiểm tra lại hoặc đăng ký mới.',
        };
      }

      const sessionUser = {
        id: found.id,
        name: found.name,
        email: found.email,
        phone: found.phone || '',
        address: found.address || '',
        role: found.role || 'user',
      };
      setCurrentUser(sessionUser);
      return { ok: true, user: sessionUser };
    },
    [users]
  );

  const register = useCallback(
    ({ name, email, phone, password, address = '' }) => {
      const cleanEmail = (email || '').trim().toLowerCase();
      const cleanPhone = (phone || '').trim();
      const cleanName = (name || '').trim();

      if (!cleanName || !cleanEmail || !cleanPhone || !password) {
        return { ok: false, message: 'Vui lòng điền đầy đủ thông tin đăng ký!' };
      }
      if (password.length < 6) {
        return { ok: false, message: 'Mật khẩu phải có tối thiểu 6 ký tự!' };
      }

      const duplicate = users.some(
        (u) => u.email?.toLowerCase() === cleanEmail || (u.phone && u.phone === cleanPhone)
      );
      if (duplicate) {
        return { ok: false, message: 'Email hoặc Số điện thoại này đã được đăng ký!' };
      }

      const newUser = {
        id: `USR-${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        address: address.trim(),
        password,
        role: 'user',
        createdAt: new Date().toLocaleDateString('vi-VN'),
      };

      setUsers((prev) => [newUser, ...prev]);
      const sessionUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        role: 'user',
      };
      setCurrentUser(sessionUser);
      return { ok: true, user: sessionUser };
    },
    [users]
  );

  const loginSocial = useCallback(
    (provider) => {
      const socialEmail =
        provider === 'google' ? 'google.member@petcare.vn' : 'facebook.member@petcare.vn';
      const socialName = provider === 'google' ? 'Khách Google PetCare' : 'Khách Facebook PetCare';

      let existing = users.find((u) => u.email === socialEmail);
      if (!existing) {
        existing = {
          id: `USR-${Date.now()}`,
          name: socialName,
          email: socialEmail,
          phone: '0900 000 111',
          address: '',
          password: 'social_login_user',
          role: 'user',
          createdAt: new Date().toLocaleDateString('vi-VN'),
        };
        setUsers((prev) => [existing, ...prev]);
      }

      const sessionUser = {
        id: existing.id,
        name: existing.name,
        email: existing.email,
        phone: existing.phone,
        address: existing.address || '',
        role: existing.role || 'user',
      };
      setCurrentUser(sessionUser);
      return { ok: true, user: sessionUser };
    },
    [users]
  );

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  // =========================================================================
  // 2. NGHIỆP VỤ QUẢN LÝ KHO & SẢN PHẨM (ADMIN PRODUCTS)
  // =========================================================================
  const addProduct = useCallback((productData) => {
    const normalized = normalizeProduct({
      ...productData,
      id: productData.id || Date.now(),
    });
    if (!normalized) return null;
    setProducts((prev) => [normalized, ...prev]);
    return normalized;
  }, []);

  const updateProduct = useCallback((productId, updates) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        return normalizeProduct({ ...p, ...updates });
      })
    );
  }, []);

  const updateProductStock = useCallback((productId, nextStock) => {
    const safeStock = Math.max(0, Math.floor(Number(nextStock) || 0));
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: safeStock } : p))
    );
  }, []);

  const deleteProduct = useCallback((productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  // =========================================================================
  // 3. NGHIỆP VỤ GIỎ HÀNG & KIỂM TRA TỒN KHO (CART)
  // =========================================================================
  const addToCart = useCallback(
    (product, qtyToAdd = 1) => {
      if (!product) return { ok: false, message: 'Sản phẩm không hợp lệ!' };

      const storeProd = products.find((p) => p.id === product.id);
      const availableStock = storeProd ? storeProd.stock : (product.stock ?? 10);

      if (availableStock <= 0) {
        return { ok: false, message: `Sản phẩm "${product.name}" hiện đã hết hàng (Sold Out)!` };
      }

      // Tính tổng số lượng của cùng product.id đang nằm trong giỏ (kể cả khác size)
      const currentInCartSameId = cartItems
        .filter((item) => item.id === product.id)
        .reduce((sum, item) => sum + item.quantity, 0);

      if (currentInCartSameId + qtyToAdd > availableStock) {
        return {
          ok: false,
          message: `Không thể thêm! "${product.name}" chỉ còn ${availableStock} sản phẩm trong kho (đã có ${currentInCartSameId} trong giỏ).`,
        };
      }

      setCartItems((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item.id === product.id && (item.selectedSize || '') === (product.selectedSize || '')
        );
        if (existingIndex > -1) {
          return prev.map((item, idx) =>
            idx === existingIndex ? { ...item, quantity: item.quantity + qtyToAdd } : item
          );
        }
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: Number(product.price) || 0,
            costPrice: storeProd?.costPrice ?? product.costPrice ?? Math.round((Number(product.price) || 0) * 0.7),
            image: product.image,
            selectedSize: product.selectedSize,
            stock: availableStock,
            quantity: qtyToAdd,
          },
        ];
      });

      return { ok: true, message: `🐾 Đã thêm "${product.name}" vào giỏ hàng!` };
    },
    [products, cartItems]
  );

  const updateCartQty = useCallback(
    (productId, delta, selectedSize = undefined) => {
      const targetItem = cartItems.find(
        (item) => item.id === productId && (selectedSize === undefined || item.selectedSize === selectedSize)
      );
      if (!targetItem) return { ok: false };

      const storeProd = products.find((p) => p.id === productId);
      const availableStock = storeProd ? storeProd.stock : (targetItem.stock ?? 10);

      if (delta > 0) {
        const totalInCartSameId = cartItems
          .filter((item) => item.id === productId)
          .reduce((sum, item) => sum + item.quantity, 0);

        if (totalInCartSameId + delta > availableStock) {
          return {
            ok: false,
            message: `⚠️ Đạt giới hạn tồn kho! "${targetItem.name}" chỉ còn tối đa ${availableStock} sản phẩm.`,
          };
        }
      }

      setCartItems((prev) =>
        prev
          .map((item) => {
            if (item.id === productId && (selectedSize === undefined || item.selectedSize === selectedSize)) {
              const nextQty = item.quantity + delta;
              return nextQty > 0 ? { ...item, quantity: nextQty } : null;
            }
            return item;
          })
          .filter(Boolean)
      );

      return { ok: true };
    },
    [cartItems, products]
  );

  const removeCartItem = useCallback((productId, selectedSize = undefined) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === productId && (selectedSize === undefined || item.selectedSize === selectedSize))
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const toggleWishlist = useCallback((productId) => {
    let added = false;
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        added = false;
        return prev.filter((id) => id !== productId);
      } else {
        added = true;
        return [...prev, productId];
      }
    });
    return added;
  }, []);

  // =========================================================================
  // 4. NGHIỆP VỤ ĐẶT HÀNG & TỰ ĐỘNG TĂNG/GIẢM KHO (ORDERS)
  // =========================================================================
  const placeOrder = useCallback(
    ({ customerInfo, paymentMethod }) => {
      // Bắt buộc đăng nhập mới được đặt hàng
      if (!currentUser) {
        return {
          ok: false,
          requireLogin: true,
          message: 'Vui lòng đăng nhập hoặc đăng ký tài khoản để đặt hàng!',
        };
      }

      if (cartItems.length === 0) {
        return { ok: false, message: 'Giỏ hàng của bạn đang trống!' };
      }

      // Kiểm tra tồn kho tổng theo product.id trước khi trừ
      const qtyByProductId = {};
      for (const item of cartItems) {
        qtyByProductId[item.id] = (qtyByProductId[item.id] || 0) + item.quantity;
      }

      for (const [idStr, requestedQty] of Object.entries(qtyByProductId)) {
        const storeProd = products.find((p) => String(p.id) === String(idStr));
        if (storeProd && requestedQty > storeProd.stock) {
          return {
            ok: false,
            message: `Sản phẩm "${storeProd.name}" chỉ còn ${storeProd.stock} sản phẩm trong kho (bạn đang đặt ${requestedQty})!`,
          };
        }
      }

      // Tính toán tiền hàng & giá vốn thực tế tại thời điểm đặt
      const normalizedItems = cartItems.map((item) => {
        const storeProd = products.find((p) => p.id === item.id);
        const unitPrice = storeProd ? storeProd.price : item.price;
        const unitCost = storeProd ? storeProd.costPrice : (item.costPrice ?? Math.round(unitPrice * 0.7));
        return {
          id: item.id,
          name: item.name,
          price: unitPrice,
          costPrice: unitCost,
          quantity: item.quantity,
          image: item.image,
          selectedSize: item.selectedSize,
        };
      });

      const subtotal = normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const shippingFee = subtotal >= 500000 ? 0 : 50000;
      const totalAmount = subtotal + shippingFee;

      const orderId = `PET-${Date.now().toString().slice(-6)}`;
      const newOrder = {
        id: orderId,
        orderId,
        userId: currentUser.id,
        customerName: (customerInfo?.fullName || currentUser.name || '').trim(),
        customerEmail: currentUser.email,
        phone: (customerInfo?.phone || currentUser.phone || '').trim(),
        deliveryAddress: customerInfo?.address
          ? `${customerInfo.address}${customerInfo.city ? `, ${customerInfo.city}` : ''}`
          : currentUser.address || 'Chưa cung cấp địa chỉ',
        deliveryTime: customerInfo?.deliveryTime || 'morning',
        note: customerInfo?.note || '',
        items: normalizedItems,
        petName: normalizedItems.map((i) => `${i.name} (x${i.quantity})`).join(', '),
        subtotal,
        shippingFee,
        totalAmount,
        paymentMethod: paymentMethod || 'Thanh toán khi nhận hàng (COD)',
        status: 'Chờ xác nhận',
        stockRestored: false,
        createdAt: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
        createdAtISO: new Date().toISOString(),
        estimatedArrival: 'Dự kiến sau khi Admin duyệt xuất chuồng',
        driverName: 'Nguyễn Văn Hùng (Tài xế chuyên dụng PetCare)',
        driverPhone: '0912 345 678',
        driverVehicle: 'Xe ô tô bán tải chuyên dụng máy lạnh (Biển số: 51A-987.65)',
      };

      // Tự động TRỪ TỒN KHO (stock)
      setProducts((prev) =>
        prev.map((p) => {
          const orderedQty = qtyByProductId[p.id];
          if (!orderedQty) return p;
          return {
            ...p,
            stock: Math.max(0, p.stock - orderedQty),
          };
        })
      );

      // Cập nhật địa chỉ mặc định cho currentUser nếu trước đó chưa có
      if (customerInfo?.address && !currentUser.address) {
        const nextUser = { ...currentUser, address: newOrder.deliveryAddress };
        setCurrentUser(nextUser);
        setUsers((prev) =>
          prev.map((u) => (u.id === currentUser.id ? { ...u, address: newOrder.deliveryAddress } : u))
        );
      }

      setOrders((prev) => [newOrder, ...prev]);
      setCartItems([]);

      return { ok: true, order: newOrder };
    },
    [currentUser, cartItems, products]
  );

  // Chuyển trạng thái đơn hàng & Tự động hoàn kho khi Hủy đơn (chỉ hoàn 1 lần duy nhất)
  const updateOrderStatus = useCallback(
    (orderId, rawNextStatus) => {
      const nextStatus = normalizeOrderStatus(rawNextStatus);
      const targetOrder = orders.find((o) => o.id === orderId);
      if (!targetOrder) {
        return { ok: false, message: 'Không tìm thấy đơn hàng!' };
      }

      if (targetOrder.status === nextStatus) {
        return { ok: false, message: `Đơn hàng đã ở trạng thái "${nextStatus}".` };
      }

      if (targetOrder.status === 'Đã hủy') {
        return { ok: false, message: 'Đơn hàng đã bị hủy trước đó, không thể thay đổi trạng thái!' };
      }

      if (targetOrder.status === 'Hoàn thành' && nextStatus === 'Đã hủy') {
        return { ok: false, message: 'Không thể hủy đơn hàng đã hoàn thành!' };
      }

      // Nếu chuyển sang "Đã hủy" và chưa từng hoàn kho -> Cộng hoàn lại stock 1 lần duy nhất
      if (nextStatus === 'Đã hủy' && !targetOrder.stockRestored) {
        const restoreByProductId = {};
        for (const item of targetOrder.items || []) {
          restoreByProductId[item.id] = (restoreByProductId[item.id] || 0) + (Number(item.quantity) || 0);
        }

        setProducts((prev) =>
          prev.map((p) => {
            const restoreQty = restoreByProductId[p.id];
            if (!restoreQty) return p;
            return {
              ...p,
              stock: p.stock + restoreQty,
            };
          })
        );

        setOrders((prev) =>
          prev.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  status: 'Đã hủy',
                  stockRestored: true,
                  cancelledAt: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
                }
              : o
          )
        );

        return {
          ok: true,
          restoredStock: true,
          message: `Đã hủy đơn ${orderId} và hoàn lại số lượng sản phẩm vào kho!`,
        };
      }

      // Chuyển trạng thái bình thường ("Chờ xác nhận" -> "Đang giao" -> "Hoàn thành")
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId
            ? {
                ...o,
                status: nextStatus,
                updatedAt: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
              }
            : o
        )
      );

      return {
        ok: true,
        message: `Đã cập nhật đơn ${orderId} sang trạng thái "${nextStatus}".`,
      };
    },
    [orders]
  );

  // Tiện ích Reset dữ liệu mẫu ở trang Admin để dễ kiểm thử
  const resetDemoData = useCallback(() => {
    const freshProducts = INITIAL_PRODUCTS.map(normalizeProduct).filter(Boolean);
    setProducts(freshProducts);
    setOrders([]);
    setCartItems([]);
    setUsers((prev) => {
      const admin = prev.find((u) => u.email.toLowerCase() === DEFAULT_ADMIN_USER.email.toLowerCase());
      return admin ? [admin] : [DEFAULT_ADMIN_USER];
    });
    // Nếu đang đăng nhập là admin thì giữ phiên đăng nhập để không bị văng khỏi trang Admin
    if (currentUser && currentUser.role !== 'admin') {
      setCurrentUser(null);
    }
  }, [currentUser]);

  const value = {
    users,
    currentUser,
    products,
    orders,
    cartItems,
    wishlist,
    login,
    register,
    loginSocial,
    logout,
    addProduct,
    updateProduct,
    updateProductStock,
    deleteProduct,
    addToCart,
    updateCartQty,
    removeCartItem,
    clearCart,
    toggleWishlist,
    placeOrder,
    updateOrderStatus,
    resetDemoData,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore phải được sử dụng bên trong StoreProvider!');
  }
  return ctx;
}
