import React from "react"
import { TwitterFollowButton } from 'react-twitter-embed';

export default class FollowButton extends React.Component {
  render() {
    return (
      <TwitterFollowButton
        screenName={'gluons_jp'}
      />
    )
  }
}
