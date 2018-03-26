import { WrapLink } from "@components";

export default () => (
  <div className="flex column ai-center jc-center plr25 ptb20 h-full">
    <div className="font32 c333 ptb20">404</div>
    <div className="font28 c999">
      访问的页面不存在，请{" "}
      <WrapLink href="/" className="font30 c-main">
        返回首页
      </WrapLink>
    </div>
  </div>
);
