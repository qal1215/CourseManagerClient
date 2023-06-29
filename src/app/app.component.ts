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

  constructor(
    private _dialog: MatDialog,
    private _studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  openAddStudentForm() {
    const dialogRef = this._dialog.open(AddStudentComponent);
    dialogRef.afterClosed().subscribe((result) => {
      next: (data: any) => {
        if (data) {
          alert('Student updated successfully');
          this.getStudents();
        }
      };
    });
  }

  openAddCourseForm() {
    this._dialog.open(AddCourseComponent);
  }

  getStudents() {
    this._studentService.getStudents().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteStudent(id: number) {
    this._studentService.deleteStudent(id).subscribe({
      next: (data: any) => {
        alert('Student deleted successfully');
        this.getStudents();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
