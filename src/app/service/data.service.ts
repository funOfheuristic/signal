import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  tasks: string[] = ['Workout', 'Study', 'Grocery'];
  constructor() {}

  getTask(): Observable<string[]> {
    return of(this.tasks);
  }
  addTask(task: string) {
    return of(task).pipe(delay(2000));
  }
  deleteTask(index: number) {
    return of(index);
  }
}
