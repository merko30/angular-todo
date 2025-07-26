import { Injectable } from '@angular/core';
import { ModalHostComponent } from './modal-host/modal-host.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private host!: ModalHostComponent;

  registerHost(host: ModalHostComponent) {
    this.host = host;
  }

  open(component: any) {
    this.host.open(component);
  }

  close() {
    this.host.close();
  }
}
