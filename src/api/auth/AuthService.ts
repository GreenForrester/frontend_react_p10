// src/services/AuthService.ts

import axios from 'axios';
import { AuthDto } from './AuthDto.ts';
import { LOGIN_API_URL } from '../apiconfig.ts';

export class AuthService {
  static async login(authDto: AuthDto) {
    
    try {
            const response = await axios.post(LOGIN_API_URL, authDto, {
            headers: {
              'Content-Type': 'application/json',
            },
            });   
            return response.data;

        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
  }
}
