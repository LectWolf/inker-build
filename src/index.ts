import { Context, Schema } from "koishi";

import * as command from "./command";

export const name = "inker-build";

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context) {
  ctx.plugin(command);
}
