import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

//Testing of EmployeeService
describe('UserService', () => {
  let httpClient: HttpClient;
  let http: HttpTestingController;
  let service: UserService;

  let mockUsersList = [
    {
      id: 1,
      username: 'Bret',
      email: 'Sincere@april.biz',
      phone: '1-770-736-8031 x56442',
    },
    {
      id: 2,
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      phone: '1-770-736-8031 x56442',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    httpClient = TestBed.inject(HttpClient);
    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
  });

  // Method in which we run http.verify() and test our assertion mock like http,
  // Basically it ensures that no request is outstanding.
  afterEach(() => {
    http.verify();
  });

  it('should get users list', () => {
    let usersListResponse: any;

    service.getUsers().subscribe((response: any) => {
      usersListResponse = response;
    });

    // To set the response we just need to call flush,
    // which converts the given object to JSON format by default
    const request = http.expectOne(
      'https://jsonplaceholder.typicode.com/users'
    );
    request.flush(mockUsersList);
    expect(request.request.method).toBe('GET');
    expect(usersListResponse).toEqual(mockUsersList);
  });
});
