import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoSignalComponent } from './todo-signal.component';

describe('TodoSignalComponent', () => {
  let component: TodoSignalComponent;
  let fixture: ComponentFixture<TodoSignalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoSignalComponent]
    });
    fixture = TestBed.createComponent(TodoSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
