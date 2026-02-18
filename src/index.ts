#!/usr/bin/env node
import { startMcpServer } from "@connorbritain/mssql-mcp-core";
import pkg from "../package.json" with { type: "json" };

startMcpServer({
  name: "mssql-mcp-writer",
  version: pkg.version,
  tier: "writer",
}).catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
