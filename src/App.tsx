import { Route, Routes } from 'react-router-dom';
import ChatgaHomepage from './homepage.tsx';
import ShopPage from './Shop.tsx';
import AboutPage from './About.tsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatgaHomepage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}
