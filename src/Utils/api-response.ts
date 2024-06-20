import { ApiResponseT } from "./type";

export class ApiResponse {
  static formatErrorResponse = (response: {
    message: string;
    error?: any;
  }): ApiResponseT => {
    const { message, error } = response;
    return { success: false, message, error };
  };

  static formatSuccessResponse = (response: {
    message?: string;
    data?: any;
  }): ApiResponseT => {
    const { message, data } = response;
    const msg = message || "success";
    return { success: true, message: msg, data };
  };
}
