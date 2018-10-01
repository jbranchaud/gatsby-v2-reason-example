# gatsby-v2-reason-example

> This example repository shows how to start using ReasonML within a Gatsby v2 project

## Up and Running

Get all the dependencies installed:

```bash
$ yarn install
$ yarn global add bs-platform
```

Start a `bsb` process to watch and compile the Reason files:

```bash
$ bsb -make-world -w
```

Start another process to serve the Gatsby app locally:

```bash
$ gatsby develop
```
