import React, { Component } from "react";
import { getUsers } from "@actions";
import withRedux from "@store";
import { Layout, Nav, WrapLink } from "@components"

@withRedux
export default class extends Component {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props
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
      <Layout title="嘟嘟新媒体-首页">
        <div className="equal">
          <WrapLink href="/" as="" className="h70 flex ai-center plr20 bg-smoke  ">
            <i className="i-search font30 c999 mr10" />
            <span>搜个关键词试试看</span>
          </WrapLink>
        </div>
        <Nav />
      </Layout>
    )
  }
}
