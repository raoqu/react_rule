export enum PatternTokenType {
    STRING = 'STRING',
    PARAM = 'PARAM',
    NEWLINE = 'NEWLINE'
}

const TEMPLATE_SPLIT_PATTERN = /(#\{\w+\})/g
const TEMPLATE_PATTERN = /#\{(\w+)\}/

export class PatternToken {
    constructor(public type: PatternTokenType, public value?: string) {
    }
}

/**
 * a simple parameterized string template util
 */
export class StringPattern {
    /**
     * format template pattern 
     * e.g.  'This is an #{something}, it looks good.' with params {something:'apple'} => 'This is an apple, it looks good'
     * @param pattern 
     * @param params 
     * @returns 
     */
    public static format(pattern: string, params: Map<String, string | undefined>): string {
        const tokens = StringPattern.split(pattern)
        let str = ''
        tokens && tokens.map((token) => {
            let val = token.value || '';
            if( token.type == PatternTokenType.PARAM ) {
                val = (params && params.get(val)) || '$';
            }
            str = str + val;
        })
        return str;
    }

    /**
     * split string template tokens, a pattern of '#{...}' is 
     * @param pattern 
     * @returns 
     */
    public static split(pattern: string): PatternToken[] {
        if (!pattern) {
            return [];
        }

        const parts = pattern.split(TEMPLATE_SPLIT_PATTERN)
        if (!parts) {
            return [];
        }

        let tokens: PatternToken[] = []
        let m = undefined
        let key = undefined
        let val = undefined
        parts.map((s) => {
            m = s.match(TEMPLATE_PATTERN);
            if (m && m.length > 1) {
                key = m[1]
                tokens.push(new PatternToken(PatternTokenType.PARAM, key))
            }
            else {
                tokens.push(new PatternToken(PatternTokenType.STRING, s))
            }
        })
        return tokens;
    }
}