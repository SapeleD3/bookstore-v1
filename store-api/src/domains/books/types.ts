export type ListBooksPayload = {
  bookId: string;
  page: number;
  limit: number;
  tag?: string;
  price_min?: number;
  price_max?: number;
  search?: string;
};
