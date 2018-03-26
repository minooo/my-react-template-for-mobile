import Document, { Head, Main, NextScript } from "next/document";

const pro = process.env.NODE_ENV === "production";
const test = process.env.NODE_TEST === "test"
const path = pro ? (test ? "" : "http://public.duduapp.net/finance/pc-static") : ""

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    return {
      html,
      head,
      errorHtml,
      chunks
    };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="嘟嘟新媒体" />
          <link rel="icon" href="http://public.duduapp.net/finance/pc-static/img/favicon.ico" type="image/x-icon" />
          <link rel="stylesheet" href={`${path}/static/styles/antd_mobile_min.css`} />
          <link rel="stylesheet" href={`${path}/static/styles/app_min.css`} />
          <title>嘟嘟新媒体</title>
        </Head>
        <body>
          {this.props.customValue}
          <Main />
          <NextScript />
          <script src={`${path}/static/scripts/hd.js`} />
        </body>
      </html>
    );
  }
}
