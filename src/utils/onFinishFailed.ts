import { ErrorResponse } from "@/interfaces/ErrorResponse";

const onFinishFailed = (
  { response }: { response: ErrorResponse },
  setError: (value: string) => void
) => {
  const { data } = response;
  const { errors } = data;
  if (data) {
    if (data.message) {
      setError(data.message);
    }
    if (errors) {
      setError(
        errors
          .map(
            (item: { property: string; message: string }) =>
              `(${item.property})${item.message}`
          )
          .join(", ")
      );
    }
  }
};
export default onFinishFailed;
