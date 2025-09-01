export interface UserResponse {
  accessToken: string;
  sessionExpiry: number;
  sessionId: string;
}

export interface JWT {
  userName: string;
  fullName: string;
  pic: string;
  exp: number;
}

export interface UserSession extends JWT, UserResponse {}
