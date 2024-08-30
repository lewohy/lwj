import { Chord, ChordSchema } from '@/common/schema/model';

/**
 * C, C#, D, ... 의 수치 변환 테이블
 */
const table1 = [
    1,
    1.5,
    2,
    2.5,
    3,
    4,
    4.5,
    5,
    5.5,
    6,
    6.5,
    7,
];

/**
 * C, D, E, ...의 수치 변환 테이블
 */
const table2 = {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11,
};

/**
 * 수치를 I, IIb, II, ...로 변환 테이블
 */
const table3 = [
    'I',
    'IIb',
    'II',
    'IIIb',
    'III',
    'IV',
    'Vb',
    'V',
    'VIb',
    'VI',
    'VIIb',
    'VII',
];

function parseModifier(modifier?: string): number {
    let value = 0;

    for (const char of modifier?.split('') ?? []) {
        if (char === '#') {
            value++;
        } else if (char === 'b') {
            value--;
        } else {
            throw new Error('Invalid modifier');
        }
    }

    return value;
}

function parseToValue(chord: Chord): number {
    const baseStep = table2[chord.note];
    const modifierValue = parseModifier(chord.modifier);
    const index = (baseStep + modifierValue + table1.length) %
        table1.length;

    return table1[index];
}

export function convert(chordNotations: string[], keyScale: string): string[] {
    const chords = chordNotations.map((chordNotation) => {
        return ChordSchema.safeParse(chordNotation);
    }).map((chord) => {
        if (!chord.success) {
            throw new Error('Invalid chord notation');
        }

        return chord.data;
    });

    const key = [ChordSchema.safeParse(keyScale)].map((chord) => {
        if (!chord.success) {
            throw new Error('Invalid key scale');
        }

        return chord.data;
    }).pop();

    if (!key) {
        throw new Error('Invalid key scale');
    }

    return chords.map((chord) => {
        const value = parseToValue(chord);
        const keyValue = parseToValue(key);

        const tmp = (
            table1.indexOf(value) - table1.indexOf(keyValue) + table1.length
        ) % table1.length;

        return table3[tmp] + chord.suffix;
    });
}
