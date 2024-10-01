import { Component, effect, input } from '@angular/core';
import { Task } from '../../data-access/task.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './table.component.html',
  styles: ``
})
export class TableComponent {
  tasks = input.required<Task[]>();
}
