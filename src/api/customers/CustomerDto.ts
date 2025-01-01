export class CustomerDto 
{
  customerId: string;
  customerName: string;
  cemail: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;

  constructor(customerId:string, customerName: string, cemail: string, phone: string, address: string, city: string, postalCode: string, country: string) {
      this.customerId = customerId;
      this.customerName = customerName;
      this.cemail = cemail;
      this.phone = phone;
      this.address = address;
      this.city = city;
      this.postalCode = postalCode;
      this.country = country;
    }
}