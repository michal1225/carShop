import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {PartService} from "../config/part.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  providers:  [ PartService ]
})
export class ShopComponent implements OnInit {
  parts: any;
  partName: any;

  constructor(private http: HttpClient, private partService: PartService){
  }
  ngOnInit() {
    this.fetchParts("")
  }
  fetchParts(name: string){
    this.partService.fetchParts(name).subscribe(result => {
      this.parts = result
    });
  }
  onPartCreate(part: {name: string, description: string, price: number}){
    this.partService.createPart(part)
  }

}

