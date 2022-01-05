import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from  '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-comp',
  templateUrl: './pop-up-comp.component.html',
  styleUrls: ['./pop-up-comp.component.css']
})
export class PopUpCompComponent implements OnInit {

  constructor(
    private router:Router,
    public matDialog :MatDialog,
    @Inject(MAT_DIALOG_DATA) public data) { 
      this.empName =  data.name;
      this.mode = data.mode;
    }

  empName : string;
  mode : string;

  ngOnInit(): void {
  }
  onClick(){
    this.router.navigate(['']);
    this.matDialog.closeAll();
  }

}
