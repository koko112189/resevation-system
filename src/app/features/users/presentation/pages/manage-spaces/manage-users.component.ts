import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { User } from '../../../../../core/models/user.entity';
import { CreateUserUseCase } from '../../../application/use-cases/create-user-usecase';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule, MatSelectModule,MatAutocompleteModule,MatDialogModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageusersComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private createuserUseCase: CreateUserUseCase,private router: Router) 
  {this.userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['']
  });}

  ngOnInit(): void {
    
  }

  async onSubmit() {
    if (this.userForm.valid) {
      const newuser: User = this.userForm.value;
      this.createuserUseCase.execute(newuser).then(() => {
        alert('usuario creado correctamente');
        this.userForm.reset();
      }, (error: { message: string; }) => {
        alert('Error al crear el usuario: ' + error.message);
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/']);
  }
}
