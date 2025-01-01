import axios from 'axios'; //importing
import { CreateCustomerDto } from './CreateCustomerDto';
import { CUSTOMER_API_URL } from '../apiconfig';    

//We are using AXIOS LIBRARY TO CALL BACKEND SERVICES

export class CustomerService {
  static async createCustomer(createCustomerDto: CreateCustomerDto) {
    //console.log('Creating Customer ...');
    try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.post(CUSTOMER_API_URL, createCustomerDto, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                },
      });
      
      return response.data;
    } catch (error) {
      console.error('Error creating Customer:', error);
      throw error;
    }
  }
  
  static async getAllCustomers() {
    
    //console.log('Inside ...');
    try {
        const token = localStorage.getItem('accessToken');//browser storage
        const response = await axios.get(CUSTOMER_API_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Add Authorization header
            },
    });
      return response.data;
    } catch (error) {
      console.error('Error fetching Customers:', error);
      throw error;
    }
  }

  static async getCustomerById(id: string) {
    try {
        const token = localStorage.getItem('accessToken');//browser storage
        const response = await axios.get(`${CUSTOMER_API_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                },
            });
        return response.data;
    } catch (error) {
      console.error('Error fetching Customer:', error);
      throw error;
    }
  }

  //TODO: Change based on how id is expected by backend in url or body as part of sent json
  static async updateCustomer(id: string, updateCustomerDto: Partial<CreateCustomerDto>) {
    try {
        const token = localStorage.getItem('accessToken');//browser storage
        const response = await axios.patch(`${CUSTOMER_API_URL}/${id}`, updateCustomerDto, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                },
            } );
        return response.data;
    } catch (error) {
        console.error('Error updating Customer:', error);
      throw error;
    }
  }
}
