import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { periods } from "./constants";


function ChartPeriods({ selectedPeriod, setSelectedPeriod }) {

    const handleClick = (period) => {
        setSelectedPeriod(period);
    };

    return (
        <ButtonGroup aria-label="Basic example">
            {periods.map((period) => (
                <Button
                    key={period.label}
                    variant="secondary"
                    onClick={() => handleClick(period)}
                    active={selectedPeriod.label === period.label}
                >{period.label}

                </Button>
            ))};

        </ButtonGroup>
    )
};

export default ChartPeriods;