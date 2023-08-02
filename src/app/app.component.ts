import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './todo/todo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TodoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-signal-standalone';
  name: WritableSignal<string> = signal('Fun Of Heuristic!!!');

  ngOnInit(): void {
    setTimeout(() => {
      this.title = 'Some New Title';
      this.name.set('Changes Form Signal');
    }, 1000);
  }
}
