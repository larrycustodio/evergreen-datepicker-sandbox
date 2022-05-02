import React from 'react';
import {Heading, majorScale, minorScale, Pane, TextInput} from 'evergreen-ui'
import {Datepicker} from './datepicker-proto'

function App() {
    return (
        <Pane className="App" margin={majorScale(3)}>
            <header className="App-header">
                <Heading marginBottom={majorScale(2)}>
                    Datepicker Prototype
                </Heading>
                <Pane marginBottom={majorScale(2)}>
                    <Datepicker label="Default"/>
                </Pane>
                {/*<Pane marginBottom={majorScale(1)}>*/}
                {/*    <Datepicker label="Disabled" disabled/>*/}
                {/*</Pane>*/}
            </header>
        </Pane>
    );
}

export default App;
