import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  proxy = 'http://localhost:8080/api/course';

  constructor(private _http: HttpClient) {}

  addCourse(data: any): Observable<any> {
    return this._http.post(this.proxy, data);
  }

  updateCourse(id: number, data: any): Observable<any> {
    return this._http.put(this.proxy + `/${id}`, data);
  }

  getCourses(): Observable<any> {
    return this._http.get(this.proxy);
  }

  deleteCourse(id: number): Observable<any> {
    return this._http.delete(this.proxy + `/${id}`);
  }
}
