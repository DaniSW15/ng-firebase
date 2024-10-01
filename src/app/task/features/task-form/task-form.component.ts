import { AfterViewInit, Component, effect, inject, input, signal } from "@angular/core";
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { Task, TaskCreate, TaskService } from "../../data-access/task.service";
import { toast } from "ngx-sonner";

@Component({
  selector: "app-task-form",
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: "./task-form.component.html",
  styles: ``,
  providers: [TaskService]
})
export default class TaskFormComponent {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private router = inject(Router);
  loading = signal(false);
  id = input.required<string>();

  taskForm = this.fb.group({
    title: this.fb.control("", Validators.required),
    completed: this.fb.control(false, Validators.required),
  });

  constructor() {
    effect(() => {
      console.log(this.id());
      const id = this.id();
      if (id) this.getTask(id);
    });
  }

  async onSubmit() {
    if (this.taskForm.invalid) return;

    try {
      this.loading.set(true);
      const { title, completed } = this.taskForm.value;
      const task: TaskCreate = { title: title || "", completed: !!completed };
      const id = this.id();

      if (id) {
        await this.taskService.update(id, task);
      } else {
        await this.taskService.create(task);
      }
      toast.success(`Task ${id ? "updated" : "created"} successfully`);
      this.router.navigate(["/tasks"]);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the task");
    } finally {
      this.loading.set(false);
    }
  }

  async getTask(id: string) {
    const taskSnapshot = await this.taskService.getTask(id);

    if (!taskSnapshot.exists()) return;

    const task = taskSnapshot.data() as Task;

    this.taskForm.patchValue(task);
  }
}
