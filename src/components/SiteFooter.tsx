export default function SiteFooter() {
  return (
    <footer className="bg-[#1C1917] px-[clamp(1.25rem,5vw,5rem)] py-16 text-white">
      <div className="mx-auto w-full">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <h4 className="mb-4 text-sm font-semibold">Stay Connected</h4>
            <p className="mb-4 text-sm font-normal text-[#A8A29E]">
              Subscribe to receive updates on new arrivals and exclusive offers.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded bg-[#292524] px-4 py-3 text-sm font-normal text-white outline-none"
            />
          </div>
          <div>
            <h4 className="mb-4 text-[13px] font-medium">Shop</h4>
            <ul className="space-y-3">
              {['Women', 'Men', 'Accessories', 'New Arrivals', 'Sale'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm font-normal text-[#A8A29E]">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-[13px] font-medium">About</h4>
            <ul className="space-y-3">
              {['Our Story', 'Careers', 'Sustainability', 'Press', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm font-normal text-[#A8A29E]">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-[13px] font-medium">Support</h4>
            <ul className="space-y-3">
              {['Shipping & Returns', 'Size Guide', 'Care Instructions', 'FAQ', 'Track Order'].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="text-sm font-normal text-[#A8A29E]">
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 border-t border-[#292524] pt-8 sm:flex-row sm:items-center">
          <p className="text-sm font-normal text-[#A8A29E]">© 2024 Chatga. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-sm font-normal text-[#A8A29E]">Visa</span>
            <span className="text-sm font-normal text-[#A8A29E]">Mastercard</span>
            <span className="text-sm font-normal text-[#A8A29E]">Amex</span>
            <span className="text-sm font-normal text-[#A8A29E]">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
