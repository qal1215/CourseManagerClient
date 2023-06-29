import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private _http: HttpClient) {}
  proxy = 'http://localhost:8080/api/students';

  addStudent(data: any): Observable<any> {
    return this._http.post(this.proxy, data);
  }

  getStudents(): Observable<any> {
    return this._http.get(this.proxy);
  }

  deleteStudent(id: number): Observable<any> {
    return this._http.delete(this.proxy + `${id}`);
  }

  updateStudent(id: number, data: any): Observable<any> {
    return this._http.put(this.proxy + `${id}`, data);
  }
}
