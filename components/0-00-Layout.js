import Head from "next/head";
import React from "react";

export default class extends React.Component {
  state = {};
  render() {
    const { title, children } = this.props;
    return (
      <div style={{ touchAction: "none" }} className="box bg-white h-full flex column overflow-y">
        <Head>
          <title>{title}</title>
        </Head>
        {children}
      </div>
    );
  }
}
