import { Routes } from '@angular/router';
import { TodoSignalComponent } from './todo-signal/todo-signal.component';
import { TodoComponent } from './todo/todo.component';

export const routes: Routes = [
  { path: '', component: TodoComponent },
  { path: 'signal-todo', component: TodoSignalComponent },
];
