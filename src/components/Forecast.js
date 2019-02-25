import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card, DataTable, Avatar} from 'react-native-paper';

export default class Forecast extends Component {
    render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Title
                        title={this.props.name}
                        subtitle='Current Forecast'
                    />
                    <DataTable>
                        <DataTable.Row>
                            <DataTable.Cell>Outlook:</DataTable.Cell>
                            <DataTable.Cell>{this.props.description}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Temperature:</DataTable.Cell>
                            <DataTable.Cell>{`${this.props.temp}°c`}</DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </Card.Content>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 130
    },
    bigText: {
        flex: 2,
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#000'
    },
    mainText: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        color: '#a82dff'
    }
});