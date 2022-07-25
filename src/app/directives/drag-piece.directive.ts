import { DOCUMENT } from "@angular/common";
import { Directive, ElementRef, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { fromEvent, Subscription, takeUntil } from "rxjs";
import { Coordinate } from "../beans/coordinate";

@Directive({
    selector: "[draggablePiece]",
})

export class DragPieceDirective implements OnInit, OnDestroy {

    @Input() coordinate: Coordinate | undefined;

    private element!: HTMLElement;
    private dropDivs!: HTMLElement | null;
    
    private subscriptions: Subscription[] = [];

    constructor(private elementRef: ElementRef, @Inject(DOCUMENT) private document: Document) {}

    ngOnInit(): void {
        this.element = this.elementRef.nativeElement as HTMLElement;
        this.dropDivs = this.document.getElementById('dropPiece');
        this.initDrag();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s?.unsubscribe());
    }

    initDrag() {
        if (!this.element.className.split(' ').includes('piece-12')) {
            const dragStart = fromEvent<MouseEvent>(this.element, 'mousedown');
            const dragEnd = fromEvent<MouseEvent>(this.document, 'mouseup');
            const drag =  fromEvent<MouseEvent>(this.document, 'mousemove').pipe(takeUntil(dragEnd));

            let initialX: number, initialY: number, currentX = 0, currentY = 0;

            let dragSub: Subscription = new Subscription();

            const dragStartSub = dragStart.subscribe((event: MouseEvent) => {
                initialX = event.clientX - currentX;
                initialY = event.clientY - currentY;

                this.element.classList.add('free-draging');

                dragSub = drag.subscribe((event: MouseEvent) => {
                    event.preventDefault();

                    currentX = event.clientX - initialX;
                    currentY = event.clientY - initialY;

                    this.element.style.transform = 'translate3d(' + currentX + 'px, ' + currentY + 'px, 0)';
                });
            });

            const dragEndSub = dragEnd.subscribe(() => {
                initialX = currentX;
                initialY = currentY;

                this.element.classList.remove('free-draging');

                if (dragSub) {
                    dragSub.unsubscribe();
                }
            });

            this.subscriptions.push.apply(this.subscriptions, [
                dragStartSub,
                dragSub,
                dragEndSub,
            ]);
        }
    }
}