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


    const selectStartDate = (date: Date | undefined): void => {
        if (date) {
            // setStartDate(new Date(format(date, 'mm/dd/yyyy')));
            setStartDatepickerOpen(false);
        }
    }

    const handleBlurStartDate = (e: any): void => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setStartDatepickerOpen(false);
        }
    }

    const openEndDatepicker = (): void => {
        setEndDatepickerOpen(true)
    }

    const handleBlurEndDate = (e: any): void => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setEndDatepickerOpen(false);
        }
    }

    const selectEndDate = (date: Date | undefined): void => {
        if (date) {
            // setStartDate(new Date(format(date, 'mm/dd/yyyy')));
            setEndDatepickerOpen(false);
        }
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
                        size="small"
                        position="absolute"
                        top="50%"
                        right={`${minorScale(1)}px`}
                        transform="translateY(-50%)"
                    />
                    {
                        startDatepickerOpen && (
                            <Pane position="absolute" marginTop={minorScale(1)} zIndex="2" onBlur={handleBlurStartDate}>
                                <DayPicker
                                    initialFocus={startDatepickerOpen}
                                    fromYear={2015} toYear={2025} captionLayout="dropdown"
                                    defaultMonth={startDate}
                                    selected={startDate}
                                    onDayClick={selectStartDate}
                                />
                            </Pane>
                        )
                    }
                </Pane>
                <Pane color={theme.colors.gray800}>-</Pane>
                <Pane position="relative">
                    <TextInput width={majorScale(16)} placeholder="mm/dd/yyyy" disabled={disabled}/>
                    <IconButton
                        disabled={disabled}
                        icon={CalendarIcon}
                        appearance="minimal"
                        aria-label="Pick an end date"
                        size="small"
                        position="absolute"
                        top="50%"
                        right={`${minorScale(1)}px`}
                        transform="translateY(-50%)"
                        onClick={openEndDatepicker}
                    />
                    {
                        endDatepickerOpen && (
                            <Pane position="absolute" marginTop={minorScale(1)} zIndex="2" onBlur={handleBlurEndDate}>
                                <DayPicker
                                    initialFocus={endDatepickerOpen}
                                    fromYear={2015} toYear={2025} captionLayout="dropdown"
                                    defaultMonth={startDate}
                                    selected={startDate}
                                    onDayClick={selectEndDate}
                                />
                            </Pane>
                        )
                    }
                </Pane>
            </Pane>
        </Pane>
    )
}
