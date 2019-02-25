import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {ImageBackground} from 'react-native';





export default class ImageBanner extends Component {
    render() {
        return (
            <ImageBackground source={this.props.image} style={styles.imageStyles}/>
        )
    }
}

const styles = StyleSheet.create(
    {
        imageStyles: {
            width: '100%',
            height: '100%',
            resizeMode: 'stretch',
            alignSelf: 'flex-start'
        }
    }
)