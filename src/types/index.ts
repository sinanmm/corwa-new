export interface Association {
  _id: string;
  name: string;
  nameEn?: string;
  state?: string;
  taluk: string;
  district: string;
  category: string;
  contactPerson?: string;
  phone?: string;
  slug: string;
  isActive: boolean;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  status: string;
  results?: number;
  data: {
    associations?: T[]; // Depending on endpoint
    pagination?: Pagination;
  };
}
