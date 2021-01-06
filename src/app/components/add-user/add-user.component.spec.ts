import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user.component';

describe('AddUserComponent', () => {
  let fixture: ComponentFixture<AddUserComponent>;
  let component: AddUserComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [AddUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('form valid', () => {
    // Arrange
    const testCases = [
      ['Monica', 'monica@gmail.com', '918283333'],
      ['Artur Côrte-Real', 'artur@gmail.com', '918283333'],
      ['Erica Fontes', 'erica@gmail.com', '96696969'],
    ];

    testCases.forEach((test, index) => {
      it(`should make the form valid (test case: ${index + 1})`, () => {
        // Arrange
        let itemName = component.myForm.controls['username'];
        let itemEmail = component.myForm.controls['email'];
        let itemPhone = component.myForm.controls['phone'];

        // Act
        itemName.setValue(test[0]);
        itemEmail.setValue(test[1]);
        itemPhone.setValue(test[2]);

        // Assert
        expect(component.myForm.valid).toBeTruthy();
      });
    });
  });

  describe('form invalid', () => {
    // Arrange
    const testCases = [
      ['J', 'joe@gmail.com', '918283333'],
      ['Joe', 'notAnEmail', '918283333'],
      ['Esmeralda', '@gmail.com', '918283333'],
    ];

    testCases.forEach((test, index) => {
      it(`should make the form valid (test case: ${index + 1})`, () => {
        // Arrange
        let itemName = component.myForm.controls['username'];
        let itemEmail = component.myForm.controls['email'];
        let itemPhone = component.myForm.controls['phone'];

        // Act
        itemName.setValue(test[0]);
        itemEmail.setValue(test[1]);
        itemPhone.setValue(test[2]);

        // Assert
        expect(component.myForm.valid).toBeFalsy();
      });
    });
  });
});


