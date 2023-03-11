import { Observable } from "rxjs";

export interface OnExit {
    onExit: () => Observable<boolean> | Promise<boolean> | boolean;
}