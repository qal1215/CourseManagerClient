import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { StudentService } from './services/student.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Course Manager WebApp';

  displayedColumns: string[] = [
    'id',
    'fullName',
    'birthday',
    'gender',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog) {}

  ngOnInit(): void {}

  openAddStudentForm() {
    const dialogRef = this._dialog.open(AddStudentComponent);
    dialogRef.afterClosed().subscribe((result) => {
      next: (data: any) => {
        if (data) {
          alert('Student updated successfully');
        }
      };
    });
  }

  openAddCourseForm() {
    this._dialog.open(AddCourseComponent);
  }
}
