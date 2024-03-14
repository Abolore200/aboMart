import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appApp]'
})
export class AppDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  @Input() set appApp(value:Object){
    const entries = Object.entries(value)
    entries.forEach(entry => {
      if(entry[1]){
        this.renderer.addClass(this.element.nativeElement, entry[0])
      } else {
        this.renderer.removeClass(this.element.nativeElement, entry[0])
      }
    })
  }
}
