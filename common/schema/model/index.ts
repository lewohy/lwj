import { z } from 'zod';

const chordNotationRegex = /([A-G])([#|b]*)(.*)/;

export const NoteSchema = z.union([z.literal('A'), z.literal('B'), z.literal('C'), z.literal('D'), z.literal('E'), z.literal('F'), z.literal('G')]);
export type Note = z.infer<typeof NoteSchema>;

export const ChordSchema = z.string()
    .refine((value) => chordNotationRegex.test(value))
    .transform((value) => {
        const notationData = chordNotationRegex.exec(value);

        if (!notationData) {
            throw new Error('Invalid chord notation');
        }

        const noteData = NoteSchema.safeParse(notationData[1]);

        if (!noteData.success) {
            throw new Error('Invalid note');
        }

        return {
            note: noteData.data,
            modifier: notationData[2],
            suffix: notationData[3],
        };
    });
export type Chord = z.infer<typeof ChordSchema>;


