import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {

  myForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.myForm = fb.group({
      'username': ['', [Validators.required, Validators.minLength(2)]],
      'email': ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      'phone': ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.username);
    console.log('Email', form.value.email);
    console.log('Phone', form.value.phone);
  }
}
