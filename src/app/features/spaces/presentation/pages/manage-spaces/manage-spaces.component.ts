import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Space } from '../../../../../core/models/space.entity';
import { CreateSpaceUseCase } from '../../../../reservations/application/use-cases/create-space-usecase';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-spaces',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule, MatSelectModule,MatAutocompleteModule,MatDialogModule],
  templateUrl: './manage-spaces.component.html',
  styleUrl: './manage-spaces.component.scss'
})
export class ManageSpacesComponent implements OnInit {
  spaceForm: FormGroup;

  constructor(private fb: FormBuilder, private createSpaceUseCase: CreateSpaceUseCase,private router: Router) 
  {this.spaceForm = this.fb.group({
    name: ['', Validators.required],
    capacity: [0]
  });}

  ngOnInit(): void {
    
  }

  async onSubmit() {
    if (this.spaceForm.valid) {
      const newSpace: Space = this.spaceForm.value;
      this.createSpaceUseCase.execute(newSpace).then(() => {
        alert('Espacio creado correctamente');
        this.spaceForm.reset();
      }, error => {
        alert('Error al crear el espacio: ' + error.message);
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/']);
  }
}
