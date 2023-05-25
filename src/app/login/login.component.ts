import {Component, OnInit} from '@angular/core';
import {AuthService} from "../config/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: any;
  protected username: any;
  protected password: any;

  constructor(public _userService: AuthService) { }

  ngOnInit() {

  }

  public login = (username: string, password: string) => {
    this.user = {}
    this.user.username = username
    this.user.password = password
    this._userService.login(this.user)
  };
}
