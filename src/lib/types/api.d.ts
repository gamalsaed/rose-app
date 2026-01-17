declare type SuccessResponse<T> = {
  message: "success";
} & T;

declare type ErrorResponse = {
  message: string;
  code: number;
};

declare type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;

declare type PaginationMetadata = {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
};

declare type PaginatedData<Item, Key extends string> = {
  metadata: PaginationMetadata;
} & {
  [K in Key]: Item[];
};
