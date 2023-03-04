export interface InputHandler {
    activeKeys: Map<string, boolean>;
    isKeyDown(key: string): boolean;
}

export class InputHandler {
    activeKeys: Map<string, boolean>;

    constructor(){
        this.activeKeys = new Map<string, boolean>();

        document.addEventListener('keydown', (e) => {
            this.activeKeys.set(e.key, true);
        });

        document.addEventListener('keyup', (e) => {
            if(this.activeKeys.has(e.key)){
                this.activeKeys.delete(e.key);
            }
        });
    }

    isKeyDown(key : string): boolean{
        return this.activeKeys.has(key);
    }
} 