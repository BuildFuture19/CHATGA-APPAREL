import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '../context/CartContext.tsx';

function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
  } = useCart();

  const close = useCallback(() => setIsCartOpen(false), [setIsCartOpen]);

  useEffect(() => {
    if (!isCartOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isCartOpen, close]);

  const isEmpty = cart.length === 0;

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] ${isCartOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!isCartOpen}
    >
      {/* Backdrop */}
      <button
        type="button"
        tabIndex={isCartOpen ? 0 : -1}
        aria-label="Close shopping bag"
        onClick={close}
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out motion-reduce:transition-none ${
          isCartOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel */}
      <aside
        id="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className={`absolute right-0 top-0 grid h-dvh w-full grid-rows-[auto_1fr_auto] bg-[#FAFAF9] text-[#1C1917] shadow-[0_0_48px_rgba(28,25,23,0.12)] transition-transform duration-300 ease-out motion-reduce:transition-none sm:w-[450px] ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#E7E5E4] px-6 py-5 sm:px-8">
          <h2
            id="cart-drawer-title"
            className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#1C1917]"
          >
            Shopping Bag
          </h2>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="flex h-10 w-10 items-center justify-center text-[22px] font-light leading-none text-[#78716C] transition-colors duration-300 hover:text-[#1C1917]"
            aria-label="Close shopping bag"
          >
            ×
          </button>
        </header>

        {/* Scrollable body */}
        <div className="min-h-0 overflow-y-auto overscroll-contain px-6 py-8 sm:px-8">
          {isEmpty ? (
            <div className="flex min-h-full flex-col items-center justify-center py-16 text-center">
              <p className="max-w-[18rem] text-[15px] font-light leading-relaxed text-[#78716C]">
                Your bag is currently empty.
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="mt-10 border border-[#1C1917] bg-transparent px-10 py-3.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#1C1917] transition-colors duration-300 hover:bg-[#1C1917] hover:text-white"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-[#E7E5E4]/70">
              {cart.map((line) => {
                const lineTotal = line.price * line.quantity;

                return (
                  <li key={line.id} className="flex gap-5 py-7 first:pt-0 last:pb-0">
                    <div className="h-[88px] w-[68px] shrink-0 overflow-hidden bg-[#F5F5F4]">
                      {line.image ? (
                        <img
                          src={line.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 pr-2">
                          <p className="text-[13px] font-medium leading-snug text-[#1C1917]">
                            {line.name}
                          </p>
                          {line.size ? (
                            <p className="mt-1.5 text-[10px] font-light uppercase tracking-[0.08em] text-[#A8A29E]">
                              Size {line.size}
                            </p>
                          ) : null}
                        </div>
                        <p className="shrink-0 text-[13px] font-medium tabular-nums text-[#1C1917]">
                          {formatPrice(lineTotal)}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-3">
                        <div className="inline-flex items-stretch border border-[#D6D3D1]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(line.id, -1)}
                            className="flex h-9 w-9 items-center justify-center text-lg font-light text-[#44403C] transition-colors hover:bg-[#F5F5F4] hover:text-[#1C1917]"
                            aria-label={`Decrease quantity of ${line.name}`}
                          >
                            −
                          </button>
                          <span className="flex min-w-[2.25rem] items-center justify-center border-x border-[#D6D3D1] px-2 text-[12px] font-medium tabular-nums text-[#1C1917]">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(line.id, 1)}
                            className="flex h-9 w-9 items-center justify-center text-lg font-light text-[#44403C] transition-colors hover:bg-[#F5F5F4] hover:text-[#1C1917]"
                            aria-label={`Increase quantity of ${line.name}`}
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(line.id)}
                          className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#A8A29E] underline-offset-4 transition-colors hover:text-[#1C1917] hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {!isEmpty ? (
          <footer className="border-t border-[#E7E5E4] bg-[#FAFAF9] px-6 py-6 sm:px-8">
            <div className="mb-5 flex items-baseline justify-between">
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#78716C]">
                Subtotal
              </span>
              <span className="text-[16px] font-semibold tabular-nums text-[#1C1917]">
                {formatPrice(subtotal)}
              </span>
            </div>
            <button
              type="button"
              className="w-full bg-[#1C1917] py-4 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-[#292524]"
            >
              Proceed to Checkout
            </button>
          </footer>
        ) : null}
      </aside>
    </div>,
    document.body,
  );
}
