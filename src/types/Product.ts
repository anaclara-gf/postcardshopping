export interface ApiResponse {
  config: Config;
  data: Product[];
  pagination: Pagination;
}

interface Config {
  iiif_url: string;
  website_url: string;
}

export interface Product {
  id: number;
  title: string;
  artist_title: string;
  image_id: string;
  artwork_type_title?: string;
  date_display?: string;
  dimensions?: string;
  medium_display?: string;
  place_of_origin?: string;
  style_title?: string;
  artist_display?: string;
}

export interface Pagination {
  current_page: number;
  limit: number;
  next_url: string;
  offset: number;
  total: number;
  total_pages: number;
}
