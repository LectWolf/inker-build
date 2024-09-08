import { Context, h } from "koishi";
import axios from "axios";

export function apply(ctx: Context) {
  ctx
    .command("build <邮箱> <源码地址>")
    .alias("构建")
    .action(async ({ session }, email, url) => {
      let emailregex: RegExp =
        /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;
      if (!emailregex.test(email)) {
        return h.at(session.userId) + "\r邮箱不正确";
      }
      let urlregex: RegExp = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+$/;
      if (!urlregex.test(url)) {
        return h.at(session.userId) + "\r源码地址不正确";
      }

      try {
        const response = await axios.post(
          "https://aurora-automatic-build.inker.bot/api/start-build",
          {
            trigger: session.userId.toString(),
            email: email,
            projectUrl: url,
          }
        );

        const { code, message } = response.data;
        if (code === 0) {
          return h.at(session.userId) + "\r构建中, 请稍后查看您的邮箱";
        } else {
          return h.at(session.userId) + `\r构建失败, 失败原因: ${message}`;
        }
      } catch (error) {
        return h.at(session.userId) + "\r请求失败, 请稍后重试";
      }
    });
}
