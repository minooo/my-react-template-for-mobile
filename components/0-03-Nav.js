import { ActiveLink } from "@components";
import uuid from "uuid/v4";

const config = [
  {
    ico: "i-home",
    text: "首页",
    href: "/index",
    as: "/"
  },
  {
    ico: "i-loan",
    text: "已购",
    href: "/1-buy/1-home",
    as: "/buy"
  },
  {
    ico: "i-card",
    text: "发现",
    href: "/2-find/1-home",
    as: "/find"
  },
  {
    ico: "i-user",
    text: "我的",
    href: "/3-my/1-home",
    as: "/my"
  }
];

export default () => (
  <div
    className="flex h108 ai-stretch bg-white border-top-shadow relative z10"
  >
    {config.map(item => <ActiveLink key={uuid()} {...item} />)}
  </div>
);
