import { LwjTableColumn, LwjTableData, LwjTableDataSchema } from '@/common/schema/model';
import { load, save } from '@/src/repository';
import { convert } from '@/src/utils';
import { Box, Container, Grow, Paper, Radio, TextField } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

const initialTableData: LwjTableData = {
    chordProgressionIndex: 1,
    scaleIndex: 2,
    convertedIndex: 3,
    columns: [
        {
            header: 'Title',
            width: 256,
            cells: [
                {
                    value: '',
                },
            ],
        },
        {
            header: 'Chord Progression',
            width: 128,
            cells: [
                {
                    value: '',
                },
            ],
        },
        {
            header: 'Scale',
            width: 128,
            cells: [
                {
                    value: '',
                },
            ],
        },
        {
            header: 'Converted',
            width: 128,
            cells: [
                {
                    value: '',
                },
            ],
        },
    ],
};

class LwjTable {
    private tableData: LwjTableData;

    public get width() {
        return this.tableData.columns.length;
    }

    public get height() {
        return this.tableData.columns.reduce((acc, column) => {
            return Math.max(acc, column?.cells?.length ?? 0);
        }, 0);
    }

    constructor(tableData: LwjTableData) {
        this.tableData = tableData;
    }

    public getColumn(x: number) {
        return this.tableData.columns[x];
    }
}

const App = () => {
    const [tableData, setTableData] =
        useState<LwjTableData>(() => {
            const saved = load('table');
            console.log(saved);

            if (saved === null) {
                console.log('No saved data found. Using initial data.');

                return initialTableData;
            }

            const json = JSON.parse(saved);
            console.log(json);

            // TODO: 예외 처리
            const parsed = LwjTableDataSchema.safeParse(json);

            if (!parsed.success) {
                console.log('Failed to parse saved data. Using initial data.');

                return initialTableData;
            }

            return parsed.data;
        });

    const table = useMemo(() => {
        const json = JSON.stringify(tableData);
        save('table', json);
        console.log('Saved table data.');

        const newTable = new LwjTable(tableData);

        if (newTable.width < 3 || newTable.height < 1) {
            console.log('Table is too small. Using initial data.');
            save(`table-${Date.now()}`, JSON.stringify(initialTableData));
            console.log('Backup created.');

            return new LwjTable(initialTableData);
        }

        const maxColumnLength = Math.max(
            tableData.chordProgressionIndex,
            tableData.scaleIndex,
            tableData.convertedIndex,
        );

        if (tableData.columns[maxColumnLength] === undefined ||
            tableData.columns[maxColumnLength] === null) {
            tableData.columns[maxColumnLength] = createColumn(table.height);

            return new LwjTable(tableData);
        }

        return newTable;
    }, [tableData]);

    const createColumn = (height: number): LwjTableColumn => {
        return {
            header: '',
            width: 128,
            cells: Array.from({
                length: height,
            }).map(() => ({
                value: '',
            })),
        };
    };

    const handleHeaderChange = useCallback((
        x: number,
        value: string,
    ) => {
        const newTableData: LwjTableData = {
            ...tableData,
        };

        if (newTableData.columns[x] === undefined ||
            newTableData.columns[x] === null) {
            newTableData.columns[x] = createColumn(table.height);
        }

        newTableData.columns[x].header = value;

        setTableData(newTableData);
    }, [tableData, setTableData]);

    const handleCellChange = useCallback((
        x: number,
        y: number,
        value: string,
    ) => {
        const newTableData: LwjTableData = {
            ...tableData,
        };


        if (newTableData.columns[x] === undefined ||
            newTableData.columns[x] === null) {
            newTableData.columns[x] = createColumn(table.height);
        }

        if (newTableData.columns[x].cells[y] === undefined ||
            newTableData.columns[x].cells[y] === null
        ) {
            newTableData.columns.forEach((column) => {
                if (column) {
                    column.cells[y] = {
                        value: '',
                    };
                }
            });

            newTableData.columns[x].cells[y] = {
                value: '',
            };
        }

        const cell = newTableData.columns[x].cells[y];

        cell.value = value;

        const convertedCell = newTableData.columns[tableData.convertedIndex]
            ?.cells[y];
        const chordProgressionCell = newTableData
            .columns[tableData.chordProgressionIndex]
            ?.cells[y];
        const scaleCell = newTableData.columns[tableData.scaleIndex]
            ?.cells[y];

        if (chordProgressionCell && scaleCell && convertedCell) {
            try {
                convertedCell.value = convert(
                    chordProgressionCell.value.split(' '),
                    scaleCell.value,
                ).join('-');
            } catch (e) {
                // console.log(e);
            }
        }

        setTableData(newTableData);
    }, [tableData, setTableData]);

    return (
        <Container
            sx={{
                height: '100vh',
            }}
            maxWidth="lg">
            <Box
                sx={{
                    padding: '16px',
                    maxHeight: '100%',
                    overflow: 'auto',
                    boxSizing: 'border-box',
                }}
                display={'flex'}
                flexDirection={'row'}
                gap={2}
                component={Paper} >
                {Array.from({
                    length: table.width + 1,
                }).map((_, x) => (
                    <Box
                        key={x}
                        width={table.getColumn(x)?.width ?? 128}
                        display={'flex'}
                        flexDirection={'column'}
                        gap={2}>

                        <TextField
                            value={table.getColumn(x)?.header ?? ''}
                            size="small"
                            onChange={(e) => {
                                handleHeaderChange(
                                    x,
                                    e.target.value,
                                );
                            }}
                            fullWidth/>

                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            justifyContent={'center'}
                            gap={1} >
                            <Radio
                                size="small"
                                checked={tableData.chordProgressionIndex === x}
                                color="primary"
                                onChange={() => {
                                    setTableData({
                                        ...tableData,
                                        chordProgressionIndex: x,
                                    });
                                }}/>

                            <Radio
                                size="small"
                                checked={tableData.scaleIndex === x}
                                color="secondary"
                                onChange={() => {
                                    setTableData({
                                        ...tableData,
                                        scaleIndex: x,
                                    });
                                }}/>
                            <Radio
                                size="small"
                                checked={tableData.convertedIndex === x}
                                color="success"
                                onChange={() => {
                                    setTableData({
                                        ...tableData,
                                        convertedIndex: x,
                                    });
                                }}/>
                        </Box>
                        {Array.from({
                            length: table.height + 1,
                        }).map((_, y) => (
                            <Grow
                                key={y}
                                in={true}>
                                <Box>
                                    <TextField
                                        value={table.getColumn(x)?.cells[y]?.value ?? ''}
                                        size="small"
                                        onChange={(e) => {
                                            handleCellChange(
                                                x,
                                                y,
                                                e.target.value,
                                            );
                                        }}
                                        autoComplete="off"
                                        fullWidth />
                                </Box>
                            </Grow>
                        ))}
                    </Box>
                ))}
            </Box>
        </Container>
    );
};

export default App;
