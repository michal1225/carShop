import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {resolve} from "@angular/compiler-cli";
import {AuthService} from "./auth.service";

@Injectable({providedIn: "root"})
export class PartService {
  private httpOptions: any;
  private path: string = 'http://127.0.0.1:8001/shop/parts'
  constructor(private http: HttpClient, private _userService: AuthService) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + localStorage.getItem('user'),})
    };
  }

  createPart(part: { name: string, description: string, price: number }) {
    console.log(part)
    const headers = new HttpHeaders({'CarParts': 'Part'})
    this.http.post<{ name: string }>(this.path, part, {headers: headers}).subscribe((res) => {
      console.log(res)
    })
  }

  fetchParts(name: string) {
    return this.http.get<Location[]>(this.path + "?name=" + name, this.httpOptions)

  }

  deletePart(id: number) {
    return this.http.delete(this.path + "/" + id).subscribe(() => console.log('Delete successful'));
  }

  deleteAllParts() {
  }
}

