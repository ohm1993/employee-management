import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../_models/index';
import { AlertService, UserService } from '../_services/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { 
  users : User[];
  //user: User;
  model: any = {};
  jQuery:any;

  public user = {
    name: '',
    email: '',
    password : '',
    role: ''
    }

  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) {}
  
  ngOnInit() {
    this.loadLists();
  }
  
 loadLists(){
    this.userService.getAll().subscribe(
        res => {
          this.users = res;
          console.log("res value is",res);
        }
     );
  } 
  editUser(UserId: string) {  
      this.userService.getById(UserId)
      .subscribe(
          user => {
            this.user = user;
          },
          error => {
              this.alertService.error(error);
          });
  }  

  deleteUser(UserId: number) {  
    alert("delete clicked");
  } 
  
  addUser() {  
    this.userService.create(this.model)
      .subscribe(
          data => {
            this.alertService.success('Registration successful', true);
            this.jQuery("#myModal").modal("hide");
          },
          error => {
              this.alertService.error(error);
          });
   
  }

  updateUser() {
    alert("in update ");
    console.log("edit value is",this.user);
  }

}
