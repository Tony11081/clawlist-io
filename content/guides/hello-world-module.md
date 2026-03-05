# Hello World: Your First OpenClaw Module

Welcome to OpenClaw! This guide will get you up and running with your first functional module in under 5 minutes. No prior experience required.

## What You'll Build

A simple "Hello World" module that:
- Responds to commands
- Processes user input
- Returns formatted output
- Demonstrates core OpenClaw concepts

## Prerequisites

- Node.js 18+ installed
- Basic command line knowledge
- 5 minutes of your time

That's it! Let's get started.

## Step 1: Install OpenClaw

Open your terminal and run:

```bash
npm install -g @openclaw/cli
```

Verify the installation:

```bash
openclaw --version
```

You should see something like `OpenClaw CLI v2.0.0`.

## Step 2: Create Your First Module

Create a new directory for your module:

```bash
mkdir my-first-module
cd my-first-module
```

Initialize a new OpenClaw module:

```bash
openclaw init
```

This will create the following structure:

```
my-first-module/
├── module.json       # Module configuration
├── index.js          # Main entry point
└── README.md         # Documentation
```

## Step 3: Write Your Module Code

Open `index.js` and replace its contents with:

```javascript
// Import OpenClaw SDK
const { Module } = require('@openclaw/sdk')

// Create a new module
const helloModule = new Module({
  name: 'hello-world',
  version: '1.0.0',
  description: 'My first OpenClaw module'
})

// Define a command handler
helloModule.command('greet', async (context) => {
  const name = context.args.name || 'World'
  return {
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString()
  }
})

// Export the module
module.exports = helloModule
```

## Step 4: Test Your Module

Run your module locally:

```bash
openclaw run
```

In another terminal, test the command:

```bash
openclaw exec greet --name="OpenClaw"
```

You should see:

```json
{
  "message": "Hello, OpenClaw!",
  "timestamp": "2026-03-06T10:30:00.000Z"
}
```

Congratulations! 🎉 You've just created your first OpenClaw module!

## Understanding the Code

Let's break down what we just built:

### Module Definition

```javascript
const helloModule = new Module({
  name: 'hello-world',
  version: '1.0.0',
  description: 'My first OpenClaw module'
})
```

This creates a new module with metadata. The `name` must be unique across your OpenClaw instance.

### Command Handler

```javascript
helloModule.command('greet', async (context) => {
  // Command logic here
})
```

Commands are the primary way users interact with your module. The `context` object contains:
- `args`: Command arguments
- `user`: User information
- `session`: Session data
- `openclaw`: OpenClaw API access

### Return Value

```javascript
return {
  message: `Hello, ${name}!`,
  timestamp: new Date().toISOString()
}
```

Always return a JSON-serializable object. This will be sent back to the caller.

## Adding More Features

### 1. Multiple Commands

Add more commands to your module:

```javascript
helloModule.command('goodbye', async (context) => {
  return {
    message: 'Goodbye! Come back soon!',
    timestamp: new Date().toISOString()
  }
})

helloModule.command('echo', async (context) => {
  return {
    echo: context.args.text || 'Nothing to echo',
    length: (context.args.text || '').length
  }
})
```

### 2. Input Validation

Validate user input:

```javascript
helloModule.command('greet', async (context) => {
  const { name } = context.args

  // Validate input
  if (!name) {
    throw new Error('Name is required')
  }

  if (name.length > 50) {
    throw new Error('Name is too long (max 50 characters)')
  }

  return {
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString()
  }
})
```

### 3. State Management

Store data between commands:

```javascript
// Initialize state
const state = {
  greetCount: 0,
  users: new Set()
}

helloModule.command('greet', async (context) => {
  const { name } = context.args

  // Update state
  state.greetCount++
  state.users.add(name)

  return {
    message: `Hello, ${name}!`,
    greetCount: state.greetCount,
    uniqueUsers: state.users.size
  }
})
```

### 4. Async Operations

Handle asynchronous tasks:

```javascript
helloModule.command('fetch-quote', async (context) => {
  // Simulate API call
  const response = await fetch('https://api.quotable.io/random')
  const data = await response.json()

  return {
    quote: data.content,
    author: data.author
  }
})
```

## Configuration

Update `module.json` to configure your module:

```json
{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "My first OpenClaw module",
  "author": "Your Name",
  "license": "MIT",
  "openclaw": {
    "minVersion": "2.0.0"
  },
  "commands": {
    "greet": {
      "description": "Greet a user",
      "args": {
        "name": {
          "type": "string",
          "required": false,
          "default": "World"
        }
      }
    }
  }
}
```

## Deploying Your Module

### Local Deployment

Install your module locally:

```bash
openclaw install .
```

### Publishing to Registry

Publish to the OpenClaw registry:

```bash
openclaw publish
```

### Installing from Registry

Others can now install your module:

```bash
openclaw install hello-world
```

## Next Steps

Now that you've built your first module, here are some next steps:

1. **Add More Commands**: Expand your module with additional functionality
2. **Learn About Events**: Respond to system events
3. **Explore the API**: Check out the full OpenClaw SDK documentation
4. **Build Something Real**: Create a module that solves a real problem

### Recommended Guides

- [Module Architecture](/guides/module-architecture)
- [Command Patterns](/guides/command-patterns)
- [State Management](/guides/state-management)
- [Testing Modules](/guides/testing-modules)

## Troubleshooting

### Module Not Found

If you get "Module not found" error:

1. Check that `module.json` exists
2. Verify the module name is correct
3. Run `openclaw list` to see installed modules

### Command Not Working

If commands don't execute:

1. Check command name spelling
2. Verify arguments are correct
3. Look at logs: `openclaw logs`

### Installation Issues

If installation fails:

1. Update OpenClaw: `npm update -g @openclaw/cli`
2. Clear cache: `openclaw cache clear`
3. Check Node.js version: `node --version` (should be 18+)

## Complete Example

Here's a complete, production-ready module:

```javascript
const { Module } = require('@openclaw/sdk')

const module = new Module({
  name: 'hello-world',
  version: '1.0.0',
  description: 'A friendly greeting module'
})

// State
const state = {
  greetings: 0,
  users: new Map()
}

// Greet command
module.command('greet', async (context) => {
  const { name = 'World' } = context.args

  // Validation
  if (typeof name !== 'string') {
    throw new Error('Name must be a string')
  }

  if (name.length > 50) {
    throw new Error('Name too long')
  }

  // Update state
  state.greetings++
  const userGreetings = (state.users.get(name) || 0) + 1
  state.users.set(name, userGreetings)

  // Return response
  return {
    message: `Hello, ${name}!`,
    totalGreetings: state.greetings,
    yourGreetings: userGreetings,
    timestamp: new Date().toISOString()
  }
})

// Stats command
module.command('stats', async () => {
  return {
    totalGreetings: state.greetings,
    uniqueUsers: state.users.size,
    topUsers: Array.from(state.users.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }))
  }
})

// Reset command
module.command('reset', async () => {
  state.greetings = 0
  state.users.clear()
  return { message: 'Stats reset successfully' }
})

module.exports = module
```

## Conclusion

You've successfully created your first OpenClaw module! You learned how to:

- Set up a new module
- Define commands
- Handle user input
- Manage state
- Deploy your module

This is just the beginning. OpenClaw's powerful SDK enables you to build complex, production-ready applications. Keep exploring, keep building, and welcome to the OpenClaw community!

---

**Author**: OpenClaw Team
**Last Updated**: March 2026
**OpenClaw Version**: 2.0+
**Difficulty**: Beginner
**Time**: 5 minutes
