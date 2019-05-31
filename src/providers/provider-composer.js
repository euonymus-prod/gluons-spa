import React, { Component } from 'react'
// Redux
import { Provider } from 'react-redux'
import store from './store'
// Firebase
import { withFirebaseProvider } from './firebase'
// intls activities
import { IntlProvider, addLocaleData } from 'react-intl';
import ja from 'react-intl/locale-data/ja';
import ja_JP from '../locales/ja_JP';
import en_US from '../locales/en_US';

const domainString = document.domain;
const domainFirstPart = domainString.split('.')[0]

let locale = 'en'
let locale_messages = en_US
if (domainFirstPart === 'ja') {
  addLocaleData([...ja]);
  locale = 'ja'
  locale_messages = ja_JP
  // This is required to manually differ the behavior depends on locale.
  localStorage.setItem('locale', JSON.stringify(locale));
}

class ProviderComposer extends Component {
  render() {
    return (
      <Provider store={store}>
        <IntlProvider locale={locale} messages={locale_messages}>
          {this.props.children}
        </IntlProvider>
      </Provider>
    )
  }
}
export default withFirebaseProvider(ProviderComposer)
