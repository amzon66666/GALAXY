import React, { createContext, useContext, useEffect, useState } from 'react';
import { CustomerReview, PaymentCard, SiteSettings, ValorantAccount } from '../types/store';
import { INITIAL_ACCOUNTS, INITIAL_PAYMENT_CARDS, INITIAL_REVIEWS, INITIAL_SETTINGS } from '../data/defaultData';

interface StoreContextType {
  accounts: ValorantAccount[];
  pendingAccounts: ValorantAccount[];
  paymentCards: PaymentCard[];
  reviews: CustomerReview[];
  settings: SiteSettings;
  isAdminLoggedIn: boolean;
  currency: 'IQD' | 'USD';
  currentOnlineCount: number;
  
  // Controls & Actions
  setCurrency: (c: 'IQD' | 'USD') => void;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  setOnlineCount: (count: number) => void;
  
  // Accounts
  approveAccount: (id: string) => void;
  rejectAccount: (id: string) => void;
  deleteAccount: (id: string) => void;
  updateAccount: (id: string, updated: Partial<ValorantAccount>) => void;
  addAccount: (account: Omit<ValorantAccount, 'id' | 'createdAt'>) => void;
  submitUserAccount: (account: Omit<ValorantAccount, 'id' | 'createdAt' | 'status'>) => void;
  
  // Payment Cards
  addPaymentCard: (card: Omit<PaymentCard, 'id'>) => void;
  updatePaymentCard: (id: string, card: Partial<PaymentCard>) => void;
  deletePaymentCard: (id: string) => void;
  
  // Reviews
  addReview: (review: Omit<CustomerReview, 'id' | 'date' | 'isApproved' | 'verified'>) => void;
  approveReview: (id: string) => void;
  deleteReview: (id: string) => void;
  
