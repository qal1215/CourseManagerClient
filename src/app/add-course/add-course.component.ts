import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent {
  studentForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _studentService: StudentService,
    private _dialogRef: MatDialogRef<AddStudentComponent>,
    @Inject(DIALOG_DATA) public data: any
  ) {
    this.studentForm = this._fb.group({
      id: '',
      title: '',
      description: '',
      startDate: '',
      capacity: '',
      maker: '',
      makeTime: '',
      modifier: '',
      modifiedTime: '',
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
