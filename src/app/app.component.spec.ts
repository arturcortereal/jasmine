import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { UserService } from './services/user/user.service';
import { MockUserService } from './services/user/user.service.mock';

describe('AppComponent', () => {
  let service: UserService;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        //UserService,
        { provide: UserService, useClass: MockUserService },
      ],
      imports: [
        HttpClientModule,
        MatToolbarModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
      ],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    service = TestBed.inject(UserService);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'jasmine'`, () => {
    expect(component.title).toEqual('jasmine');
  });

  it(`should call ngOnInit`, () => {
    // Arrange
    spyOn(component, 'getUsers');

    // Act
    component.ngOnInit();

    // Assert
    expect(component.isLoading).toEqual(true);
    expect(component.getUsers).toHaveBeenCalled();
  });

  describe('getUsers', () => {
    it(`should call getUsers function with success`, () => {
      // Arrange
      spyOn(service, 'getUsers').and.returnValue(of(mockUsersList));

      // Act
      component.getUsers();

      // Assert
      expect(service.getUsers).toHaveBeenCalled();
      expect(component.dataSource).toEqual(mockUsersList);

    });

    it(`should call getUsers function with an error`, () => {
      // Arrange
      spyOn(service, 'getUsers').and.returnValue(throwError('Error'));
      spyOn(component, 'showErrorMessage');

      // Act
      component.getUsers();

      // Assert
      expect(service.getUsers).toHaveBeenCalled();
      expect(component.showErrorMessage).toHaveBeenCalled();

    });

    it(`should call getUsers function with success (ASYNC)`, waitForAsync(() => {
      // Arrange
      spyOn(service, 'getUsers').and.returnValue(of(mockUsersList));

      // Act
      component.getUsers();

      fixture.whenStable().then(() => {
        expect(component.dataSource).toEqual(mockUsersList);
      });


    }));

  });

  it(`should multiply values`, () => {
    // Arrange
    let expectedResult = 15;

    // Act
    const result = component.multiplyValues(3, 5);

    // Assert
    expect(result).toBe(expectedResult);
  });

  it(`should toggle showUserForm`, () => {
    // Arrange
    component.showUserForm = false;

    // Act
    component.showAddUser();

    // Assert
    expect(component.showUserForm).toBe(true);
  });
});
