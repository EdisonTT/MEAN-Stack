import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { service } from '../api.service';
import { Employee } from '../employeeModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private empLisSub : Subscription;

  constructor(private empData : service, private router:Router) { }
  private flag : Subscription;
  public loadFlag :boolean = true;
  
  data : Employee[] = [];
  ngOnInit(): void {
    this.empData.getEmpList();
    this.empLisSub = this.empData.listenToEmpUpdate()
      .subscribe((empList: Employee[]) => {
        this.data = empList;
      });

      this.flag = this.empData.listenToFlagUpdate()
      .subscribe((flagFromService : boolean)=>{
        this.loadFlag = flagFromService;
        // console.log(this.loadFlag);
      });
  }
  ngOnDestroy() {
    this.empLisSub.unsubscribe();
    this.flag.unsubscribe();
    // console.log('Exit from home component');
  }
  viewEmp(emp:Employee){
  this.empData.empView(emp);
}
  delete(emp: Employee){
  this.empData.deleteEmp(emp.id, emp.name);
  }

  onEdit(emp:Employee){
    this.empData.currentEmp = emp;
    this.router.navigate(['/empEdit', emp.id])
  }

}

