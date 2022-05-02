import {CalendarIcon, IconButton, majorScale, minorScale, Pane, TextInput, useTheme} from "evergreen-ui";
import React, {FC, useRef, useState} from "react";
import {DayPicker} from "react-day-picker";
import {usePopper} from 'react-popper';
import {format} from "date-fns";
import './date-picker-styles.css';

interface Props {
    label: string
    disabled?: boolean
}

export const Datepicker: FC<Props> = ({disabled, label}) => {
    const theme = useTheme()
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()

    const [startDatepickerOpen, setStartDatepickerOpen] = useState<boolean>(false)
    const [endDatepickerOpen, setEndDatepickerOpen] = useState<boolean>(false)

    const popperRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
        null
    );

    const popper = usePopper(popperRef.current, popperElement, {
        placement: 'bottom-start'
    });

    const openStartDatepicker = (): void => {
        setStartDatepickerOpen(true)
    }

    const closeStartDatepicker = (): void => {
        setStartDatepickerOpen(false)
        buttonRef?.current?.focus();
    }

    const selectStartDate = (date: Date | undefined): void => {
        console.log({date})
        if (date) {
            setStartDate(new Date(format(date, 'mm/dd/yyyy')));
            closeStartDatepicker();
        }
    }

    const handleBlur = () => {
        closeStartDatepicker()
    }

    return (
        <Pane>
            <Pane is="label">{label}</Pane>
            <Pane display="flex" gap={minorScale(1)} alignItems="center" marginTop={majorScale(1)}>
                <Pane position="relative">
                    <TextInput width={majorScale(16)} placeholder="mm/dd/yyyy" disabled={disabled}/>
                    <IconButton
                        ref={buttonRef}
                        disabled={disabled}
                        icon={CalendarIcon}
                        appearance="minimal"
                        aria-label="Pick a start date"
                        onClick={openStartDatepicker}
                    />
                    {
                        startDatepickerOpen && (
                            <Pane position="absolute" marginTop={minorScale(1)} zIndex="2">
                                <DayPicker
                                    initialFocus={startDatepickerOpen}
                                    fromYear={2015} toYear={2025} captionLayout="dropdown"
                                    defaultMonth={startDate}
                                    selected={startDate}
                                    onSelect={selectStartDate}
                                />
                            </Pane>
                        )
                    }
                </Pane>
                <Pane color={theme.colors.gray800}>-</Pane>
                <Pane>
                    <TextInput width={majorScale(16)} placeholder="mm/dd/yyyy" disabled={disabled}/>
                    <IconButton
                        disabled={disabled}
                        icon={CalendarIcon}
                        appearance="minimal"
                        aria-label="Pick an end date"
                    />
                </Pane>
            </Pane>
        </Pane>
    )
}
