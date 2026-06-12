import { IoLogoInstagram } from 'react-icons/io5';
import { MdOutlineCheckroom } from 'react-icons/md';
import { GiShirt, GiConverseShoe } from 'react-icons/gi';
import { IoBagHandleOutline } from 'react-icons/io5';
import SiteHeader from './components/SiteHeader.tsx';
import SiteFooter from './components/SiteFooter.tsx';
import { useCart } from './context/CartContext.tsx';


export default function ChatgaHomepage() {
  const { addItem } = useCart();
  const categories = [
    { icon: MdOutlineCheckroom, label: 'Outerwear' },
    { icon: GiShirt, label: 'Knitwear' },
    { icon: IoBagHandleOutline, label: 'Accessories' },
    { icon: GiConverseShoe, label: 'Footwear' },
  ];
  const products = [
    {
      id: 'home-cashmere-turtleneck',
      brand: 'Maison Margiela',
      title: 'Cashmere Blend Turtleneck',
      price: '$485',
      priceValue: 485,
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=500&fit=crop',
    },
    {
      id: 'home-wool-blazer',
      brand: 'Lemaire',
      title: 'Oversized Wool Blazer',
      price: '$890',
      priceValue: 890,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop',
    },
    {
      id: 'home-silk-blouse',
      brand: 'The Row',
      title: 'Silk Crepe Blouse',
      price: '$650',
      priceValue: 650,
      image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=400&h=500&fit=crop',
    },
    {
      id: 'home-leather-bag',
      brand: 'Bottega Veneta',
      title: 'Leather Shoulder Bag',
      price: '$2,450',
      priceValue: 2450,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop',
    },

  ];
  const socialImages = [
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=120&h=120&fit=crop',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=120&h=120&fit=crop',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=120&h=120&fit=crop',
    'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=120&h=120&fit=crop',
  ];

  return (
    <div className="mx-auto min-h-screen w-full bg-[#FAFAF9] font-['Inter']">
      <SiteHeader />

      <section className="relative min-h-[min(100vh,37.5rem)] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1440&h=600&fit=crop"
          alt="Spring Collection 2024"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
        <div className="relative flex min-h-[min(100vh,37.5rem)] items-center px-[clamp(1.5rem,8vw,6rem)]">
          <div className="max-w-xl">
            <p className="mb-4 font-medium text-[13px] tracking-[0.12em] text-[#A8A29E]">SPRING COLLECTION 2024</p>
            <h1 className="mb-6 text-[clamp(2.5rem,8vw,4rem)] font-bold leading-[1.1] text-[#1C1917]">
              Effortless Elegance
            </h1>
            <p className="mb-8 text-lg font-normal text-[#57534E]">Curated pieces for the modern wardrobe</p>
            <button
              type="button"
              className="rounded bg-[#292524] px-10 py-4 text-[15px] font-medium text-white"
            >
              Explore Collection
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="flex flex-wrap items-center justify-center gap-[clamp(1.5rem,4vw,3rem)] px-4">
          {categories.map((category) => (
            <div key={category.label} className="flex flex-col items-center">
              <div className="mb-3 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-[#F5F5F4]">
                <category.icon className="h-8 w-8 text-[#57534E]" />
              </div>
              <span className="text-sm font-medium text-[#1C1917]">{category.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-[clamp(1.25rem,5vw,5rem)] py-20">
        <h2 className="mb-8 text-center text-[clamp(1.5rem,4vw,2rem)] font-semibold text-[#1C1917]">
          Featured Selection
        </h2>
        <div className="grid grid-cols-2 gap-[clamp(0.75rem,2vw,1.5rem)] lg:grid-cols-4">
            {products.map((product) => (
            <div key={product.id} className="group min-w-0">
              <div className="relative mb-6 aspect-[4/5] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="mb-1 text-[13px] font-medium text-[#57534E]">{product.brand}</p>
                <p className="mb-2 text-[15px] font-normal text-[#1C1917]">{product.title}</p>
                <p className="text-[15px] font-semibold text-[#1C1917]">{product.price}</p>
                <button
                  type="button"
                  onClick={() =>
                    addItem({
                      id: product.id,
                      name: `${product.brand} ${product.title}`,
                      price: product.priceValue,
                      image: product.image,
                    })
                  }
                  className="mt-4 w-full border border-[#1C1917] bg-transparent py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-[#1C1917] transition-colors duration-300 hover:bg-[#1C1917] hover:text-white"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid min-h-[min(100vh,30rem)] grid-cols-1 lg:grid-cols-5">
        <div className="flex flex-col justify-center bg-[#F5F5F4] p-[clamp(2rem,5vw,4rem)] lg:col-span-2">
          <p className="mb-4 text-xs font-medium tracking-[0.12em] text-[#78716C]">THE JOURNAL</p>
          <h2 className="mb-6 text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-[1.2] text-[#1C1917]">
            Timeless Craftsmanship
          </h2>
          <p className="mb-6 text-base font-normal leading-relaxed text-[#57534E]">
            Every piece in our collection tells a story of dedication, precision, and artistry. We partner with
            Chatgas that have perfected their craft over generations, ensuring that each garment meets the highest
            standards of quality and design.
          </p>
          <p className="mb-6 text-base font-normal leading-relaxed text-[#57534E]">
            From the careful selection of materials to the final stitch, our commitment to excellence is evident in
            every detail. Discover the art of slow fashion and invest in pieces that transcend seasons.
          </p>
          <a href="#" className="text-sm font-medium text-[#1C1917] underline">
            Read More
          </a>
        </div>
        <div className="bg-white p-4 lg:col-span-3">
          <div className="h-full border border-[#E7E5E4] p-4">
            <img
              src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=900&h=480&fit=crop&auto=format"
              alt="Artisan craftsmanship"
              className="h-full min-h-[16rem] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="text-center">
          <h3 className="mb-8 text-xl font-semibold text-[#1C1917]">Join Our Community</h3>
          <div className="mb-6 flex flex-wrap items-center justify-center gap-[clamp(0.75rem,2vw,1.5rem)] px-4">
            {socialImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Community ${index + 1}`}
                className="aspect-square w-[min(30vw,7.5rem)] object-cover rounded-lg"
              />
            ))}
          </div>
          <IoLogoInstagram className="mx-auto mb-2 h-6 w-6 text-[#57534E]" />
          <p className="text-sm font-medium text-[#1C1917]">@Chatga</p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
