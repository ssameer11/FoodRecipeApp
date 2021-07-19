import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class LoggingService{

    prevMessge : string;
    printStuff(message: string) {
        this.prevMessge = message;
    }
}