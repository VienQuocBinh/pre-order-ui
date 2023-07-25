export type PostResponse<T> = {
    data: T;
    code: number;
    message: string;
  };