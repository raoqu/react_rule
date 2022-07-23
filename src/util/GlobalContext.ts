type InitFunction = (key: string) => any

const nonInit = (key: string) => { }

export class GlobalContext {

    static globalContext: Map<String, Map<String, any>> = new Map<String, Map<String, any>>();

    public static get(id:string):Map<String,any> {
        return this.globalContext.get(id)!
    }

    public static getOrInit(id: string) {
        let context = this.globalContext.get(id);
        if (!context) {
            context = new Map<String, any>();
            this.globalContext.set(id, context)
        }

        return context;
    }

    public static getField(context: Map<String, any>, key: string, init: InitFunction = nonInit) {
        let val = context.get(key)
        if (!val) {
            val = init(key)
            context.set(key, val)
        }
        return val
    }

    public static setField(context:Map<String,any>, key:string, val:any) {
        context.set(key, val)
    }
}