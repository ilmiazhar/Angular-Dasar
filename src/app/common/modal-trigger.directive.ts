import { Directive, ElementRef, Inject, OnInit, Input } from '@angular/core';
import { JQ_TOKEN } from './jQuery.service';

@Directive({
  selector: '[modal-trigger]',
})
export class ModalTriggerDirective implements OnInit {
   public el: HTMLElement;
   @Input("modal-trigger") modalId?: string;

  constructor(ref: ElementRef, @Inject(JQ_TOKEN) public $: any) {
    this.el = ref.nativeElement;
  }

  ngOnInit() {
    this.el.addEventListener('click', (e) => {
      this.$(`#${this.modalId}`).modal({});
    });
  }
}
