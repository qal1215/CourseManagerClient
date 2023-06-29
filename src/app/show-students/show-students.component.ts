import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddStudentComponent } from '../add-student/add-student.component';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-show-students',
  templateUrl: './show-students.component.html',
  styleUrls: ['./show-students.component.scss'],
})
export class ShowStudentsComponent {
  displayedColumns: string[] = [
    'id',
    'fullName',
    'birthday',
    'maker',
    'makeTime',
    'modifier',
    'modifiedTime',
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
    this.showStudents();
  }

  showStudents() {
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
        this.showStudents();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  openEditStudentForm(data: any) {
    const dialogRef = this._dialog.open(AddStudentComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.showStudents();
        }
      },
    });
  }
}
