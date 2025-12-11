import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderStateService {
  private estadoHeaderSubject = new BehaviorSubject<'home-top' | 'default'>('default');
  estadoHeader$ = this.estadoHeaderSubject.asObservable();

  setEstado(estado: 'home-top' | 'default') {
    this.estadoHeaderSubject.next(estado);
  }
}
