import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employe-list',
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.css']
})
export class EmployeListComponent implements OnInit {
  employeeList : Employee[];
  constructor(private employeeService:EmployeeService, private tostr:ToastrService) { }

  ngOnInit() {
    var x = this.employeeService.getData();
    x.snapshotChanges().subscribe(item =>{
      this.employeeList = [];
      item.forEach(element =>{
        var y = element.payload.toJSON();
        y["$key"]  = element.key;
        this.employeeList.push(y as Employee);
      });
    });
  }

  onEdit(emp : Employee){
    console.log(emp);
    this.employeeService.selectedEmployee = Object.assign({},emp);
  }

  onDelete(key : string){
    if(confirm("Are you sure you want delete ?") == true){
      this.employeeService.deleteEmployee(key);
      this.tostr.warning("Record deleted successfully","Employee register");
    }
  }

}
