export class GloalContext {

    static globalContext:Map<String,Map<String,any>> = new Map<String,Map<String,any>>();

    public static get(id:string) {
        let context = this.globalContext.get(id);
        if( ! context ) {
            context = new Map<String,any>();
        }
        
        return context;
    }
}