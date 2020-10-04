import { EmployeeService } from './service/employee.service';
import { Employee } from './model/employee';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
public employees: Employee[];
public editEmployee:Employee;
public deleteEmployee: Employee;

constructor(private EmployeeService: EmployeeService) { }


ngOnInit(){
  this.getEmployees();
}



public getEmployees(): void{
   this.EmployeeService.getEmployees().subscribe( (respose: Employee[]) =>{
     this.employees = respose;
   },
   (error:HttpErrorResponse) =>{ alert(error.message);}
   );
}



onAddEmployee(addForm:NgForm): void{
  document.getElementById('add-employee-form').click();
  this.EmployeeService.addEmployee(addForm.value).subscribe(
    (response:Employee) =>{
      console.log(response);
      this.getEmployees();
      addForm.reset();
    },
    (error:HttpErrorResponse) =>{
      alert(error.message);
    }
  );
}


onUpdateEmployee(employee:Employee): void{
  this.EmployeeService.addEmployee(employee).subscribe(
    (response:Employee) =>{
      console.log(response);
      this.getEmployees();
    },
    (error:HttpErrorResponse) =>{
      alert(error.message);
    }
  );
}



onDeleteEmployee(employeeId:number): void{
  this.EmployeeService.deleteEmployee(employeeId).subscribe(
    (response:void) =>{
      console.log(response);
      this.getEmployees();
    },
    (error:HttpErrorResponse) =>{
      alert(error.message);
    }
  );
}



public searchEmployees(key: string): void {
  console.log('Searching employees...');
  const results: Employee[] = [];
  for (const employee of this.employees) {
    if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1 
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
    }
  }
  this.employees = results;
  if (results.length === 0 || !key) {
    this.getEmployees();
  }
}





public onOpenModal(employee: Employee, mode: string): void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#addEmployeeModal');
  }
  if (mode === 'edit') {
    this.editEmployee = employee;
    button.setAttribute('data-target', '#updateEmployeeModal');
  }
  if (mode === 'delete') {
    this.deleteEmployee = employee;
    button.setAttribute('data-target', '#deleteEmployeeModal');
  }
  container.appendChild(button);
  button.click();
}



}
