import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Formik } from 'formik';

import styles from './Shared.style';
import { withRouter } from '../Utils/Routing';

class Home extends PureComponent {
  onPressButton = ({ owner, repo }) => {
    // Go to Commit screen and send params
    this.props.history.push({
      pathname: '/commit',
      state: { owner, repo }
    });
  }

  render() {
    const { input, button } = styles;

    return (
      <Formik initialValues={{ owner: '', repo: '' }} onSubmit={this.onPressButton}>
        {({ handleChange, handleSubmit, values }) => (
          <View style={styles.container}>
            <Input
              containerStyle={input.containerStyle}
              inputStyle={input.inputStyle}
              label='Owner'
              onChangeText={handleChange('owner')}
              placeholder="Github's owner"
              value={values.owner}
            />
            <Input
              containerStyle={input.containerStyle}
              inputStyle={input.inputStyle}
              label='Repo'
              onChangeText={handleChange('repo')}
              placeholder="Github's repository name"
              value={values.repo}
            />
            <Button
              title='SUBMIT'
              icon={{
                color: 'white',
                name: 'paper-plane',
                size: 15,
                type: 'font-awesome'
              }}
              buttonStyle={button.containerStyle}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    );
  }
}

export default withRouter(Home);
