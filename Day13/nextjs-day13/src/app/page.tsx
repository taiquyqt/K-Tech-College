import Header from "./pages/Header";
import Image from "next/image";
import Product from "./pages/Product";
import { Suspense } from "react";

// Loading skeleton cho Product component
const ProductSkeleton = () => (
  <div className="animate-pulse p-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
      ))}
    </div>
  </div>
);

const App = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="pt-6 flex justify-center" aria-label="Banner chính">
        <div className="relative w-full max-w-4xl px-4">
          <Image 
            src="/banner.png" 
            alt="Banner khuyến mãi sản phẩm mới" 
            width={1000} 
            height={300} 
            className="rounded-lg shadow-lg w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* Lazy load Product component */}
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<ProductSkeleton />}>
          <Product />
        </Suspense>
      </main>
    </div>
  );
};

export default App;