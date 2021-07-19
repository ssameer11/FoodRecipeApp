import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core'

@Directive({
    selector:'[appNavDropdown]'
})
export class NavDrop{

    private isOpen: boolean = true;
    constructor(private elRef: ElementRef,private renderer: Renderer2){};
    
    @HostListener('click') dropdownClick(eventData: Event){
        const theElement = this.elRef.nativeElement.parentNode.querySelector('ul'); 
        if(this.isOpen){
            this.renderer.addClass(theElement,'show');
            this.isOpen = !this.isOpen
        }else {
            this.renderer.removeClass(theElement,'show');
            this.isOpen = !this.isOpen;
        }
    }
}