import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';

import { Task } from '../interfaces/task';
import { HandleErrorService } from './handleError.service';
import { NotificationService } from './notification.service';
import { LoadingService } from './loading.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})

export class TasksService {
  private apiUrl = 'api/reminders';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  timer$ = interval(1000)

  constructor(private http: HttpClient,private handleError:HandleErrorService, private notificationService:NotificationService, private loadingService:LoadingService) { }

  
  getTasks(user:User):Observable<Task[]> {
    const url = `${this.apiUrl}`;
    this.loadingService.showLoading();
    return this.http.get<Task[]>(url).pipe(
              catchError(this.handleError.handleError<Task[]>("Getting tasks")),
              finalize(()=> this.loadingService.hideLoading()),
            );
  }

  createTask(task:Task, user:User):Observable<Task[]>{
    const url = `${this.apiUrl}`;
    this.loadingService.showLoading();
    return this.http.post<Task>(url, task).pipe(
      catchError(this.handleError.handleError<Task>("Creating a new Task")),
      switchMap(() => {
        return this.http.get<Task[]>(this.apiUrl).pipe(
          catchError(this.handleError.handleError<Task[]>("Get tasks after creation of new task")),
          finalize(()=> this.loadingService.hideLoading())
        );
      })
    );
  }

  removeTask(id:string,user:User):Observable<any>{
    this.loadingService.showLoading();
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Task>(url,this.httpOptions).pipe( 
      catchError(this.handleError.handleError<any>("Remove task")),
      finalize(()=> this.loadingService.hideLoading())
    );
  }

  updateTask(task:Task,user:User):Observable<any> {
    this.loadingService.showLoading();
    const {id, note, date} = task;
    const updatedTask = {
      note,
      date
    }

    const url = `${this.apiUrl}/${id}`;

    // return this.http.put(url,updatedTask, this.httpOptions).pipe(
      return this.http.put(url,task, this.httpOptions).pipe(
        catchError(this.handleError.handleError<any>("Update task")),
        finalize(()=> this.loadingService.hideLoading())
        
    )   
  }

}
