import { Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
    selector: "[appDropdown]"
})
export class DropdownDirective{

    private isOpen = true;
    constructor(private elRef: ElementRef,private renderer: Renderer2){};

    @HostListener('click') dropdownClick(eventData: Event){

        if(this.isOpen){
            this.renderer.addClass(this.elRef.nativeElement.querySelector('ul'),'show');
            this.isOpen = !this.isOpen;
        } else {
            this.renderer.removeClass(this.elRef.nativeElement.querySelector('ul'),'show');
            this.isOpen = !this.isOpen;
        }
    }
}