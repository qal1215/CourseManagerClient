import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
  studentForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _studentService: StudentService,
    private _dialogRef: MatDialogRef<AddStudentComponent>,
    @Inject(DIALOG_DATA) public data: any
  ) {
    this.studentForm = this._fb.group({
      id: '',
      fullName: '',
      birthday: '',
      gender: '',
      maker: '',
      modifier: '',
    });
  }
  ngOnInit(): void {
    this.studentForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.studentForm.value.id) {
      if (this.data) {
        this._studentService
          .updateStudent(this.data.id, this.studentForm.value)
          .subscribe({
            next: (data: any) => {
              alert('Student updated successfully');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      } else {
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
}
