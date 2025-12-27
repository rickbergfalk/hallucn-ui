# planks

A web components library built plank by plank. Forked from [shadcn/ui](https://github.com/shadcn-ui/ui) and gradually transforming into framework-agnostic web components.

## About

Planks is a hard fork of shadcn/ui with a different goal: to provide the same beautifully designed components as web components that work anywhere - React, Vue, Svelte, vanilla JS, or any framework.

Like the [Ship of Theseus](https://en.wikipedia.org/wiki/Ship_of_Theseus), we're replacing each React component plank by plank until we have something entirely new.

## Structure

```
planks/
├── src/
│   ├── components/    # 55 UI components (React, to be converted)
│   ├── hooks/         # React hooks
│   └── lib/           # Utilities (cn, etc.)
├── reference/
│   ├── examples/      # Component usage examples
│   └── blocks/        # Pre-composed UI patterns
├── LICENSE.md
└── README.md
```

## Status

This project is in early development. The React components are here as reference - the goal is to convert them to web components.

## License

Licensed under the [MIT license](/LICENSE.md).

## Acknowledgments

This project is a fork of [shadcn/ui](https://github.com/shadcn-ui/ui) by [Shadab Ahmed](https://twitter.com/shadcn). We're grateful for the excellent foundation.
