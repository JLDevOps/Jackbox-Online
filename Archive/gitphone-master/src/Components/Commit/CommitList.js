import React from 'react';
import { ActivityIndicator, Dimensions, FlatList, Platform, View } from 'react-native';
import { Avatar, ListItem, Text } from 'react-native-elements';
import { compose } from 'redux';
import fetch from 'fetch-hoc';

import styles from '../Shared.style';
import withHeader from '../../HOCs/withHeader';
import { withRouter } from '../../Utils/Routing';

const containerStyle = {
  alignItems: 'flex-start',
  borderBottomWidth: 1,
  flex: 1,
  width: Dimensions.get('window').width
};

const subtitleStyle = { color: 'rgba(0, 0, 0, 0.54)' };

const leftElementStyle = {
  height: '100%',
  marginRight: Platform.OS === 'web' ? 10 : 0
};

class CommitList extends React.PureComponent {
  keyExtractor = (item) => item.sha

  renderLeftElement = (item) => {
    const initials = item.commit.author.name.match(/\b\w/g) || [];

    return (
      <View style={leftElementStyle}>
        <Avatar
          title={((initials.shift() || '') + (initials.pop() || ''))}
          source={{ uri: (item.author && item.author.avatar_url) || undefined }}
          size='medium'
          rounded
        />
      </View>
    );
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.commit.author.name}
      subtitle={item.commit.message}
      leftElement={this.renderLeftElement(item)}
      containerStyle={containerStyle}
      subtitleStyle={subtitleStyle}
    />
  )

  renderContent = () => (
    this.props.loading ?
      <ActivityIndicator color='#87ceeb' /> :
      this.renderFlatList()
  )

  renderFlatList = () => (
    this.props.error ?
      <Text h4>Error: {this.props.data.message || 'Something went wrong 😕'}</Text> :
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.props.data}
        renderItem={this.renderItem}
      />
  )

  render() {
    return (
      <View style={styles.container}>
        {this.renderContent()}
      </View>
    );
  }
}

export default compose(
  withHeader({ title: 'Commits' }),
  withRouter,
  fetch(({ location: { state = {} } }) => (
    `https://api.github.com/repos/${state.owner}/${state.repo}/commits`
  ))
)(CommitList);
