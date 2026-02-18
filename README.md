# MSSQL MCP Writer

[![npm version](https://img.shields.io/npm/v/@connorbritain/mssql-mcp-writer.svg)](https://www.npmjs.com/package/@connorbritain/mssql-mcp-writer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Model Context Protocol server for Microsoft SQL Server with read and data operations.**

Full data manipulation capabilities (INSERT, UPDATE, DELETE) with preview/confirm safeguards, but no DDL operations. Ideal for data engineers and ETL workflows where you need to modify data but want to prevent schema changes.

## Architecture

This package is a thin wrapper around [`@connorbritain/mssql-mcp-core`](https://github.com/ConnorBritain/mssql-mcp-core), which contains all shared logic, tools, and governance features. The wrapper selects the `"writer"` tier and delegates to the core's `startMcpServer()` function. This design enables:

- **Hard separation** at the package level — regulated enterprises can guarantee that certain builds physically cannot perform destructive operations
- **Independent versioning** — each tier can be published separately with its own release cycle
- **Clear audit trail** — `"we only allow mssql-mcp-writer in staging"` is a compile-time guarantee

The core library handles all SQL Server connections, tool dispatch, audit logging, and governance enforcement.

---

## Package Tiers

| Package | npm | Tools | Use Case |
|---------|-----|-------|----------|
| **[mssql-mcp-reader](https://github.com/ConnorBritain/mssql-mcp-reader)** | `@connorbritain/mssql-mcp-reader` | 14 read-only | Analysts, auditors, safe exploration |
| **mssql-mcp-writer** (this) | `@connorbritain/mssql-mcp-writer` | 17 (reader + data ops) | Data engineers, ETL developers |
| **[mssql-mcp-server](https://github.com/ConnorBritain/mssql-mcp-server)** | `@connorbritain/mssql-mcp-server` | 20 (all tools) | DBAs, full admin access |

---

## Tools Included

| Category | Tools |
|----------|-------|
| **Discovery** | `search_schema`, `describe_table`, `list_table`, `list_databases`, `list_environments` |
| **Profiling** | `profile_table`, `inspect_relationships`, `inspect_dependencies`, `explain_query` |
| **Data Read** | `read_data` (SELECT only) |
| **Data Write** | `insert_data`, `update_data`, `delete_data` (with preview/confirm) |
| **Scripts** | `list_scripts`, `run_script` |
| **Operations** | `test_connection`, `validate_environment_config` |

**Not included:** `create_table`, `create_index`, `drop_table` (DDL operations)

---

## Quick Start

### Install

```bash
npm install -g @connorbritain/mssql-mcp-writer@latest
```

### MCP Client Configuration

```json
{
  "mcpServers": {
    "mssql": {
      "command": "npx",
      "args": ["@connorbritain/mssql-mcp-writer@latest"],
      "env": {
        "SERVER_NAME": "127.0.0.1",
        "DATABASE_NAME": "mydb",
        "SQL_AUTH_MODE": "sql",
        "SQL_USERNAME": "app_user",
        "SQL_PASSWORD": "YourPassword123"
      }
    }
  }
}
```

---

## Configuration

| Variable | Required | Notes |
|----------|----------|-------|
| `SERVER_NAME` | Yes | SQL Server hostname/IP |
| `DATABASE_NAME` | Yes | Target database |
| `SQL_AUTH_MODE` | | `sql`, `windows`, or `aad` (default: `aad`) |
| `SQL_USERNAME` / `SQL_PASSWORD` | | Required for `sql`/`windows` modes |
| `READONLY` | | `true` disables write tools |
| `ENVIRONMENTS_CONFIG_PATH` | | Path to multi-environment JSON config |
| `SCRIPTS_PATH` | | Path to named SQL scripts directory |
| `AUDIT_LOG_PATH` | | Custom audit log path |

---

## Features

All packages in the MSSQL MCP family share:

- **Multi-environment support** - Named database environments (prod, staging, dev) with per-environment policies
- **Governance controls** - `allowedTools`, `deniedTools`, `allowedSchemas`, `deniedSchemas`, `requireApproval`
- **Audit logging** - JSON Lines logs with session IDs and auto-redaction
- **Secret management** - `${secret:NAME}` placeholders for secure credential handling
- **Named SQL scripts** - Pre-approved parameterized queries with governance controls
- **Preview/confirm for mutations** - `update_data` and `delete_data` show affected rows before execution

---

## Documentation

Full documentation, configuration examples, and governance details are available in the main repository:

**[MSSQL MCP Server Documentation](https://github.com/ConnorBritain/mssql-mcp-server#readme)**

---

## License

MIT License. See [LICENSE](./LICENSE) for details.

---

**Repository:** https://github.com/ConnorBritain/mssql-mcp-writer
**Issues:** https://github.com/ConnorBritain/mssql-mcp-writer/issues
**npm:** https://www.npmjs.com/package/@connorbritain/mssql-mcp-writer
