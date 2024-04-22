export interface Paging {
  page: number;
  per_page: number;
}

export interface PagingResponse {
  current_page: number;
  per_page: number;
  total_pages: number;
}

export interface RequestOtpSuccessResponse {
  success: true;
  otp_expire_in: number;
}
export interface RequestOtpFailureResponse {
  success: false;
  error: string;
  next_request_at: number;
}
