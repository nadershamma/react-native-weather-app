import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import OpenWeatherMap from "../lib/openWeatherMap";
import {fetchImage, randomInt} from "../lib/PixabayAPI";
import Forecast from './Forecast';
import {Appbar, Searchbar} from "react-native-paper";
import ImageBanner from "./ImageBanner";

class HomeActivity extends Component {
    constructor(props) {
        super(props);
        this.baseImage = require('../../assets/anemometer-3977718_1280.jpg');
        this.state = {location: '', forecast: null, locationName: '', image: this.baseImage};
        this._handleOnTextChange = this._handleOnTextChange.bind(this);
        this._handleOnTextSubmit = this._handleOnTextSubmit.bind(this);
        this._handleOnFocus = this._handleOnFocus.bind(this);
        this._setImageSource = this._setImageSource.bind(this);
    }

    _setImageSource(forecast) {
        if (forecast !== null) {
            fetchImage(forecast)
                .then(images => {
                    let imageUri = images[randomInt(images.length)].webformatURL;
                    this.setState({
                        image: {
                            uri: imageUri,
                        }
                    })
                });
        }
    }

    _handleOnFocus(e){
        this.setState({location: ''})
    }

    _handleOnTextChange(location) {
        this.setState({location: location});
    }

    _handleOnTextSubmit(e) {
        let postcode = e.nativeEvent.text;
        OpenWeatherMap.fetchForecast(postcode)
            .then(forecast => {
                if (forecast.cod === 200) {
                    this.setState({forecast: forecast, locationName: forecast.name, location: forecast.name});
                    return forecast.description;
                } else {
                    this.setState({locationName: "City not found."});
                }
            })
            .then(forecast => {
                this._setImageSource(forecast);
            });
    }

    render() {
        let content = null;
        if (this.state.forecast !== null) {
            content = (
                <Forecast
                    name={this.state.forecast.name}
                    description={this.state.forecast.description}
                    temp={this.state.forecast.temp}
                />
            )
        }
        return (
            <View style={styles.mainContainer}>
                <View style={styles.Container}>
                    <Appbar.Header>
                        <Appbar.Content
                            title='Weather App'
                        />
                    </Appbar.Header>
                    <Searchbar
                        style={styles.search}
                        placeholder={'Enter UK Town or City'}
                        onChangeText={this._handleOnTextChange}
                        onSubmitEditing={this._handleOnTextSubmit}
                        onFocus={this._handleOnFocus}
                        value={this.state.location}
                        autoCapitalize={'words'}
                    />
                </View>
                <View style={styles.imageContainer}>
                    <ImageBanner image={this.state.image}/>
                </View>
                <View style={styles.forecastContainer}>
                    {content}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'stretch'
    },
    container: {
        alignItems: 'stretch'
    },
    imageContainer: {
        flex: 0.4,
        backgroundColor: '#fff2cb',
    },
    forecastContainer: {
        flex: 0.6,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'stretch'
    },
    welcome: {
        fontSize: 34,
        color: '#7b78c8',
        textAlign: 'center'
    },
    search: {
        marginVertical: 10,
        marginHorizontal: 10
    }
});

export default HomeActivity;