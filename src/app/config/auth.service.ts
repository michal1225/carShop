import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpOptions: any;


  public token: any;

  public token_expires: any;


  public username: any;
  public data: any;

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
    localStorage.setItem('logged', 'false')
    this.token = null;
    this.token_expires = null;
    this.username = null;
  }

  private updateData(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    this.token = token;
    localStorage.setItem('logged', 'true')
    this.errors = [];

    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }
}
