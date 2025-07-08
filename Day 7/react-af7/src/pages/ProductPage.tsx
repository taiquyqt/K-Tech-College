import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.css'


type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
};

const PRODUCTS_PER_PAGE = 4;

export default function ProductPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(data);

        // Tìm category "Mobile" và set làm mặc định 
        const mobileCategory = data.find((cat: Category) => cat.name.toLowerCase() === 'mobile');
        if (mobileCategory) {
          setSelectedIds([mobileCategory.id]);
        }
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);


  useEffect(() => {
    if (selectedIds.length === 0) {
      setProducts([]);
      return;
    }

    Promise.all(
      selectedIds.map(id =>
        fetch(`https://api.escuelajs.co/api/v1/categories/${id}/products`).then(res => res.json())
      )
    )
      .then(results => {
        const merged = results.flat();
        setProducts(merged);
        setCurrentPage(1); // reset page when filter changes
      })
      .catch(err => console.error('Error fetching products:', err));
  }, [selectedIds]);

  const handleCategoryChange = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);


  return (
    <>
      <div className={styles.mainContent}>
        {/* Bộ lọc bên trái */}
        <aside className={styles.sidebar}>
          <h3>Bộ lọc sản phẩm</h3>
          <div className={styles.filterContainer}>
            {categories.map(category => (
              <label key={category.id} className={styles.filterLabel}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                />
                {category.name}
              </label>
            ))}
          </div>
        </aside>

        {/* Danh sách sản phẩm bên phải */}
        <section className={styles.productSection}>
          <h1 className={styles.productTitle}>Sản phẩm</h1>
          {paginatedProducts.length === 0 ? (
            <p className={styles.productDescription}>Không có sản phẩm nào được chọn.</p>
          ) : (
            <div className={styles.productContainer}>
              {paginatedProducts.map(product => (
                <div key={product.id} className={styles.productItem}>
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className={styles.productImage}
                  />
                  <h4 className={styles.productTitle}>{product.title}</h4>
                  <p className={styles.productPrice}>{product.price} $</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Pagination nằm trong fragment chung */}
      {totalPages > 1 && (
        <div className={styles.paginationContainer}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`${styles.paginationButton} ${currentPage === i + 1 ? styles.activePage : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );

}