  // Reset
  resetToDefault: () => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

const STORAGE_KEYS = {
  ACCOUNTS: 'iq_val_accounts_v1',
  PENDING: 'iq_val_pending_v1',
  CARDS: 'iq_val_cards_v1',
  REVIEWS: 'iq_val_reviews_v1',
  SETTINGS: 'iq_val_settings_v1',
  ADMIN_AUTH: 'iq_val_admin_auth_v1',
  CURRENCY: 'iq_val_currency_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Accounts
  const [accounts, setAccounts] = useState<ValorantAccount[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
      return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS;
    } catch {
      return INITIAL_ACCOUNTS;
    }
  });

  // Pending user accounts
  const [pendingAccounts, setPendingAccounts] = useState<ValorantAccount[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PENDING);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Payment Cards
  const [paymentCards, setPaymentCards] = useState<PaymentCard[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CARDS);
      return saved ? JSON.parse(saved) : INITIAL_PAYMENT_CARDS;
    } catch {
      return INITIAL_PAYMENT_CARDS;
    }
  });

  // Customer Reviews
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Settings
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!saved) return INITIAL_SETTINGS;
      const parsed = JSON.parse(saved);
      if (parsed.ownerAvatarUrl === '/src/assets/images/valorant_account_radiant_1792779080968.jpg') {
        parsed.ownerAvatarUrl = INITIAL_SETTINGS.ownerAvatarUrl;
      }
      return { ...INITIAL_SETTINGS, ...parsed };
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // Admin auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Currency
  const [currency, setCurrencyState] = useState<'IQD' | 'USD'>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEYS.CURRENCY) as 'IQD' | 'USD') || 'IQD';
    } catch {
      return 'IQD';
    }
  });

  // Current live online count with slight subtle organic jitter
  const [currentOnlineCount, setCurrentOnlineCount] = useState<number>(settings.onlineCount);

  // Sync settings onlineCount change
  useEffect(() => {
    setCurrentOnlineCount(settings.onlineCount);
  }, [settings.onlineCount]);

  // Subtle organic fluctuation for live server experience
  useEffect(() => {
    if (!settings.onlineCountAutoJitter) return;
    const interval = setInterval(() => {
      // Delta between -2 and +3
      const delta = Math.floor(Math.random() * 6) - 2;
      setCurrentOnlineCount(prev => Math.max(1, prev + delta));
    }, 7000);
    return () => clearInterval(interval);
  }, [settings.onlineCountAutoJitter]);

  // Save to localStorage effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PENDING, JSON.stringify(pendingAccounts));
  }, [pendingAccounts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(paymentCards));
  }, [paymentCards]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, String(isAdminLoggedIn));
  }, [isAdminLoggedIn]);

  const setCurrency = (c: 'IQD' | 'USD') => {
    setCurrencyState(c);
    localStorage.setItem(STORAGE_KEYS.CURRENCY, c);
  };

  const loginAdmin = (password: string): boolean => {
    // Admin password check (supports 'admin', 'admin123', 'admin2026', or 'iraq')
    const validPasswords = ['admin', 'admin123', 'admin2026', 'iraq', 'valorant'];
    if (validPasswords.includes(password.trim().toLowerCase())) {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const setOnlineCount = (count: number) => {
    const validCount = Math.max(1, Math.round(count));
    setSettings(prev => ({ ...prev, onlineCount: validCount }));
    setCurrentOnlineCount(validCount);
  };

  // User submits an account for sale -> enters pending queue
  const submitUserAccount = (accountData: Omit<ValorantAccount, 'id' | 'createdAt' | 'status'>) => {
    const newAccount: ValorantAccount = {
      ...accountData,
      id: `pending-${Date.now()}`,
      status: 'pending_approval',
      createdAt: new Date().toISOString().split('T')[0],
      isStoreVerified: false,
    };
    setPendingAccounts(prev => [newAccount, ...prev]);
  };

  // Admin approves a pending account -> moves to public accounts
  const approveAccount = (id: string) => {
    const account = pendingAccounts.find(a => a.id === id);
    if (account) {
      const approvedAccount: ValorantAccount = {
        ...account,
        status: 'available',
      };
      setAccounts(prev => [approvedAccount, ...prev]);
      setPendingAccounts(prev => prev.filter(a => a.id !== id));
    }
  };

  const rejectAccount = (id: string) => {
    setPendingAccounts(prev => prev.filter(a => a.id !== id));
  };

  const deleteAccount = (id: string) => {
    setAccounts(prev => prev.filter(a => a.id !== id));
    setPendingAccounts(prev => prev.filter(a => a.id !== id));
  };

  const updateAccount = (id: string, updated: Partial<ValorantAccount>) => {
    setAccounts(prev =>
      prev.map(acc => (acc.id === id ? { ...acc, ...updated } : acc))
    );
    setPendingAccounts(prev =>
      prev.map(acc => (acc.id === id ? { ...acc, ...updated } : acc))
    );
  };

  const addAccount = (accountData: Omit<ValorantAccount, 'id' | 'createdAt'>) => {
    const newAccount: ValorantAccount = {
      ...accountData,
      id: `val-iq-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAccounts(prev => [newAccount, ...prev]);
  };

  // Payment Cards management
  const addPaymentCard = (cardData: Omit<PaymentCard, 'id'>) => {
    const newCard: PaymentCard = {
      ...cardData,
      id: `pay-${Date.now()}`,
    };
    setPaymentCards(prev => [...prev, newCard]);
  };

  const updatePaymentCard = (id: string, cardData: Partial<PaymentCard>) => {
    setPaymentCards(prev =>
      prev.map(c => (c.id === id ? { ...c, ...cardData } : c))
    );
  };

  const deletePaymentCard = (id: string) => {
    setPaymentCards(prev => prev.filter(c => c.id !== id));
  };

  // Reviews
  const addReview = (reviewData: Omit<CustomerReview, 'id' | 'date' | 'isApproved' | 'verified'>) => {
    const newReview: CustomerReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'اليوم',
      verified: true,
      isApproved: true, // Auto-visible with ability for admin to moderate
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const approveReview = (id: string) => {
    setReviews(prev =>
      prev.map(r => (r.id === id ? { ...r, isApproved: true } : r))
    );
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const resetToDefault = () => {
    setAccounts(INITIAL_ACCOUNTS);
    setPendingAccounts([]);
    setPaymentCards(INITIAL_PAYMENT_CARDS);
    setReviews(INITIAL_REVIEWS);
    setSettings(INITIAL_SETTINGS);
    setCurrentOnlineCount(INITIAL_SETTINGS.onlineCount);
    localStorage.clear();
  };

  return (
    <StoreContext.Provider
      value={{
        accounts,
        pendingAccounts,
        paymentCards,
        reviews,
        settings,
        isAdminLoggedIn,
        currency,
        currentOnlineCount,
        setCurrency,
        loginAdmin,
        logoutAdmin,
        updateSettings,
        setOnlineCount,
        approveAccount,
        rejectAccount,
        deleteAccount,
        updateAccount,
        addAccount,
        submitUserAccount,
        addPaymentCard,
        updatePaymentCard,
        deletePaymentCard,
        addReview,
        approveReview,
        deleteReview,
        resetToDefault,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
