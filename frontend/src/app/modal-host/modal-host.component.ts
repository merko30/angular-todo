import {
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-modal-host',
  imports: [],
  templateUrl: './modal-host.component.html',
  styleUrl: './modal-host.component.css',
})
export class ModalHostComponent {
  @ViewChild('modalHost', { read: ViewContainerRef, static: true })
  modalHost!: ViewContainerRef;

  open(component: any): ComponentRef<any> {
    if (this.modalHost) {
      this.modalHost.clear();
    }
    return this.modalHost.createComponent(component);
  }

  close() {
    this.modalHost.clear();
  }
}
