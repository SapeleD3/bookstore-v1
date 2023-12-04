export interface IBaseResponse {
  status: boolean;
  message: string;
  data: Record<string, any> | null;
}

export interface IServer {
  serve(): void;
}
