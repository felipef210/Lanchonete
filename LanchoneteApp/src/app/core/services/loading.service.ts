import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading = signal(false);
  private requestsAtivas = 0;

  mostrar() {
    this.requestsAtivas++;
    this.loading.set(true);
  }

  esconder() {
    this.requestsAtivas--;

    if (this.requestsAtivas <= 0) {
      this.requestsAtivas = 0;
      this.loading.set(false);
    }
  }
}
