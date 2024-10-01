import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "@angular/fire/auth";

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _auth = inject(Auth);
  // private _http = inject(HttpClient);

  signUp(user: User) {
    return createUserWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    );
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(this._auth, user.email, user.password);
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    return signInWithPopup(this._auth, provider);
  }
}
