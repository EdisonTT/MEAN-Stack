import { Component, OnInit } from '@angular/core';
import { service } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor(public empService : service, private router :Router) { }

  ngOnInit(): void {
  }
  homeButton(){
    this.empService.getEmpList();
    this.router.navigate(["./"]);
  }

}
