import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent {
  studentForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _studentService: StudentService,
    private _dialogRef: MatDialogRef<AddStudentComponent>
  ) {
    this.studentForm = this._fb.group({
      fullName: '',
      birthday: '',
      gender: '',
    });
  }

  onFormSubmit() {
    if (this.studentForm.valid) {
      this._studentService.addStudent(this.studentForm.value).subscribe({
        next: (data: any) => {
          alert('Student added successfully');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}
