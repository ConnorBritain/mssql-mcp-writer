#!/usr/bin/env node
import { startMcpServer } from "@connorbritain/mssql-mcp-core";

startMcpServer({
  name: "mssql-mcp-writer",
  version: "0.2.0",
  tier: "writer",
}).catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
