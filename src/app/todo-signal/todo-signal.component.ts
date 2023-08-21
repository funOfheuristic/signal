import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  signal,
  computed,
  inject,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../service/data.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Subject, concatMap, debounceTime, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-todo-signal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './todo-signal.component.html',
  styleUrls: ['./todo-signal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoSignalComponent {
  taskString = signal('');
  tasks: WritableSignal<string[]> = signal([]);
  dataService = inject(DataService);
  addSubject$: Subject<string> = new Subject();
  deleteSubject$: Subject<number> = new Subject();
  loader = false;

  constructor() {
    const userTasks = toSignal(this.dataService.getTask(), {
      initialValue: [],
    });

    this.tasks.set(userTasks());

    const addedTaskSignal = toSignal(
      this.addSubject$.pipe(
        tap(() => (this.loader = true)),
        switchMap((task) => this.dataService.addTask(task)),
        tap((task) => this.tasks.update((tasks) => [...tasks, task]))
      )
    );

    toSignal(
      this.deleteSubject$.pipe(
        concatMap((index) => this.dataService.deleteTask(index)),
        tap((index) =>
          this.tasks.update((tasks) => {
            tasks.splice(index, 1);
            return tasks;
          })
        )
      )
    );

    effect(() => {
      console.log(
        `your task are updated ${addedTaskSignal()} is added successfully`
      );
      this.loader = false;
    });
  }

  filteredTasks = computed(() =>
    this.tasks().filter((task) => task.includes(this.taskString()))
  );

  search(event: Event) {
    this.taskString.set((event.target as HTMLInputElement).value);
  }

  addTask(event: Event) {
    event.preventDefault();
    if (this.taskString() !== '' && !this.tasks().includes(this.taskString())) {
      // this.tasks.update((tasks) => [...tasks, this.taskString()]);
      this.addSubject$.next(this.taskString());
      this.taskString.set('');
    }
  }

  deleteTask(index: number) {
    // this.tasks.update((tasks) => {
    //   tasks.splice(index, 1);
    //   return tasks;
    // });
    this.deleteSubject$.next(index);
  }
}
