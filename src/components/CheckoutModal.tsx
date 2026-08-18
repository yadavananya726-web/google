import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Printer,
  ShoppingBag,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CheckoutFormData, OrderConfirmation } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTax,
    cartTotal,
    placeOrder,
    navigateTo,
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);

  const [formData, setFormData] = useState<CheckoutFormData>({
    email: 'developer@google.dev',
    firstName: 'Alex',
    lastName: 'Morgan',
    address: '1600 Amphitheatre Parkway',
    apartment: 'Bldg 43',
    city: 'Mountain View',
    state: 'CA',
    zipCode: '94043',
    country: 'United States',
    shippingMethod: 'standard',
    paymentMethod: 'gpay',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
    saveInfo: true,
  });

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) {
      const order = placeOrder(formData);
      setConfirmedOrder(order);
      setStep(4);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleCloseAndFinish = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setConfirmedOrder(null);
    navigateTo('home');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-[#FAF8F5] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E8E2D6] overflow-hidden my-6">
        {/* Header */}
        <div className="p-5 border-b border-[#E8E2D6] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E5B82]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#C85A3F]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#D48B38]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B6B4A]"></span>
            </div>
            <span className="font-extrabold text-sm text-[#27231F] font-heading">
              Google Merch <span className="font-light text-[#8A8174]">Secure Checkout</span>
            </span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-[#8A8174] hover:text-[#27231F] rounded-lg hover:bg-[#F2ECE1] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (Steps 1-3) */}
        {step < 4 && (
          <div className="px-6 py-3 bg-[#F5F1E8] border-b border-[#E8E2D6] flex items-center justify-between text-xs font-semibold text-[#8A8174]">
            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  step >= 1 ? 'bg-[#2E5B82] text-white' : 'bg-[#DDD5C7] text-[#5C5449]'
                }`}
              >
                1
              </span>
              <span className={step === 1 ? 'text-[#2E5B82] font-bold' : ''}>Shipping Address</span>
            </div>
            <span className="text-[#DDD5C7]">→</span>
            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  step >= 2 ? 'bg-[#2E5B82] text-white' : 'bg-[#DDD5C7] text-[#5C5449]'
                }`}
              >
                2
              </span>
              <span className={step === 2 ? 'text-[#2E5B82] font-bold' : ''}>Delivery Speed</span>
            </div>
            <span className="text-[#DDD5C7]">→</span>
            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  step >= 3 ? 'bg-[#2E5B82] text-white' : 'bg-[#DDD5C7] text-[#5C5449]'
                }`}
              >
                3
              </span>
              <span className={step === 3 ? 'text-[#2E5B82] font-bold' : ''}>Simulated Payment</span>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="p-6 sm:p-8">
          {/* STEP 1: Address */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <h3 className="text-base font-bold text-[#27231F] font-heading">
                Contact & Shipping Details
              </h3>

              <div>
                <label className="text-xs font-semibold text-[#27231F] block mb-1">
                  Email Address for Tracking
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD5C7] text-[#27231F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E5B82]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#27231F] block mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD5C7] text-[#27231F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E5B82]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#27231F] block mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD5C7] text-[#27231F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E5B82]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#27231F] block mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD5C7] text-[#27231F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E5B82]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#27231F] block mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD5C7] text-[#27231F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E5B82]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#27231F] block mb-1">
                    State / Region
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD5C7] text-[#27231F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E5B82]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#27231F] block mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD5C7] text-[#27231F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E5B82]"
                  />
                </div>
              </div>

              {/* Order total preview */}
              <div className="p-3 bg-[#EFE8DC] rounded-xl flex items-center justify-between text-xs">
                <span className="text-[#5C5449]">Cart Total ({cart.length} items):</span>
                <span className="font-bold text-[#27231F] font-heading">${cartTotal.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#24201D] hover:bg-[#3D3631] text-[#FAF8F5] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Continue to Shipping Method</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: Shipping Method */}
          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <h3 className="text-base font-bold text-[#27231F] font-heading">
                Choose Delivery Speed
              </h3>

              <div className="space-y-2.5">
                {[
                  {
                    id: 'standard',
                    title: 'Standard Carbon-Neutral Delivery',
                    time: '3–5 Business Days',
                    price: cartSubtotal >= 50 ? 'FREE' : '$5.00',
                  },
                  {
                    id: 'express',
                    title: 'Expedited Courier Air',
                    time: '2–3 Business Days',
                    price: '$12.00',
                  },
                  {
                    id: 'overnight',
                    title: 'Priority Overnight (Next Business Day)',
                    time: 'Guaranteed Tomorrow by 5 PM',
                    price: '$22.00',
                  },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.shippingMethod === opt.id
                        ? 'border-[#2E5B82] bg-[#EAF0F6]'
                        : 'border-[#DDD5C7] hover:border-[#8A8174] bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={opt.id}
                        checked={formData.shippingMethod === opt.id}
                        onChange={handleInputChange}
                        className="text-[#2E5B82] focus:ring-[#2E5B82] w-4 h-4"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#27231F]">{opt.title}</p>
                        <p className="text-[11px] text-[#5C5449]">{opt.time}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#27231F] font-heading">
                      {opt.price}
                    </span>
                  </label>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 bg-[#EFE8DC] hover:bg-[#E5DCCF] text-[#27231F] text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-[#24201D] hover:bg-[#3D3631] text-[#FAF8F5] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Payment */}
          {step === 3 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#27231F] font-heading">
                  Simulated Payment Method
                </h3>
                <span className="text-[11px] font-semibold text-[#3B6B4A] bg-[#EAF2EC] border border-[#BEDBC3] px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Demo Mode — No real charge</span>
                </span>
              </div>

              {/* Payment selector */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'gpay' }))}
                  className={`p-3 rounded-xl border-2 text-center text-xs font-bold transition-all cursor-pointer ${
                    formData.paymentMethod === 'gpay'
                      ? 'border-[#2E5B82] bg-[#EAF0F6] text-[#1A3854]'
                      : 'border-[#DDD5C7] bg-white text-[#5C5449]'
                  }`}
                >
                  Google Pay
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'card' }))}
                  className={`p-3 rounded-xl border-2 text-center text-xs font-bold transition-all cursor-pointer ${
                    formData.paymentMethod === 'card'
                      ? 'border-[#2E5B82] bg-[#EAF0F6] text-[#1A3854]'
                      : 'border-[#DDD5C7] bg-white text-[#5C5449]'
                  }`}
                >
                  Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'shoppay' }))}
                  className={`p-3 rounded-xl border-2 text-center text-xs font-bold transition-all cursor-pointer ${
                    formData.paymentMethod === 'shoppay'
                      ? 'border-[#2E5B82] bg-[#EAF0F6] text-[#1A3854]'
                      : 'border-[#DDD5C7] bg-white text-[#5C5449]'
                  }`}
                >
                  Shop Pay
                </button>
              </div>

              {/* Mock card preview */}
              <div className="p-4 bg-white rounded-2xl border border-[#E8E2D6] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#27231F]">
                    {formData.paymentMethod === 'gpay' ? 'Linked Google Account' : 'Card Details'}
                  </span>
                  <CreditCard className="w-4 h-4 text-[#8A8174]" />
                </div>
                <input
                  type="text"
                  disabled
                  value="4242 •••• •••• 4242 (Test Gateway)"
                  className="w-full px-3 py-2 text-xs bg-[#F5F1E8] border border-[#DDD5C7] rounded-xl text-[#5C5449]"
                />
              </div>

              {/* Final calculation row */}
              <div className="p-4 bg-[#24201D] text-[#FAF8F5] rounded-2xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#DDD5C7] block">Total Due:</span>
                  <span className="text-lg font-bold font-heading text-[#FAF8F5]">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <span className="text-[11px] text-[#BEDBC3]">Carbon-Neutral Protected</span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-3 bg-[#EFE8DC] hover:bg-[#E5DCCF] text-[#27231F] text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-[#24201D] hover:bg-[#3D3631] text-[#FAF8F5] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Authorize & Place Mock Order</span>
                  <CheckCircle2 className="w-4 h-4 text-[#BEDBC3]" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Order Confirmation & Receipt */}
          {step === 4 && confirmedOrder && (
            <div className="text-center space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-[#EAF2EC] text-[#3B6B4A] border border-[#BEDBC3] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#3B6B4A]">
                  Order Successfully Placed!
                </span>
                <h3 className="text-2xl font-extrabold text-[#27231F] font-heading mt-1">
                  Thank You, {confirmedOrder.shippingAddress.name}!
                </h3>
                <p className="text-xs text-[#5C5449] mt-1">
                  Order Reference: <strong className="text-[#27231F] font-mono">{confirmedOrder.orderId}</strong>
                </p>
                <p className="text-xs text-[#5C5449]">
                  A confirmation email with real-time tracking has been sent to {formData.email}.
                </p>
              </div>

              {/* Receipt Summary Box */}
              <div className="p-4 bg-white rounded-2xl border border-[#E8E2D6] text-left space-y-3 text-xs">
                <div className="flex justify-between border-b border-[#E8E2D6] pb-2">
                  <span className="text-[#5C5449]">Estimated Delivery:</span>
                  <strong className="text-[#27231F]">{confirmedOrder.estimatedDelivery}</strong>
                </div>

                <div className="flex justify-between border-b border-[#E8E2D6] pb-2">
                  <span className="text-[#5C5449]">Shipping To:</span>
                  <span className="text-[#27231F] font-medium text-right">
                    {confirmedOrder.shippingAddress.address}, {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.state} {confirmedOrder.shippingAddress.zipCode}
                  </span>
                </div>

                <div className="flex justify-between pt-1">
                  <span className="text-[#5C5449] font-bold">Total Paid:</span>
                  <span className="text-base font-extrabold text-[#27231F] font-heading">
                    ${confirmedOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={handlePrintReceipt}
                  className="w-full sm:w-auto flex-1 py-3 px-4 bg-[#EFE8DC] hover:bg-[#E5DCCF] text-[#27231F] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>

                <button
                  onClick={handleCloseAndFinish}
                  className="w-full sm:w-auto flex-1 py-3 px-4 bg-[#24201D] hover:bg-[#3D3631] text-[#FAF8F5] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
