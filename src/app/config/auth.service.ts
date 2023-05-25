import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // http options used for making API calls
  private httpOptions: any;

  // the actual JWT token
  public token: any;

  // the token expiration date
  public token_expires: any;

  // the username of the logged in user
  public username: any;
  public data: any;

  // error messages received from the login attempt
  public errors: any = [];

  constructor(private http: HttpClient, ) {

  }

  public login(user: object) {
    console.log(user)
    this.http.post('http://localhost:8001/api-token-auth/', user, this.httpOptions).subscribe(
      (data: any) => {
        this.updateData(data['token']);
        localStorage.setItem('user', data['token'])
      },
      err => {
        this.errors = err['error'];
      },
    );
  }

  // Refreshes the JWT token, to extend the time the user is logged in
  public refreshToken() {
    this.http.post('http://localhost:8001/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
      (data: any) => {
        this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  public logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;
  }

  private updateData(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    this.token = token;
    this.errors = [];

    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }
}
