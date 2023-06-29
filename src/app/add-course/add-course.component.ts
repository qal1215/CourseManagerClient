import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';
import { StudentService } from '../services/student.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent implements OnInit {
  courseForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _courseService: CourseService,
    private _dialogRef: MatDialogRef<AddStudentComponent>,
    @Inject(DIALOG_DATA) public data: any
  ) {
    this.courseForm = this._fb.group({
      id: '',
      title: '',
      description: '',
      startDate: '',
      capacity: '',
      maker: '',
      modifier: '',
    });
  }
  ngOnInit(): void {
    this.courseForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.courseForm.valid) {
      if (this.data) {
        this._courseService
          .updateCourse(this.data.id, this.courseForm.value)
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
        this._courseService.addCourse(this.courseForm.value).subscribe({
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
