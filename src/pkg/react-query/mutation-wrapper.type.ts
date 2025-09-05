export type TResponse<T> = {
  data: T | null;
  message: string;
  code: number;
  status: string;
  errors:
    | {
        field: string;
        message: string;
      }[]
    | null;
};

export type TPagedList<T> = TResponse<T> & {
  data: T[];
  totalData: number;
  totalPages: number;
};

// TPagedListResponse represents a paginated response that contains:
// - All fields from TResponse (data, message, errors)
// - Where data is a TPagedList<T> containing:
//   - An array of type T
//   - Total count of items
//   - Total number of pages
export type TPagedListResponse<T> = TResponse<TPagedList<T>>;

// TListResponse represents a simple array response that contains:
// - All fields from TResponse (data, message, errors)
// - Where data is an array of type T
export type TListResponse<T> = TResponse<T[]>;
