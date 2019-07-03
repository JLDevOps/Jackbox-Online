import React, { PureComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../Components/Shared.style';

const containerStyle = {
  alignItems: 'center',
  height: 50,
  justifyContent: 'center',
  paddingHorizontal: 0,
  paddingTop: 0,
  width: '100%'
};

const centerContainerStyle = { paddingRight: 20 };

const buttonStyle = {
  alignItems: 'center',
  height: 48,
  justifyContent: 'center',
  paddingRight: 5,
  width: 40
};

const textStyle = { color: '#fff' };

const withHeader = ({ title = '' }) => (WrappedComponent) => {
  class HOC extends PureComponent {
    goBack = () => this.props.history.goBack();

    goHome = () => this.props.history.replace('/');

    horizontalComponent = (name, size, onPress) => (
      <TouchableOpacity onPress={onPress} style={buttonStyle}>
        <Icon name={name} size={size} color='#fff' />
      </TouchableOpacity>
    );
  
    centerComponent = (title) => ({
      text: title.toUpperCase(),
      style: textStyle
    });

    render() {
      return (
        <View style={styles.container}>
          <Header
            containerStyle={containerStyle}
            centerContainerStyle={centerContainerStyle}
            leftComponent={this.horizontalComponent('chevron-left', 20, this.goBack)}
            centerComponent={this.centerComponent(title)}
            rightComponent={this.horizontalComponent('home', 25, this.goHome)}
          />
          <WrappedComponent />
        </View>
      );
    }
  }

  return HOC;
}

export default withHeader;
