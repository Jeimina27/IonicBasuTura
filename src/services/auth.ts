import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor() { }
  async login(formValue: {
  email: string;
  password: string;
}) {
  try {
    const option = {
      url: environment.url2 + '/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: { email: formValue.email, password: formValue.password },
    };

    const response = await CapacitorHttp.request(option);

    if (response.status === 200 && response.data.access_token) {
      console.log('Login successful:', response.data);
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error during login:', error);
    return false;
  }
}
}
