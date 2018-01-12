import { Injectable } from '@angular/core';

@Injectable()
export class PopupService {

    title: string;
    content: string;
    isOn: boolean;
    flagBtnCancel: boolean;

    private doSubmit: Function;
    private doCancel: Function;

constructor(){
    this.reset();
}

reset(): void {
    this.title = "Alert";
    this.content = "";
    this.isOn = false;
    this.doSubmit = null;
    this.doCancel = null;
    this.flagBtnCancel = true;
}

setTitle(title: string) {
    this.title =title;
}

setContent(content: string) {
    this.content =content;
}

show(): void {
    this.isOn = true;
}

hide(): void {
    this.isOn = false;
    this.reset();//to prepare for next popup
}

onSubmit(cb: Function): void {
    this.doSubmit = cb;
};

onCancel(cb: Function): void {
    this.doCancel = cb;
    this.enableCancel();
};

invokeSubmit(e): void {
if (this.doSubmit != null) {
    this.doSubmit();
}
}

invokeCancel(e): void {
if (this.doCancel != null) {
    this.doCancel();
}
}

isEnableCancel(): boolean{
    return this.flagBtnCancel;
}
enableCancel(): void{
        this.flagBtnCancel = true;
}
disableCancel(): void{
    this.flagBtnCancel = false;
}

showPopup(title: string, content: string, onAccepted: Function = null, onDenied: Function = null) {
    this.setTitle(title);
    this.setContent(content);
    if (onAccepted != null) {
        this.onSubmit(onAccepted);
    } else {
        this.onSubmit(() => this.hide());
    }
    if (onDenied != null) {
        this.onCancel(onDenied);
    } else {
        this.disableCancel();
    }
    this.show();
}
}