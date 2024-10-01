import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormSignUp } from './sign-up.interface';
import { hasEmailError, isRequired } from '../../utils/validators';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent],
  templateUrl: './sign-up.component.html',
  styles: ``
})
export default class SignUpComponent {

  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  isEmailRequired() {
    return hasEmailError(this.form);
  }

  form = this._fb.group<FormSignUp>({
    email: this._fb.control(null, [Validators.email, Validators.required]),
    password: this._fb.control(null, Validators.required),
  });

  async create() {
    if (this.form.invalid) {
      return;
    }

    try {
      const { email, password } = this.form.value;
  
      if (!email || !password) {
        return;
      }
      // create user
      console.log({email, password});
      await this._authService.signUp({ email, password });
      toast.success('Usuario creado correctamente');
      this._router.navigateByUrl('/auth/sign-in');
    } catch (error:any) {
      console.log(error);
      toast.error('Ocurrió un error al crear el usuario');
    }
  }

  async submitWithGoogle() {
    try {
      await this._authService.signInWithGoogle();
      toast.success('Inicio de sesión correcto');
      this._router.navigateByUrl('/tasks');
    } catch (error:any) {
      console.log(error);
      toast.error('Ocurrió un error al iniciar sesión con Google');
    }
  }

}