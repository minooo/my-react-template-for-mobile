import React, { Component } from "react";
import { getUsers } from "@actions";
import withRedux from "@store";
import { Layout, Nav } from "@components"

@withRedux
export default class extends Component {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props
    console.info(123)
    dispatch(getUsers())
  }
  // async componentDidMount() {
  //   const response = JSON.stringify(
  //     await window
  //       .fetch("/api/users")
  //       .then(response => response.json().then(data => data)),
  //     null,
  //     2
  //   );
  // }
  render() {
    return (
      <Layout title="我的">
        <div className="equal">我的</div>
        <Nav />
      </Layout>
    )
  }
}
