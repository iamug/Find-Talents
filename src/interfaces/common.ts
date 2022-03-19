export interface IApiResponse<T> {
  total: number;
  next: string;
  items: T;
}
