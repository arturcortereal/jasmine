import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user/user.service';
export interface User {
  username: string;
  id: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoading: boolean = true;
  showUserForm: boolean = false;
  title = 'jasmine';
  displayedColumns: string[] = ['id', 'username', 'email', 'phone'];
  dataSource: any;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.isLoading = true;
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        console.log(data);
        this.dataSource = data;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.showErrorMessage();
      }
    );
  }

  showErrorMessage() {
    console.log('Showing error message!');
  }

  showAddUser() {
    this.showUserForm = !this.showUserForm;
  }

  // Only for testing purposes
  multiplyValues(num1: any, num2: any) {
    return num1 * num2;
  }
}
