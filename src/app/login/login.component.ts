import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: any;
  public username: any;
  public password: any;

  constructor(public _userService: AuthService) { }

  ngOnInit() {

  }

  public login = (username: string, password: string) => {
    this.user = {}
    console.log(username)
    this.user.username = username
    this.user.password = password
    this._userService.login(this.user)
  };
}
