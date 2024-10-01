import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";

import { routes } from "./app.routes";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: "angular18-91de3",
        appId: "1:1009697330713:web:917c4ec31e178cd49b7c88",
        storageBucket: "angular18-91de3.appspot.com",
        apiKey: "AIzaSyDyugFuNsvjPS00-MkBRYx0CcpRTowL75M",
        authDomain: "angular18-91de3.firebaseapp.com",
        messagingSenderId: "1009697330713",
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
