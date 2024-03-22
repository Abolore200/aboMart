import { ElementRef, Renderer2 } from '@angular/core';
import { AppDirective } from './app.directive';
import { inject } from '@angular/core/testing';

describe('AppDirective', () => {
  it('should create an instance', () => {
    const directive = new AppDirective();
    expect(directive).toBeTruthy();
  });
});
