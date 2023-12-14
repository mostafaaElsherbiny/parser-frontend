export interface ErrorResponse {
  data: {
    message: string;
    errors: {
      property: string;
      message: string;
    }[];
  };
}
