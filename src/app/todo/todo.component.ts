import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit {
  taskControl = new FormControl();
  tasks$ = new BehaviorSubject<string[]>([]);
  filteredTasks: Observable<string[]> = of([]);

  ngOnInit() {
    this.filteredTasks = combineLatest([
      this.taskControl.valueChanges.pipe(startWith('')),
      this.tasks$,
    ]).pipe(
      map(([task, tasks]) =>
        tasks.filter((taskItem) =>
          taskItem.toLowerCase().includes(task.toLowerCase())
        )
      )
    );
  }

  addTask(event: Event) {
    event.preventDefault();
    const taskValue = this.taskControl.value;
    if (taskValue !== '' && !this.tasks$.getValue().includes(taskValue)) {
      this.tasks$.next([...this.tasks$.getValue(), taskValue]);
      this.taskControl.setValue('');
    }
  }

  deleteTask(index: number) {
    const currentTasks = this.tasks$.getValue();
    currentTasks.splice(index, 1);
    this.tasks$.next(currentTasks);
  }
}
