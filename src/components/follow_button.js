import React from "react"
import { Follow } from 'react-twitter-widgets'

export default class FollowButton extends React.Component {
  render() {
    return (
      <Follow
        username={'gluons_jp'}
        options={{
	        showCount: false,
        }}
      />
    )
  }
}
