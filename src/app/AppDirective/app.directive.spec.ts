import { ElementRef, Renderer2 } from '@angular/core';
import { AppDirective } from './app.directive';
import { inject } from '@angular/core/testing';

describe('AppDirective', () => {
  it('should create an instance', inject([], (element:ElementRef,renderer:Renderer2) => {
    const directive = new AppDirective(element,renderer);
    expect(directive).toBeTruthy();
  }));
});
