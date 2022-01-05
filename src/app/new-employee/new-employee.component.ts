import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from  '@angular/material/dialog';

import { service } from '../api.service';
import { Employee } from '../employeeModel';
// import { PopUpCompComponent } from '../pop-up-comp/pop-up-comp.component';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  constructor(private empService : service, 
    private router :Router,
    private activeRoute : ActivatedRoute,
    private matDialog:MatDialog) { }

  newEmployee : FormGroup;
  mode : string;
  private empId :string;

  ngOnInit(): void {
    this.newEmployee = new FormGroup({
      'name' : new FormControl('', [Validators.required]),
      'mobileNumber' : new FormControl('',[Validators.required, 
                    Validators.min(1000000000), 
                    Validators.max(9999999999)]),
      'email' : new FormControl('',[Validators.required, Validators.email]),
      'designation' : new FormControl('',Validators.required),
      'salary' : new FormControl('',Validators.required)
    });
    // this.newEmployee.reset();
    // this.newEmployee.patchValue({'salary':20000});
    this.newEmployee.controls['salary'].disable();
    
    this.newEmployee.get('designation').valueChanges.subscribe((value)=>{
      // console.log(value);
      switch (value){
        case 'Designation 1':
          this.newEmployee.get('salary').setValue(1500000);
          break;
        case 'Designation 2':
          this.newEmployee.get('salary').setValue(1000000);
          break;
        case 'Designation 3':
          this.newEmployee.get('salary').setValue(700000);
          break;
        case 'Designation 4':
          this.newEmployee.get('salary').setValue(400000);
          break;

      }
      // this.newEmployee.get('salary').setValue(12133);

    })

    this.activeRoute.paramMap.subscribe((paramMap : ParamMap)=>{
      if (paramMap.has('empID')){
        this.mode = 'edit';
        this.empId = paramMap.get('empID');
        this.newEmployee.setValue({
          'name':this.empService.currentEmp.name,
          'mobileNumber': this.empService.currentEmp.phone,
          'email':this.empService.currentEmp.email,
          'designation': this.empService.currentEmp.designation,
          'salary': this.empService.currentEmp.salary
        });
        // console.log(this.empId);
        // console.log(this.empService.currentEmp);
      }
      else{
        this.mode = 'create';
      }
    });
    
  }
  onSubmit(){
    let emp : Employee = {
      id : 'some_random_id_idk',
      name : this.newEmployee.get('name').value,
      email : this.newEmployee.get('email').value,
      designation : this.newEmployee.get('designation').value,
      phone : Number(this.newEmployee.get('mobileNumber').value),
      salary : Number(this.newEmployee.get('salary').value)
    }
    if (this.mode==='create'){
      this.empService.addEmp(emp);
      // this.matDialog.open(PopUpCompComponent);
      this.newEmployee.reset();
      // alert('Employee Registered Successfully');
      // this.router.navigate(["/"]);
    }
    else{
      this.empService.editData(this.empId, emp);

    }
  }
  
}
