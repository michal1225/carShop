import {Component, OnInit} from '@angular/core';
import {AuthService} from "../config/auth.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged: any
  constructor(private auth: AuthService ) {
  }
  ngOnInit() {
    this.logged = localStorage.getItem('logged')
  }
  logout() {
    this.auth.logout()
    this.logged = false

  }
}
