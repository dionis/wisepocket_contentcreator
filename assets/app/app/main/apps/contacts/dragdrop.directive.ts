import {Directive, HostListener} from '@angular/core'

@Directive({
    selector: '[dragdrop]',
})

export class DragDorpDirective{
    constructor(){}

    @HostListener('dragover', ['$event'])
    onDragOver(event){
        event.preventDefault();
        event.stopPropagation();
        console.log('DragOver',event);
    }

    @HostListener('dragleave',['$event'])
    onDragLeave(event){
        event.preventDefault();
        event.stopPropagation();
        console.log('DragLeave',event);
    }

    @HostListener('drop', ['$event'])
    onDrop(event){
        event.preventDefault();
        event.stopPropagation();
        console.log('DROP',event);
    }
}
