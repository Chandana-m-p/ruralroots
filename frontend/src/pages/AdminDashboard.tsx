import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Package, Users, IndianRupee, TrendingUp, Bell, 
  ChevronDown, Menu, LayoutDashboard, Layers, 
  BarChart3, Megaphone, Settings, LogOut, Store, Sprout, MapPin, Sparkles, ShieldCheck,
  Search, X, Check, Eye, Edit3, Plus, RefreshCw, AlertCircle, Phone, Mail, CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'PRODUCTS' | 'ORDERS' | 'ARTISANS' | 'HUBS' | 'CATEGORIES' | 'ANALYTICS' | 'SETTINGS'>('OVERVIEW');

  // Interactive UI Controls & State
  const [activeTimeframe, setActiveTimeframe] = useState<'This Month' | 'Last Month' | 'This Year'>('This Month');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notificationList, setNotificationList] = useState([
    { id: 1, title: 'Low Stock Alert: Narsapur Hub', msg: 'Seagrass Belly Basket inventory below 5 units.', time: '10 mins ago', read: false },
    { id: 2, title: 'New Artisan Registered', msg: 'Ramesh Kumar (Wood Carving, MP) joined platform.', time: '1 hour ago', read: false },
    { id: 3, title: 'PWA Offline Sync Complete', msg: '12 offline orders synced from Ramgarh Village Hub.', time: '2 hours ago', read: false }
  ]);

  // Filtering & Modal States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');
  const [selectedOrderModal, setSelectedOrderModal] = useState<any>(null);
  const [selectedProductModal, setSelectedProductModal] = useState<any>(null);
  const [selectedArtisanModal, setSelectedArtisanModal] = useState<any>(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [actionSuccessBanner, setActionSuccessBanner] = useState('');

  // Top Selling Rural Product Categories
  const [topCategories] = useState([
    { name: 'Pottery & Terracotta', count: '20 Master Products', img: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=100&h=100&fit=crop' },
    { name: 'Handwoven Baskets', count: '20 Master Products', img: 'https://images.unsplash.com/photo-1622560481156-01ac25e4c0ac?w=100&h=100&fit=crop' },
    { name: 'Wooden Crafts', count: '20 Master Products', img: 'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=100&h=100&fit=crop' },
    { name: 'Bamboo Products', count: '20 Master Products', img: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=100&h=100&fit=crop' },
    { name: 'Handmade Jewelry', count: '20 Master Products', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100&h=100&fit=crop' }
  ]);

  // Sample Products Data State
  const [productsList, setProductsList] = useState([
    { id: 1, name: 'Seagrass Belly Basket', category: 'Handwoven Baskets', price: 650, stock: 45, sales: 1245, artisan: 'Lalitha Devi', img: 'https://images.unsplash.com/photo-1622560481156-01ac25e4c0ac?w=100&h=100&fit=crop' },
    { id: 2, name: 'Glazed Ceramic Planters', category: 'Pottery & Terracotta', price: 890, stock: 28, sales: 1023, artisan: 'Ananya Sharma', img: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=100&h=100&fit=crop' },
    { id: 3, name: 'Sheesham Cooking Spoons', category: 'Wooden Crafts', price: 420, stock: 60, sales: 876, artisan: 'Ramesh Kumar', img: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=100&h=100&fit=crop' },
    { id: 4, name: 'Organic Bamboo Straws', category: 'Bamboo Products', price: 290, stock: 120, sales: 765, artisan: 'Meena Bai', img: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=100&h=100&fit=crop' },
    { id: 5, name: 'Filigree Silver Earrings', category: 'Handmade Jewelry', price: 1250, stock: 18, sales: 654, artisan: 'Sushma Devi', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100&h=100&fit=crop' }
  ]);

  // Sample Orders Data State
  const [ordersList, setOrdersList] = useState([
    { id: 'RR-94821', customer: 'Ramesh Patel', hub: 'Ramgarh Central Hub', amount: '1,299', status: 'Delivered to Hub', date: '2026-08-06', items: 'Seagrass Belly Basket (x2)' },
    { id: 'RR-94820', customer: 'Anita Verma', hub: 'Chandanpur Rural Hub', amount: '2,499', status: 'Dispatched', date: '2026-08-06', items: 'Glazed Ceramic Planters (x3)' },
    { id: 'RR-94819', customer: 'Suresh Yadav', hub: 'Kondapalli Hub', amount: '999', status: 'Pending Hub Arrival', date: '2026-08-05', items: 'Sheesham Spoons (x1)' },
    { id: 'RR-94818', customer: 'Pooja Singh', hub: 'Molela Hub', amount: '3,599', status: 'Delivered to Hub', date: '2026-08-05', items: 'Filigree Silver Earrings (x2)' },
    { id: 'RR-94817', customer: 'Manoj Patel', hub: 'Jorhat Hub', amount: '1,799', status: 'Processing', date: '2026-08-04', items: 'Organic Bamboo Straws (x5)' }
  ]);

  // Sample Artisans Data State
  const [artisansList] = useState([
    { id: 1, name: 'Lalitha Devi', location: 'Narsapur, Andhra Pradesh', craft: 'Seagrass Weaving', phone: '+91 98765 43210', productsCount: 20, rating: 4.9, avatar: 'L', color: '#2C5E3B' },
    { id: 2, name: 'Ananya Sharma', location: 'Jaipur, Rajasthan', craft: 'Blue Pottery & Terracotta', phone: '+91 98123 45678', productsCount: 20, rating: 4.8, avatar: 'A', color: '#D97706' },
    { id: 3, name: 'Ramesh Kumar', location: 'Tikamgarh, Madhya Pradesh', craft: 'Sheesham Wood Carving', phone: '+91 97654 32109', productsCount: 20, rating: 4.9, avatar: 'R', color: '#B91C1C' },
    { id: 4, name: 'Meena Bai', location: 'Guwahati, Assam', craft: 'Organic Bamboo Crafting', phone: '+91 96543 21098', productsCount: 20, rating: 4.7, avatar: 'M', color: '#047857' },
    { id: 5, name: 'Sushma Devi', location: 'Barmer, Rajasthan', craft: 'Traditional Block Printing', phone: '+91 95432 10987', productsCount: 20, rating: 4.9, avatar: 'S', color: '#6D28D9' }
  ]);

  // Sample Hubs Data State
  const [hubsList] = useState([
    { id: 1, name: 'Ramgarh Central Kendra', code: 'HUB-RAM-01', manager: 'Sunita Devi', state: 'Madhya Pradesh', pincode: '452001', activeOrders: 14 },
    { id: 2, name: 'Chandanpur Rural Hub', code: 'HUB-CHN-02', manager: 'Gupta General', state: 'Madhya Pradesh', pincode: '452002', activeOrders: 9 },
    { id: 3, name: 'Kondapalli Artisan Kendra', code: 'HUB-KND-03', manager: 'Maheshwar Rao', state: 'Andhra Pradesh', pincode: '521228', activeOrders: 11 },
    { id: 4, name: 'Molela Clay Hub', code: 'HUB-MOL-04', manager: 'Mohanlal Kumhar', state: 'Rajasthan', pincode: '313322', activeOrders: 7 }
  ]);

  // Dynamic Metrics depending on activeTimeframe
  const getMetrics = () => {
    if (activeTimeframe === 'Last Month') {
      return { orders: '1,106', catalog: '120', users: '10,715', revenue: '₹ 21,30,400' };
    }
    if (activeTimeframe === 'This Year') {
      return { orders: '14,890', catalog: '120', users: '12,345', revenue: '₹ 2.84 Cr' };
    }
    return { orders: '1,245', catalog: '120', users: '12,345', revenue: '₹ 25,68,345' };
  };

  const currentMetrics = getMetrics();

  // Handle Order Status Update
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrdersList(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrderModal && selectedOrderModal.id === orderId) {
      setSelectedOrderModal({ ...selectedOrderModal, status: newStatus });
    }
    showActionToast(`Order ${orderId} status updated to: ${newStatus}`);
  };

  // Helper Toast Alert
  const showActionToast = (msg: string) => {
    setActionSuccessBanner(msg);
    setTimeout(() => setActionSuccessBanner(''), 3000);
  };

  // Mark Notification Read
  const toggleNotificationRead = (id: number) => {
    setNotificationList(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const unreadCount = notificationList.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F6F0', fontFamily: "'Outfit', 'Inter', sans-serif" }}>
      
      {/* 1. RURALROOTS FOREST GREEN SIDEBAR */}
      <aside 
        style={{
          width: sidebarOpen ? '250px' : '76px',
          background: '#1E3E2B',
          color: '#FFFFFF',
          flexShrink: 0,
          transition: 'width 0.25s ease',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 100,
          boxShadow: '4px 0 20px rgba(0,0,0,0.06)'
        }}
      >
        {/* Brand Header */}
        <div 
          onClick={() => setActiveTab('OVERVIEW')}
          style={{
            height: '70px',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderBottom: '1px solid rgba(255,255,255,0.12)',
            background: '#152C1E',
            cursor: 'pointer'
          }}
        >
          <div 
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#C7A75C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#152C1E',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <Sprout size={22} />
          </div>
          {sidebarOpen && (
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Rural<span style={{ color: '#C7A75C' }}>Roots</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#A3B899', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Admin Portal
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Nav Items */}
        <nav style={{ flex: 1, padding: '18px 10px' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            
            {/* Tab 1: Dashboard Overview */}
            <li>
              <button 
                type="button"
                onClick={() => setActiveTab('OVERVIEW')} 
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: activeTab === 'OVERVIEW' ? '1px solid rgba(199, 167, 92, 0.5)' : 'none',
                  background: activeTab === 'OVERVIEW' ? 'rgba(199, 167, 92, 0.25)' : 'transparent',
                  color: activeTab === 'OVERVIEW' ? '#FFFFFF' : '#D1E2C9',
                  fontWeight: activeTab === 'OVERVIEW' ? 700 : 500,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <LayoutDashboard size={18} style={{ color: activeTab === 'OVERVIEW' ? '#C7A75C' : '#D1E2C9' }} />
                {sidebarOpen && <span>Dashboard Overview</span>}
              </button>
            </li>

            {/* Tab 2: Artisanal Products */}
            <li>
              <button 
                type="button"
                onClick={() => setActiveTab('PRODUCTS')} 
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: activeTab === 'PRODUCTS' ? '1px solid rgba(199, 167, 92, 0.5)' : 'none',
                  background: activeTab === 'PRODUCTS' ? 'rgba(199, 167, 92, 0.25)' : 'transparent',
                  color: activeTab === 'PRODUCTS' ? '#FFFFFF' : '#D1E2C9',
                  fontWeight: activeTab === 'PRODUCTS' ? 700 : 500,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Package size={18} style={{ color: activeTab === 'PRODUCTS' ? '#C7A75C' : '#D1E2C9' }} />
                  {sidebarOpen && <span>Artisanal Products</span>}
                </div>
                {sidebarOpen && <ChevronDown size={14} />}
              </button>
            </li>

            {/* Tab 3: Village Hub Orders */}
            <li>
              <button 
                type="button"
                onClick={() => setActiveTab('ORDERS')} 
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: activeTab === 'ORDERS' ? '1px solid rgba(199, 167, 92, 0.5)' : 'none',
                  background: activeTab === 'ORDERS' ? 'rgba(199, 167, 92, 0.25)' : 'transparent',
                  color: activeTab === 'ORDERS' ? '#FFFFFF' : '#D1E2C9',
                  fontWeight: activeTab === 'ORDERS' ? 700 : 500,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <ShoppingBag size={18} style={{ color: activeTab === 'ORDERS' ? '#C7A75C' : '#D1E2C9' }} />
                  {sidebarOpen && <span>Village Hub Orders</span>}
                </div>
                {sidebarOpen && <ChevronDown size={14} />}
              </button>
            </li>

            {/* Tab 4: Master Artisans */}
            <li>
              <button 
                type="button"
                onClick={() => setActiveTab('ARTISANS')} 
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: activeTab === 'ARTISANS' ? '1px solid rgba(199, 167, 92, 0.5)' : 'none',
                  background: activeTab === 'ARTISANS' ? 'rgba(199, 167, 92, 0.25)' : 'transparent',
                  color: activeTab === 'ARTISANS' ? '#FFFFFF' : '#D1E2C9',
                  fontWeight: activeTab === 'ARTISANS' ? 700 : 500,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Users size={18} style={{ color: activeTab === 'ARTISANS' ? '#C7A75C' : '#D1E2C9' }} />
                  {sidebarOpen && <span>Master Artisans</span>}
                </div>
                {sidebarOpen && <ChevronDown size={14} />}
              </button>
            </li>

            {/* Tab 5: Village Hubs */}
            <li>
              <button 
                type="button"
                onClick={() => setActiveTab('HUBS')} 
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: activeTab === 'HUBS' ? '1px solid rgba(199, 167, 92, 0.5)' : 'none',
                  background: activeTab === 'HUBS' ? 'rgba(199, 167, 92, 0.25)' : 'transparent',
                  color: activeTab === 'HUBS' ? '#FFFFFF' : '#D1E2C9',
                  fontWeight: activeTab === 'HUBS' ? 700 : 500,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Store size={18} style={{ color: activeTab === 'HUBS' ? '#C7A75C' : '#D1E2C9' }} />
                  {sidebarOpen && <span>Village Hubs (18)</span>}
                </div>
                {sidebarOpen && <ChevronDown size={14} />}
              </button>
            </li>

            {/* Tab 6: Craft Domains */}
            <li>
              <button 
                type="button"
                onClick={() => setActiveTab('CATEGORIES')} 
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: activeTab === 'CATEGORIES' ? '1px solid rgba(199, 167, 92, 0.5)' : 'none',
                  background: activeTab === 'CATEGORIES' ? 'rgba(199, 167, 92, 0.25)' : 'transparent',
                  color: activeTab === 'CATEGORIES' ? '#FFFFFF' : '#D1E2C9',
                  fontWeight: activeTab === 'CATEGORIES' ? 700 : 500,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Layers size={18} style={{ color: activeTab === 'CATEGORIES' ? '#C7A75C' : '#D1E2C9' }} />
                  {sidebarOpen && <span>Craft Domains</span>}
                </div>
                {sidebarOpen && <ChevronDown size={14} />}
              </button>
            </li>

            {/* Tab 7: Sales Analytics */}
            <li>
              <button 
                type="button"
                onClick={() => setActiveTab('ANALYTICS')} 
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: activeTab === 'ANALYTICS' ? '1px solid rgba(199, 167, 92, 0.5)' : 'none',
                  background: activeTab === 'ANALYTICS' ? 'rgba(199, 167, 92, 0.25)' : 'transparent',
                  color: activeTab === 'ANALYTICS' ? '#FFFFFF' : '#D1E2C9',
                  fontWeight: activeTab === 'ANALYTICS' ? 700 : 500,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <BarChart3 size={18} style={{ color: activeTab === 'ANALYTICS' ? '#C7A75C' : '#D1E2C9' }} />
                  {sidebarOpen && <span>Sales Analytics</span>}
                </div>
                {sidebarOpen && <ChevronDown size={14} />}
              </button>
            </li>

            {/* Tab 8: System Settings */}
            <li>
              <button 
                type="button"
                onClick={() => setActiveTab('SETTINGS')} 
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: activeTab === 'SETTINGS' ? '1px solid rgba(199, 167, 92, 0.5)' : 'none',
                  background: activeTab === 'SETTINGS' ? 'rgba(199, 167, 92, 0.25)' : 'transparent',
                  color: activeTab === 'SETTINGS' ? '#FFFFFF' : '#D1E2C9',
                  fontWeight: activeTab === 'SETTINGS' ? 700 : 500,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Settings size={18} style={{ color: activeTab === 'SETTINGS' ? '#C7A75C' : '#D1E2C9' }} />
                  {sidebarOpen && <span>System Settings</span>}
                </div>
                {sidebarOpen && <ChevronDown size={14} />}
              </button>
            </li>

          </ul>
        </nav>

        {/* Bottom Sign Out Button */}
        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#FCA5A5',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              borderRadius: '8px'
            }}
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* MAIN DASHBOARD CONTENT CONTAINER */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* TOP NAVBAR HEADER */}
        <header 
          style={{
            height: '70px',
            background: '#FFFFFF',
            borderBottom: '1px solid #E5E7EB',
            padding: '0 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: 'none', border: 'none', color: '#2C5E3B', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#1E3E2B', letterSpacing: '-0.01em' }}>
                RuralRoots Master Control Panel
              </h1>
              <div style={{ fontSize: '0.78rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={12} style={{ color: '#2C5E3B' }} />
                <span>Monitoring 18 Rural Village Hubs & 120 Artisanal Products</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
            
            {/* Interactive Notification Bell with Badge */}
            <div 
              onClick={() => setShowNotificationsModal(!showNotificationsModal)}
              style={{ position: 'relative', cursor: 'pointer', padding: '8px', background: '#F8F6F0', borderRadius: '50%', border: '1px solid #E5E7EB' }}
            >
              <Bell size={20} style={{ color: '#1E3E2B' }} />
              {unreadCount > 0 && (
                <span 
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    background: '#D97706',
                    color: '#FFFFFF',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #FFFFFF'
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </div>

            {/* Interactive Admin Profile Menu Toggle */}
            <div 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F8F6F0', padding: '6px 14px', borderRadius: '30px', border: '1px solid #E5E7EB', cursor: 'pointer' }}
            >
              <div 
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: '#2C5E3B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  fontSize: '0.85rem'
                }}
              >
                <ShieldCheck size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1E3E2B', lineHeight: 1.1 }}>
                  {user?.fullName || 'Vikramaditya Sharma'}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#6B7280' }}>Chief Administrator</span>
              </div>
              <ChevronDown size={14} style={{ color: '#6B7280' }} />
            </div>

          </div>

          {/* PROFILE DROPDOWN MENU */}
          {showProfileMenu && (
            <div 
              style={{
                position: 'absolute',
                right: '28px',
                top: '75px',
                width: '240px',
                background: '#FFFFFF',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                border: '1px solid #E5E7EB',
                padding: '8px',
                zIndex: 1000
              }}
            >
              <div style={{ padding: '10px 12px', borderBottom: '1px solid #F3F4F6', marginBottom: '4px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1E3E2B' }}>Vikramaditya Sharma</div>
                <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>admin@ruralroots.in</div>
              </div>

              <button 
                onClick={() => { setActiveTab('SETTINGS'); setShowProfileMenu(false); }}
                style={{ width: '100%', padding: '10px 12px', textAlign: 'left', background: 'none', border: 'none', fontSize: '0.86rem', fontWeight: 600, color: '#374151', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#F8F6F0'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
              >
                <Settings size={16} />
                <span>Admin Profile & Settings</span>
              </button>

              <button 
                onClick={handleLogout}
                style={{ width: '100%', padding: '10px 12px', textAlign: 'left', background: 'none', border: 'none', fontSize: '0.86rem', fontWeight: 600, color: '#DC2626', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#FEE2E2'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}

          {/* NOTIFICATIONS MODAL DROPDOWN */}
          {showNotificationsModal && (
            <div 
              style={{
                position: 'absolute',
                right: '180px',
                top: '75px',
                width: '320px',
                background: '#FFFFFF',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                border: '1px solid #E5E7EB',
                padding: '12px',
                zIndex: 1000
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', paddingBottom: '8px', borderBottom: '1px solid #F3F4F6' }}>
                <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1E3E2B' }}>System Alerts & Notices</span>
                <button onClick={() => setShowNotificationsModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}><X size={16} /></button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
                {notificationList.map((notif) => (
                  <div 
                    key={notif.id}
                    onClick={() => toggleNotificationRead(notif.id)}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      background: notif.read ? '#F9FAFB' : '#FEF3C7',
                      border: '1px solid #F3F4F6',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#1F2937', marginBottom: '2px' }}>{notif.title}</div>
                    <div style={{ fontSize: '0.78rem', color: '#4B5563', marginBottom: '4px' }}>{notif.msg}</div>
                    <div style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>{notif.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </header>

        {/* FEEDBACK ACTION TOAST */}
        {actionSuccessBanner && (
          <div style={{ background: '#D1FAE5', color: '#065F46', padding: '10px 24px', fontSize: '0.88rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} />
            <span>{actionSuccessBanner}</span>
          </div>
        )}

        {/* MAIN BODY CONTENT BASED ON ACTIVE TAB */}
        <main style={{ padding: '28px', overflowY: 'auto', flex: 1 }}>
          
          {/* TAB 1: OVERVIEW (Default View) */}
          {activeTab === 'OVERVIEW' && (
            <div>
              {/* ROW 1: 4 KPI METRIC TILES (Clickable to jump to tabs) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '22px', marginBottom: '28px' }}>
                
                <div 
                  onClick={() => setActiveTab('ORDERS')}
                  style={{ background: '#FFFFFF', padding: '22px', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer' }}
                >
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                      Total Village Orders
                    </div>
                    <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#1E3E2B', marginBottom: '8px' }}>{currentMetrics.orders}</div>
                    <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <TrendingUp size={14} />
                      <span>▲ 12.5%</span>
                      <span style={{ color: '#9CA3AF', fontWeight: 400 }}>from {activeTimeframe.toLowerCase()}</span>
                    </div>
                  </div>
                  <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
                    <ShoppingBag size={24} />
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('PRODUCTS')}
                  style={{ background: '#FFFFFF', padding: '22px', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer' }}
                >
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                      Catalog Products
                    </div>
                    <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#1E3E2B', marginBottom: '8px' }}>{currentMetrics.catalog}</div>
                    <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Sparkles size={14} />
                      <span>6 Domains</span>
                      <span style={{ color: '#9CA3AF', fontWeight: 400 }}>100% Unique</span>
                    </div>
                  </div>
                  <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
                    <Package size={24} />
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('ARTISANS')}
                  style={{ background: '#FFFFFF', padding: '22px', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer' }}
                >
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                      Artisans & Buyers
                    </div>
                    <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#1E3E2B', marginBottom: '8px' }}>{currentMetrics.users}</div>
                    <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <TrendingUp size={14} />
                      <span>▲ 15.2%</span>
                      <span style={{ color: '#9CA3AF', fontWeight: 400 }}>across 18 hubs</span>
                    </div>
                  </div>
                  <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C3AED' }}>
                    <Users size={24} />
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('ANALYTICS')}
                  style={{ background: '#FFFFFF', padding: '22px', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer' }}
                >
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                      Artisan Revenue
                    </div>
                    <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#1E3E2B', marginBottom: '8px' }}>{currentMetrics.revenue}</div>
                    <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <TrendingUp size={14} />
                      <span>▲ 20.5%</span>
                      <span style={{ color: '#9CA3AF', fontWeight: 400 }}>direct payouts</span>
                    </div>
                  </div>
                  <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#166534' }}>
                    <IndianRupee size={24} />
                  </div>
                </div>

              </div>

              {/* ROW 2: SALES OVERVIEW CHART + RECENT ORDERS TABLE */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '28px' }}>
                
                {/* Line Graph */}
                <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: '#1E3E2B' }}>Artisan Direct Sales Overview</h3>
                      <p style={{ fontSize: '0.78rem', color: '#6B7280', margin: 0 }}>Monthly revenue progression across rural handicraft orders</p>
                    </div>
                    <select 
                      value={activeTimeframe} 
                      onChange={(e) => setActiveTimeframe(e.target.value as any)}
                      style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.82rem', fontWeight: 600, color: '#1E3E2B', background: '#F8F6F0', cursor: 'pointer' }}
                    >
                      <option value="This Month">This Month</option>
                      <option value="Last Month">Last Month</option>
                      <option value="This Year">This Year</option>
                    </select>
                  </div>

                  <div style={{ position: 'relative', height: '220px', width: '100%' }}>
                    <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                      <line x1="0" y1="40" x2="500" y2="40" stroke="#F3F4F6" strokeDasharray="4" />
                      <line x1="0" y1="80" x2="500" y2="80" stroke="#F3F4F6" strokeDasharray="4" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="#F3F4F6" strokeDasharray="4" />
                      <line x1="0" y1="160" x2="500" y2="160" stroke="#F3F4F6" strokeDasharray="4" />

                      <text x="0" y="38" fill="#9CA3AF" fontSize="10">₹ 8L</text>
                      <text x="0" y="78" fill="#9CA3AF" fontSize="10">₹ 6L</text>
                      <text x="0" y="118" fill="#9CA3AF" fontSize="10">₹ 4L</text>
                      <text x="0" y="158" fill="#9CA3AF" fontSize="10">₹ 2L</text>
                      <text x="0" y="195" fill="#9CA3AF" fontSize="10">₹ 0</text>

                      <path 
                        d="M 30 150 L 70 135 L 110 120 L 150 130 L 190 138 L 230 110 L 270 130 L 310 115 L 350 120 L 390 100 L 430 110 L 470 70 L 490 50" 
                        fill="none" 
                        stroke="#2C5E3B" 
                        strokeWidth="3.5" 
                      />
                      <circle cx="490" cy="50" r="5" fill="#2C5E3B" stroke="#FFFFFF" strokeWidth="2" />
                      <circle cx="470" cy="70" r="4" fill="#2C5E3B" />
                      <circle cx="430" cy="110" r="4" fill="#2C5E3B" />
                      <circle cx="390" cy="100" r="4" fill="#2C5E3B" />
                      <circle cx="350" cy="120" r="4" fill="#2C5E3B" />
                      <circle cx="310" cy="115" r="4" fill="#2C5E3B" />
                    </svg>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 500 }}>
                      <span>1 May</span>
                      <span>5 May</span>
                      <span>10 May</span>
                      <span>15 May</span>
                      <span>20 May</span>
                      <span>25 May</span>
                      <span>30 May</span>
                    </div>
                  </div>
                </div>

                {/* Recent Orders Datatable */}
                <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: '#1E3E2B' }}>Recent Hub Pickups & Orders</h3>
                      <p style={{ fontSize: '0.78rem', color: '#6B7280', margin: 0 }}>Active orders being fulfilled across Village Hubs</p>
                    </div>
                    <button onClick={() => setActiveTab('ORDERS')} style={{ background: 'none', border: 'none', fontSize: '0.82rem', color: '#2C5E3B', fontWeight: 700, cursor: 'pointer' }}>View All Orders →</button>
                  </div>

                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '1.5px solid #F3F4F6', color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          <th style={{ padding: '10px 8px' }}>Order ID</th>
                          <th style={{ padding: '10px 8px' }}>Customer</th>
                          <th style={{ padding: '10px 8px' }}>Pickup Hub</th>
                          <th style={{ padding: '10px 8px' }}>Amount</th>
                          <th style={{ padding: '10px 8px', textAlign: 'right' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ordersList.map((ord) => (
                          <tr 
                            key={ord.id} 
                            onClick={() => setSelectedOrderModal(ord)} 
                            style={{ borderBottom: '1px solid #F9FAFB', cursor: 'pointer' }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            <td style={{ padding: '12px 8px', fontWeight: 700, color: '#1E3E2B' }}>{ord.id}</td>
                            <td style={{ padding: '12px 8px', color: '#374151' }}>{ord.customer}</td>
                            <td style={{ padding: '12px 8px', color: '#6B7280', fontSize: '0.8rem' }}>{ord.hub}</td>
                            <td style={{ padding: '12px 8px', fontWeight: 700, color: '#111827' }}>₹ {ord.amount}</td>
                            <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                              <span 
                                style={{ 
                                  padding: '4px 10px', 
                                  borderRadius: '12px', 
                                  fontSize: '0.74rem', 
                                  fontWeight: 700, 
                                  background: ord.status.includes('Delivered') ? '#D1FAE5' : ord.status.includes('Dispatched') ? '#DBEAFE' : '#FEF3C7', 
                                  color: ord.status.includes('Delivered') ? '#065F46' : ord.status.includes('Dispatched') ? '#1E40AF' : '#92400E' 
                                }}
                              >
                                {ord.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* ROW 3: CATEGORIES, PRODUCTS, ARTISANS & CHANNELS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
                
                {/* 1. Top Craft Domains */}
                <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: '#1E3E2B' }}>Top Craft Domains</h4>
                    <button onClick={() => setActiveTab('CATEGORIES')} style={{ background: 'none', border: 'none', fontSize: '0.78rem', color: '#2C5E3B', fontWeight: 700, cursor: 'pointer' }}>Catalog</button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {topCategories.map((cat, i) => (
                      <div 
                        key={i} 
                        onClick={() => { setSelectedCategoryFilter(cat.name); setActiveTab('PRODUCTS'); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                      >
                        <img src={cat.img} alt={cat.name} style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: '0.86rem', color: '#1F2937' }}>{cat.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{cat.count}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Top Selling Products */}
                <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: '#1E3E2B' }}>Top Artisanal Products</h4>
                    <button onClick={() => setActiveTab('PRODUCTS')} style={{ background: 'none', border: 'none', fontSize: '0.78rem', color: '#2C5E3B', fontWeight: 700, cursor: 'pointer' }}>View All</button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {productsList.map((prod) => (
                      <div 
                        key={prod.id} 
                        onClick={() => setSelectedProductModal(prod)}
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                      >
                        <img src={prod.img} alt={prod.name} style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: '0.86rem', color: '#1F2937' }}>{prod.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>{prod.sales} Sales</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Registered Master Artisans */}
                <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: '#1E3E2B' }}>Featured Artisans</h4>
                    <button onClick={() => setActiveTab('ARTISANS')} style={{ background: 'none', border: 'none', fontSize: '0.78rem', color: '#2C5E3B', fontWeight: 700, cursor: 'pointer' }}>Artisans</button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {artisansList.map((art) => (
                      <div 
                        key={art.id} 
                        onClick={() => setSelectedArtisanModal(art)}
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                      >
                        <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F8F6F0', color: art.color, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', border: '1px solid #E5E7EB' }}>
                          {art.avatar}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: '0.86rem', color: '#1F2937' }}>{art.name}</div>
                          <div style={{ fontSize: '0.74rem', color: '#6B7280' }}>{art.craft} • {art.location.split(',')[0]}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Sales by Channel Donut Chart */}
                <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0 0 16px 0', color: '#1E3E2B' }}>Fulfillment Channels</h4>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: '140px' }}>
                    <svg width="130" height="130" viewBox="0 0 42 42">
                      <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#E5E7EB" strokeWidth="6"></circle>
                      <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#2C5E3B" strokeWidth="6" strokeDasharray="55 45" strokeDashoffset="25"></circle>
                      <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#C7A75C" strokeWidth="6" strokeDasharray="30 70" strokeDashoffset="70"></circle>
                      <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#059669" strokeWidth="6" strokeDasharray="10 90" strokeDashoffset="40"></circle>
                      <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#D97706" strokeWidth="6" strokeDasharray="5 95" strokeDashoffset="30"></circle>
                    </svg>
                    <div style={{ position: 'absolute', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.68rem', color: '#6B7280', fontWeight: 600 }}>Total</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1E3E2B' }}>100%</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#4B5563' }}><span style={{ color: '#2C5E3B' }}>■</span> Direct Web Orders</span>
                      <span style={{ fontWeight: 700 }}>55%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#4B5563' }}><span style={{ color: '#C7A75C' }}>■</span> Village Hub Pickups</span>
                      <span style={{ fontWeight: 700 }}>30%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#4B5563' }}><span style={{ color: '#059669' }}>■</span> PWA Offline Sync</span>
                      <span style={{ fontWeight: 700 }}>10%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#4B5563' }}><span style={{ color: '#D97706' }}>■</span> Artisan Mela Stalls</span>
                      <span style={{ fontWeight: 700 }}>5%</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* TAB 2: ARTISANAL PRODUCTS MANAGEMENT */}
          {activeTab === 'PRODUCTS' && (
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#1E3E2B' }}>Artisanal Catalog Products</h2>
                  <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: 0 }}>Manage inventory, pricing, and master artisan assignments</p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="text" 
                    placeholder="Search product or artisan..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.86rem' }}
                  />
                  <select 
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.86rem', background: '#F8F6F0' }}
                  >
                    <option value="ALL">All Categories</option>
                    <option value="Handwoven Baskets">Handwoven Baskets</option>
                    <option value="Pottery & Terracotta">Pottery & Terracotta</option>
                    <option value="Wooden Crafts">Wooden Crafts</option>
                    <option value="Bamboo Products">Bamboo Products</option>
                    <option value="Handmade Jewelry">Handmade Jewelry</option>
                  </select>
                  <button 
                    onClick={() => setShowAddProductModal(true)}
                    className="btn-primary" 
                    style={{ padding: '8px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', fontWeight: 700 }}
                  >
                    <Plus size={16} />
                    <span>Add New Product</span>
                  </button>
                </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #F3F4F6', color: '#6B7280', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '12px 10px' }}>Product Info</th>
                    <th style={{ padding: '12px 10px' }}>Category</th>
                    <th style={{ padding: '12px 10px' }}>Master Artisan</th>
                    <th style={{ padding: '12px 10px' }}>Price</th>
                    <th style={{ padding: '12px 10px' }}>Stock</th>
                    <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productsList
                    .filter(p => selectedCategoryFilter === 'ALL' || p.category === selectedCategoryFilter)
                    .filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.artisan.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((prod) => (
                      <tr key={prod.id} style={{ borderBottom: '1px solid #F9FAFB' }}>
                        <td style={{ padding: '14px 10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={prod.img} alt={prod.name} style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }} />
                          <span style={{ fontWeight: 700, color: '#1E3E2B' }}>{prod.name}</span>
                        </td>
                        <td style={{ padding: '14px 10px', color: '#4B5563' }}>{prod.category}</td>
                        <td style={{ padding: '14px 10px', fontWeight: 600, color: '#2C5E3B' }}>{prod.artisan}</td>
                        <td style={{ padding: '14px 10px', fontWeight: 700 }}>₹ {prod.price}</td>
                        <td style={{ padding: '14px 10px' }}>
                          <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.76rem', fontWeight: 700, background: prod.stock < 20 ? '#FEE2E2' : '#D1FAE5', color: prod.stock < 20 ? '#991B1B' : '#065F46' }}>
                            {prod.stock} units
                          </span>
                        </td>
                        <td style={{ padding: '14px 10px', textAlign: 'right' }}>
                          <button 
                            onClick={() => setSelectedProductModal(prod)}
                            style={{ padding: '6px 12px', background: '#F8F6F0', border: '1px solid #E5E7EB', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', color: '#2C5E3B' }}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: VILLAGE HUB ORDERS */}
          {activeTab === 'ORDERS' && (
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#1E3E2B' }}>Village Hub Pickup Orders</h2>
                  <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: 0 }}>Full lifecycle tracking from artisan creation to hub pickup</p>
                </div>
                <button 
                  onClick={() => showActionToast('Refreshed latest orders from backend database.')}
                  style={{ padding: '8px 14px', background: '#F8F6F0', border: '1px solid #E5E7EB', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '0.85rem' }}
                >
                  <RefreshCw size={16} />
                  <span>Refresh Orders</span>
                </button>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #F3F4F6', color: '#6B7280', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '12px 10px' }}>Order ID</th>
                    <th style={{ padding: '12px 10px' }}>Customer Name</th>
                    <th style={{ padding: '12px 10px' }}>Designated Hub</th>
                    <th style={{ padding: '12px 10px' }}>Items Summary</th>
                    <th style={{ padding: '12px 10px' }}>Total Amount</th>
                    <th style={{ padding: '12px 10px', textAlign: 'right' }}>Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersList.map((ord) => (
                    <tr key={ord.id} style={{ borderBottom: '1px solid #F9FAFB' }}>
                      <td style={{ padding: '14px 10px', fontWeight: 800, color: '#1E3E2B' }}>{ord.id}</td>
                      <td style={{ padding: '14px 10px', color: '#374151' }}>{ord.customer}</td>
                      <td style={{ padding: '14px 10px', color: '#6B7280' }}>{ord.hub}</td>
                      <td style={{ padding: '14px 10px', fontSize: '0.82rem' }}>{ord.items}</td>
                      <td style={{ padding: '14px 10px', fontWeight: 700 }}>₹ {ord.amount}</td>
                      <td style={{ padding: '14px 10px', textAlign: 'right' }}>
                        <select 
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                          style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                        >
                          <option value="Delivered to Hub">Delivered to Hub</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Pending Hub Arrival">Pending Hub Arrival</option>
                          <option value="Processing">Processing</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 4: MASTER ARTISANS DIRECTORY */}
          {activeTab === 'ARTISANS' && (
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#1E3E2B' }}>Master Artisans Directory</h2>
                  <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: 0 }}>Empowering 120+ traditional rural craft masters across India</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {artisansList.map((art) => (
                  <div key={art.id} style={{ border: '1px solid #E5E7EB', borderRadius: '12px', padding: '18px', background: '#F8F6F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                      <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: art.color, color: '#FFFFFF', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {art.avatar}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '1rem', color: '#1E3E2B' }}>{art.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#D97706', fontWeight: 700 }}>{art.craft}</div>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: '#4B5563', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={14} style={{ color: '#2C5E3B' }} />
                        <span>{art.location}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Phone size={14} style={{ color: '#2C5E3B' }} />
                        <span>{art.phone}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedArtisanModal(art)}
                      style={{ width: '100%', padding: '8px', background: '#2C5E3B', color: '#FFFFFF', border: 'none', borderRadius: '6px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
                    >
                      View Artisan Profile & Products
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: VILLAGE HUBS MANAGER */}
          {activeTab === 'HUBS' && (
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#1E3E2B' }}>Village Pickup Hubs (18 Active)</h2>
                  <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: 0 }}>Decentralized last-mile rural collection and fulfillment points</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                {hubsList.map((hub) => (
                  <div key={hub.id} style={{ border: '1px solid #E5E7EB', borderRadius: '12px', padding: '18px', background: '#FFFFFF' }}>
                    <div style={{ fontSize: '0.76rem', color: '#D97706', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>{hub.code}</div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#1E3E2B', marginBottom: '8px' }}>{hub.name}</div>
                    <div style={{ fontSize: '0.82rem', color: '#4B5563', marginBottom: '12px' }}>
                      <strong>Manager:</strong> {hub.manager}<br />
                      <strong>State:</strong> {hub.state} (Pincode: {hub.pincode})
                    </div>
                    <div style={{ background: '#ECFDF5', color: '#065F46', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, display: 'inline-block' }}>
                      {hub.activeOrders} Active Pickups Pending
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CRAFT DOMAINS */}
          {activeTab === 'CATEGORIES' && (
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 16px 0', color: '#1E3E2B' }}>Artisanal Craft Domains (6 Categories)</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                {topCategories.map((cat, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => { setSelectedCategoryFilter(cat.name); setActiveTab('PRODUCTS'); }}
                    style={{ border: '1px solid #E5E7EB', borderRadius: '12px', padding: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F8F6F0'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
                  >
                    <img src={cat.img} alt={cat.name} style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1E3E2B' }}>{cat.name}</div>
                      <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700 }}>20 Master Products</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SALES ANALYTICS */}
          {activeTab === 'ANALYTICS' && (
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 16px 0', color: '#1E3E2B' }}>Financial & Revenue Analytics</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ background: '#F8F6F0', padding: '20px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 600 }}>Total Revenue Dispatched</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1E3E2B' }}>₹ 25,68,345</div>
                  <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700, marginTop: '6px' }}>100% Paid directly to rural artisan bank accounts</div>
                </div>
                <div style={{ background: '#F8F6F0', padding: '20px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 600 }}>Average Order Value</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1E3E2B' }}>₹ 2,062</div>
                  <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700, marginTop: '6px' }}>▲ 8.4% growth in basket value</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: SYSTEM SETTINGS */}
          {activeTab === 'SETTINGS' && (
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB', maxWidth: '600px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 16px 0', color: '#1E3E2B' }}>Platform & Security Settings</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Chief Administrator Email</label>
                  <input type="text" readOnly value="admin@ruralroots.in" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB', background: '#F9FAFB' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>PWA Offline Cache Refresh Interval</label>
                  <select style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}>
                    <option>5 minutes (Default)</option>
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                  </select>
                </div>
                <button onClick={() => showActionToast('System settings saved successfully.')} className="btn-primary" style={{ padding: '12px', borderRadius: '8px', fontWeight: 700 }}>
                  Save Platform Settings
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* 2. ORDER DETAILS MODAL */}
      {selectedOrderModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '16px' }}>
          <div style={{ background: '#FFFFFF', maxWidth: '440px', width: '100%', padding: '24px', borderRadius: '14px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#1E3E2B' }}>Order Details: {selectedOrderModal.id}</h3>
              <button onClick={() => setSelectedOrderModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ fontSize: '0.88rem', color: '#374151', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              <div><strong>Customer:</strong> {selectedOrderModal.customer}</div>
              <div><strong>Designated Hub:</strong> {selectedOrderModal.hub}</div>
              <div><strong>Items:</strong> {selectedOrderModal.items}</div>
              <div><strong>Amount:</strong> ₹ {selectedOrderModal.amount}</div>
              <div><strong>Current Status:</strong> <span style={{ fontWeight: 700, color: '#059669' }}>{selectedOrderModal.status}</span></div>
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button onClick={() => setSelectedOrderModal(null)} style={{ padding: '8px 16px', background: '#F8F6F0', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>Close</button>
              <button onClick={() => updateOrderStatus(selectedOrderModal.id, 'Delivered to Hub')} className="btn-primary" style={{ padding: '8px 16px', borderRadius: '6px' }}>Mark Delivered to Hub</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. PRODUCT EDIT MODAL */}
      {selectedProductModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '16px' }}>
          <div style={{ background: '#FFFFFF', maxWidth: '440px', width: '100%', padding: '24px', borderRadius: '14px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#1E3E2B' }}>Edit Product: {selectedProductModal.name}</h3>
              <button onClick={() => setSelectedProductModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Price (₹)</label>
                <input 
                  type="number" 
                  value={selectedProductModal.price} 
                  onChange={(e) => setSelectedProductModal({ ...selectedProductModal, price: Number(e.target.value) })}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Stock Quantity</label>
                <input 
                  type="number" 
                  value={selectedProductModal.stock} 
                  onChange={(e) => setSelectedProductModal({ ...selectedProductModal, stock: Number(e.target.value) })}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button onClick={() => setSelectedProductModal(null)} style={{ padding: '8px 16px', background: '#F8F6F0', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button 
                onClick={() => {
                  setProductsList(prev => prev.map(p => p.id === selectedProductModal.id ? selectedProductModal : p));
                  setSelectedProductModal(null);
                  showActionToast(`Product '${selectedProductModal.name}' updated!`);
                }} 
                className="btn-primary" 
                style={{ padding: '8px 16px', borderRadius: '6px' }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. ARTISAN PROFILE MODAL */}
      {selectedArtisanModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '16px' }}>
          <div style={{ background: '#FFFFFF', maxWidth: '440px', width: '100%', padding: '24px', borderRadius: '14px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#1E3E2B' }}>Master Artisan: {selectedArtisanModal.name}</h3>
              <button onClick={() => setSelectedArtisanModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ fontSize: '0.88rem', color: '#374151', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              <div><strong>Craft Mastery:</strong> {selectedArtisanModal.craft}</div>
              <div><strong>Region & State:</strong> {selectedArtisanModal.location}</div>
              <div><strong>Contact Number:</strong> {selectedArtisanModal.phone}</div>
              <div><strong>Total Catalog Products:</strong> {selectedArtisanModal.productsCount} Items</div>
              <div><strong>Customer Rating:</strong> ⭐ {selectedArtisanModal.rating} / 5.0</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setSelectedArtisanModal(null)} className="btn-primary" style={{ padding: '8px 16px', borderRadius: '6px' }}>Close Profile</button>
            </div>
          </div>
        </div>
      )}

      {/* 5. ADD PRODUCT MODAL */}
      {showAddProductModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '16px' }}>
          <div style={{ background: '#FFFFFF', maxWidth: '440px', width: '100%', padding: '24px', borderRadius: '14px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#1E3E2B' }}>Add New Artisanal Product</h3>
              <button onClick={() => setShowAddProductModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              setShowAddProductModal(false);
              showActionToast('New product added to catalog successfully!');
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                <input type="text" required placeholder="Product Title" style={{ padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
                <select style={{ padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }}>
                  <option>Handwoven Baskets</option>
                  <option>Pottery & Terracotta</option>
                  <option>Wooden Crafts</option>
                  <option>Bamboo Products</option>
                  <option>Handmade Jewelry</option>
                </select>
                <input type="number" required placeholder="Price (₹)" style={{ padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
                <input type="number" required placeholder="Stock Count" style={{ padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowAddProductModal(false)} style={{ padding: '8px 16px', background: '#F8F6F0', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ padding: '8px 16px', borderRadius: '6px' }}>Add Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
