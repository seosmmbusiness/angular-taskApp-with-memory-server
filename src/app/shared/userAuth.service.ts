import { Injectable } from '@angular/core';
import { USERS } from '../mock-users';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { HandleErrorService } from './handleError.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private userData = new BehaviorSubject<User>({id:null,name: null});
  currentUser = this.userData.asObservable();

  constructor(private handleError:HandleErrorService, private loadingService:LoadingService) { }

  updateUser(user:User) {
    console.log(user)
    this.userData.next(user)
  }

  getUser(): Observable<User> {
    this.loadingService.showLoading();
    return of(USERS).pipe(
      finalize(()=> this.loadingService.hideLoading()),
      catchError(this.handleError.handleError<User>("Generating user ID"))
    )
  }
}
