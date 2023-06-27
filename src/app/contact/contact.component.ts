import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../config/auth.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  email: any
  msg: any
  httpOptions: any
  private path: string = 'http://127.0.0.1:8001/contact/'
  constructor(private http: HttpClient) {
    if(localStorage.getItem('user'))
      this.httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + localStorage.getItem('user'),})
      };

  }
  sendMessage(email: any, msg: any){
    this.http.post<{ name: string }>(this.path, {email: this.email, msg: this.msg}, this.httpOptions).subscribe((res) => {
      console.log(res)
    })
  }
}
