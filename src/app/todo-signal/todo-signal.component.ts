import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  filteredTasks = computed(() =>
    this.tasks().filter((task) => task.includes(this.taskString()))
  );

  search(event: Event) {
    this.taskString.set((event.target as HTMLInputElement).value);
  }

  addTask(event: Event) {
    event.preventDefault();
    if (this.taskString() !== '' && !this.tasks().includes(this.taskString())) {
      this.tasks.update((tasks) => [...tasks, this.taskString()]);
      this.taskString.set('');
    }
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => {
      tasks.splice(index, 1);
      return tasks;
    });
  }
}
