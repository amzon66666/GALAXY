import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Lock, X, KeyRound, AlertCircle, CheckCircle2, Shield } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  if (!isOpen) return null;

  const { loginAdmin } = useStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      setError(false);
      onSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  const handleQuickDemoLogin = () => {
    loginAdmin('admin');
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-neutral-900 shadow-[8px_8px_0_0_#000000] w-full max-w-md p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute left-4 top-4 p-1.5 border border-neutral-900 bg-white hover:bg-neutral-100 text-neutral-900"
          aria-label="إغلاق"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 bg-neutral-950 text-white border-2 border-black flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-xl font-black text-neutral-950">
            تسجيل دخول إدارة متجر فالورانت
          </h3>
          <p className="text-xs text-neutral-500 font-medium">
            يتطلب تسجيل دخول الآدمن لتعديل الموقع، الموافقة على الحسابات، وإضافة كروت الدفع
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-500 text-red-700 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>كلمة المرور غير صحيحة. جرب كلمة المرور الافتراضية: admin</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-neutral-700 block mb-1">
              كلمة مرور الآدمن (Admin Password):
            </label>
            <div className="relative">
              <KeyRound className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="password"
                required
                placeholder="أدخل كلمة المرور..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="w-full pr-10 pl-3 py-2.5 text-xs border-2 border-neutral-900 bg-neutral-50 font-bold focus:bg-white"
              />
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">
              كلمة المرور الافتراضية: <span className="font-mono font-bold text-neutral-800">admin</span>
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-neutral-950 text-white font-black text-xs border-2 border-black hover:bg-neutral-800 transition-colors shadow-[2px_2px_0_0_#000000]"
            >
              تسجيل الدخول للوحة التحكم
            </button>

            {/* Quick Demo One-Click Login Button for convenience */}
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-xs border border-neutral-900 transition-colors flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>دخول تجريبي فوري بنقرة واحدة (Demo Mode)</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
