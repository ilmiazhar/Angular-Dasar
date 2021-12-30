import { Directive, ElementRef, Inject, OnInit } from '@angular/core';
import { JQ_TOKEN } from './jQuery.service';

@Directive({
  selector: '[modal-trigger]',
})
export class ModalTriggerDirective implements OnInit {
   public el: HTMLElement;

  constructor(ref: ElementRef, @Inject(JQ_TOKEN) public $: any) {
    this.el = ref.nativeElement;
  }

  ngOnInit() {
    this.el.addEventListener('click', (e) => {
      this.$('#simple-modal').modal({});
    });
  }
}
