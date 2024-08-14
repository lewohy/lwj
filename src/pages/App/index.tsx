import { convert } from '@/src/utils';
import { Box, Container, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

const App = () => {
    const [keyProgression, setKeyProgression] = useState(
        `C D E F G A B\n` +
        `F G A Bb C D E\n` +
        `Bb C D Eb F G A\n` +
        `Eb F G Ab Bb C D\n` +
        `Ab Bb C Db Eb F G\n` +
        `Db Eb F Gb Ab Bb C\n` +
        `Gb Ab Bb B Db Eb F\n` +
        `B Db Eb E Gb Ab Bb\n` +
        `E Gb Ab A B Db Eb\n` +
        `A B Db D E Gb Ab\n` +
        `D E Gb G A B Db\n` +
        `G A B C D E Gb`,
    );
    const [keyScale, setKeyScale] = useState('C');
    const [converted, setConverted] = useState('');

    useEffect(() => {
        const lines = keyProgression.split('\n');
        const list = lines.map((line) => line.split(' '));

        try {
            const result: string[] = [];

            for (const chords of list) {
                result.push(convert(chords, keyScale).join(' '));
            }

            setConverted(result.join('\n'));
        } catch (e) {
            console.log(e);
        }
    }, [keyProgression, keyScale]);


    return (
        <Container
            sx={{
                height: '100vh',
            }}
            maxWidth="lg">

            <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                width={'100%'}
                height={'100%'}
                flexDirection={'row'}
                gap={4}>

                <TextField
                    sx={{
                        flex: 1,
                    }}
                    value={keyProgression}
                    onChange={(e) => setKeyProgression(e.target.value)}
                    label={'Chord Progression'}
                    variant={'outlined'}
                    multiline />

                <TextField
                    value={keyScale}
                    onChange={(e) => setKeyScale(e.target.value)}
                    label={'Scale'}
                    variant={'outlined'} />

                <TextField
                    sx={{
                        flex: 1,
                    }}
                    InputProps={{
                        sx: {
                            fontFamily: 'Noto Sans Indic Siyaq Numbers',
                        },
                    }}
                    value={converted}
                    label={'Converted'}
                    variant={'outlined'}
                    multiline />
            </Box>
        </Container>
    );
};

export default App;
