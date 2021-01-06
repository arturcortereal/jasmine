import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn: boolean = false;
  usersUrl = 'https://jsonplaceholder.typicode.com/users'; // URL to web api

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any[]>(this.usersUrl);
  }
}
