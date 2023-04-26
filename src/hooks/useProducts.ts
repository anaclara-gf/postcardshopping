import axios from 'axios';
import {useEffect, useState} from 'react';
import {ApiResponse, Pagination, Product} from '../utils/types/Product';

export default function useProducts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination>();
  const baseUrl = 'https://api.artic.edu/api/v1/artworks';
  const fields =
    'id,title,date_display,place_of_origin,dimensions,medium_display,artwork_type_title,artist_title,style_title,image_id,artist_display';

  const fetchProducts = () => {
    axios
      .get<ApiResponse>(`${baseUrl}?fields=${fields}&limit=90`)
      .then(response => {
        setError(false);
        const productsWithImages = response.data.data
          .filter(product => product.image_id)
          .map(product => {
            return {
              ...product,
              image: `${response.data.config.iiif_url}/${product.image_id}/full/843,/0/default.jpg`,
            };
          });
        setProducts(productsWithImages);
        setPagination(response.data.pagination);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {loading, products, pagination, error, fetchProducts};
}
