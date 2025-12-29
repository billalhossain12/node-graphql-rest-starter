export interface SendResponse<T> {
  message: string;
  data: T;
}

export function sendResponse<T>(
  data: T,
  message = 'Operation successful',
): SendResponse<T> {
  return { message, data };
}
