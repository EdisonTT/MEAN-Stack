import { Injectable } from "@angular/core";
import { Employee } from "./employeeModel";
import { Router } from "@angular/router";
import {map} from 'rxjs/operators';

import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

import { PopUpCompComponent } from "./pop-up-comp/pop-up-comp.component";

@Injectable()
export class service{
    constructor(
      private router:Router,
      private http : HttpClient, 
      private matDialog : MatDialog){}
    public employeeList  = [];
    private updatedEmpList = new Subject<Employee[]>();
    public updatedflag = new Subject<boolean>();

    public flag :boolean;

    public currentEmp : Employee;
    editData(empId : string ,emp : Employee){
      this.http.put("http://localhost:3000/api/empLis/"+ empId, emp)
      .subscribe((result)=>{
        // console.log(result)
        // alert("Employee Updated Successfully");
        // this.router.navigate(['']);
        this.matDialog.open(PopUpCompComponent,{
          data:{
            name : emp.name,
            mode : "Updated"
          }
        });
      });
    }

    deleteEmp(empId : string, empName : string):void{
      this.http.delete("http://localhost:3000/api/empLis/"+ empId).subscribe(()=>{
        this.matDialog.open(PopUpCompComponent,{
          data:{
            name : empName,
            mode : "Deleted"
          }
        });
        this.getEmpList();
      });
    }
    addEmp(emp : Employee):void{
    
      this.http
        .post<{ message: string, id: string }>("http://localhost:3000/api/newEmp", emp)
        .subscribe(responseData => {
          console.log(responseData.message);
          // console.log(responseData.id);
          this.matDialog.open(PopUpCompComponent,{
            data:{
              name : emp.name,
              mode : "Added"
            }
          });
        });
    this.getEmpList();
    }
    empView(emp : Employee):void{
        this.currentEmp = emp;
        this.router.navigate(['empView'])
    }

    getEmpList() {
      // this.updatedflag.next(true);
      // console.log("hi from getEmpList before http");
        this.http
          .get<{ message: string; data: any[] }>(
            "http://localhost:3000/api/empLis"
          )
          .pipe(map((empListFromServer)=>{
            return empListFromServer.data.map(emp=>{
              return{
                id : emp._id,
                name : emp.name,
                email : emp.email,
                designation : emp.designation,
                phone : emp.phone,
                salary : emp.salary
              }
            })
          }))
          .subscribe(empListFromServer => {
            
            // console.log(this.employeeList);
             setTimeout(() => {
            this.updatedflag.next(false);
            this.employeeList = empListFromServer;
            this.updatedEmpList.next([...this.employeeList]);
            }, 200);
            // console.log("hi from getEmpList after http");
          },
          ()=>{
              this.router.navigate(["error"])
          });
      }
      listenToEmpUpdate(){
          return this.updatedEmpList.asObservable();
      }

      listenToFlagUpdate(){
        // console.log('hi from listenToFlagUpdate')
        return this.updatedflag.asObservable();

      }
   
};