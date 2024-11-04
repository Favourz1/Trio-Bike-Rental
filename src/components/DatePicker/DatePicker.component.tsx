import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { useTheme } from '@mui/material';

interface DatePickerProps {
    isInverted?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ isInverted = false }) => {
    const [selected, setSelected] = useState<Date>();
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
        boxShadow: '0px 10px 70px 0px #00000033',
    } as React.CSSProperties;

    React.useEffect(() => {
        if (isInverted) {
            import('./inverted-date-picker.css').then(() => {
                console.log('Inverted styles loaded');
            });
        }
    }, [isInverted]);

    const today = new Date();
    const disabledDays = { before: today };
    const modifiers = {
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
            />
        </div>
    );
}

export default DatePicker;