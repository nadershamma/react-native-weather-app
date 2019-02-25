import React from 'react';
import HomeActivity from "./components/HomeActivity";
import {Provider as PaperProvider} from "react-native-paper";

export default class Main extends React.Component {
    render() {
        return (
            <PaperProvider>
                <HomeActivity/>
            </PaperProvider>
        );
    }
}
