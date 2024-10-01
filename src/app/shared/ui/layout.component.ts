import { Component, inject } from "@angular/core";
import { AuthStateService } from "../data-access/auth-state.service";
import { Router, RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [RouterModule, RouterLink],
  template: `
    <header class="h-[80px] mb-8 w-full max-w-screen-lg mx-auto px-4">
      <nav class="flex items-center justify-between h-full">
        <a class="text-2xl font-bold" routerLink="/tasks">Ng Taks</a>
        <button (click)="logOut()">Salir</button>
      </nav>
    </header>
    <router-outlet />
  `,
})
export default class LayoutComponent {
  private _authState = inject(AuthStateService);
  private _router = inject(Router);

  async logOut() {
    await this._authState.logOut();
    this._router.navigateByUrl("/auth/sign-in");
  }
}
