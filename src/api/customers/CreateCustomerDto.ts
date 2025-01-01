
  
  export class CreateCustomerDto 
  {
    customerName: string;
    cemail: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;

    constructor(customerName: string, cemail: string, phone: string, address: string, city: string, postalCode: string, country: string) {
        this.customerName = customerName;
        this.cemail = cemail;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.postalCode = postalCode;
        this.country = country;
      }
  }
  