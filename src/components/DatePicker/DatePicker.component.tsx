import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { useTheme } from '@mui/material';

interface DatePickerProps {
    isInverted?: boolean;
    defaultDate?: { from: Date; to: Date };
    setExternalState?: React.Dispatch<React.SetStateAction<{ from: Date; to: Date }>>;
}

const DatePicker: React.FC<DatePickerProps> = ({ isInverted = false, defaultDate, setExternalState }) => {
    const [range, setRange] = useState<{ from: Date; to: Date }>({ from: new Date(), to: new Date() });
    const theme = useTheme();

    const customStyles = {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        '--rdp-font-family': theme.typography.fontFamily,
        '--rdp-selected-font': 'inherit',
        '--rdp-accent-color': 'white',
        '--rdp-accent-background-color': theme.palette.primary.main,
        '--rdp-range_start-color': theme.palette.primary.main,
        '--rdp-range_end-color': theme.palette.primary.main,
        '--rdp-range_middle-background-color': '#C1CFF2',
        '--rdp-range_middle-foreground-color': 'white',
        borderRadius: '40px',
        padding: '26px 24px 40px',
        // boxShadow: '0px 10px 70px 0px #00000033',
    } as React.CSSProperties;

    React.useEffect(() => {
        if (isInverted) {
            import('./inverted-date-picker.css').then(() => {
                console.log('Inverted styles loaded');
            });
        }
    }, [isInverted]);

    React.useEffect(() => {
        if (defaultDate) {
            const { from, to } = defaultDate;
            if (from instanceof Date && to instanceof Date) {
                setRange(defaultDate);
                if (setExternalState) {
                    setExternalState(defaultDate)
                }
            }
        }
    }, [defaultDate]);

    const today = new Date();
    const disabledDays = { before: today };
    const modifiers = {
        start: range.from,
        end: range.to,
        disabled: disabledDays,
    };

    return (
        <div className={isInverted ? 'inverted-day-picker' : 'normal-day-picker'}>
            <DayPicker
                style={isInverted ? customStyles : undefined}
                className="rdp-root"
                captionLayout="label"
                dir="ltr"
                min={0}
                mode="range"
                numberOfMonths={1}
                showOutsideDays
                timeZone="Europe/London"
                weekStartsOn={0}
                disabled={disabledDays}
                modifiers={modifiers}
                selected={range}
                onSelect={(selectedDate) => {
                    if (selectedDate) {
                        setRange(selectedDate as { from: Date; to: Date });
                    }
                    if (setExternalState) {
                        setExternalState(selectedDate as { from: Date; to: Date });
                    }
                }}
            />
        </div>
    );
}

export default DatePicker;