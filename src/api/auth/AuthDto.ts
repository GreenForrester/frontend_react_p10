// src/dto/AuthDto.ts

export class AuthDto {
    username: string;
    password: string;
  
    constructor(username: string, password: string) {
      this.username = username;
      this.password = password;
    }
  }
  