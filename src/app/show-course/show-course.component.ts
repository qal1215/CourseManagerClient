import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddCourseComponent } from '../add-course/add-course.component';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-show-course',
  templateUrl: './show-course.component.html',
  styleUrls: ['./show-course.component.scss'],
})

// export class ShowCourseComponent {
//   title = 'Course Manager WebApp';

//   displayedColumns: string[] = [
//     'Id',
//     'Title',
//     'Description',
//     'StartDate',
//     'Capacity',
//     'Maker',
//     'MakeTime',
//     'Modifier',
//     'ModifyTime',
//   ];
//   dataSource!: MatTableDataSource<any>;

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;

//   constructor(
//     private _dialog: MatDialog,
//     private _courseService: CourseService
//   ) {}

//   ngOnInit(): void {
//     this.getCourses();
//   }

//   getCourses() {
//     this._courseService.getCourses().subscribe({
//       next: (data: any) => {
//         this.dataSource = new MatTableDataSource(data);
//         this.dataSource.sort = this.sort;
//         this.dataSource.paginator = this.paginator;
//       },
//       error: console.log,
//     });
//   }

//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();

//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }

//   deleteCourse(id: number) {
//     this._courseService.deleteCourse(id).subscribe({
//       next: (data: any) => {
//         alert('Student deleted successfully');
//         this.getCourses();
//       },
//       error: (err: any) => {
//         console.log(err);
//       },
//     });
//   }

//   openEditCourseForm(data: any) {
//     const dialogRef = this._dialog.open(AddCourseComponent, {
//       data,
//     });
//     dialogRef.afterClosed().subscribe({
//       next: (data) => {
//         if (data) {
//           this.getCourses();
//         }
//       },
//     });
//   }
// }
export class ShowCourseComponent {
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'capacity',
    'startDate',
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
    private _courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.showCourse();
  }

  showCourse() {
    this._courseService.getCourses().subscribe({
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
    this._courseService.deleteCourse(id).subscribe({
      next: (data: any) => {
        alert('Student deleted successfully');
        this.showCourse();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  openEditCourseForm(data: any) {
    const dialogRef = this._dialog.open(AddCourseComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.showCourse();
        }
      },
    });
  }
}
