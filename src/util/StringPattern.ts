export enum PatternTokenType {
    STRING = 'STRING',
    PARAM = 'PARAM',
    NEWLINE = 'NEWLINE'
}

export interface PatternToken {
    type: PatternTokenType,
    value?: string
}

export class StringPattern {
    public static format(pattern:string, params:Map<String,String|undefined> ): string {
        return '';
    }

    public static split(pattern:string) {

    }
}