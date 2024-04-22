[![CodeFactor](https://www.codefactor.io/repository/github/lixibox/lixibox-spa/badge?s=a1874c7b2a77aea75cad8043fe1b78efa0ddac89)](https://www.codefactor.io/repository/github/lixibox/lixibox-spa)
[![CircleCI](https://circleci.com/gh/lixibox/lixibox-spa.svg?style=svg&circle-token=3632266907176296f7c4b696d454e0ee9c4e5b9b)](https://circleci.com/gh/lixibox/lixibox-spa)

---

# Lixibox Frontend

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) (^18.18.2)
- [Yarn](https://yarnpkg.com/getting-started/install) (optional) (as an alternative to npm)
- [Ruby](https://www.ruby-lang.org/en/documentation/installation/) (^2.3.3) (required for capistrano installation)
- [Bundler](https://bundler.io/) (^2.2.3) (required for capistrano installation)
- [Brew](https://brew.sh/) (required for `rsync` installation)
- [rsync](https://rsync.samba.org/) (^3.1.3) (required for capistrano installation)
- [Capistrano](https://capistranorb.com/documentation/getting-started/installation/) (^3.14.1) (required for deployment)

## Development

### Prepare Development Environment

#### Method 1 (installing dependencies manually)

- Install dependencies on your local machine as described in the [Prerequisites](#prerequisites) section.

#### Method 2 (using Docker)

- Install [Docker](https://docs.docker.com/get-docker/) (^20.10.8)
  - Don't forget to assign at least 4GB of RAM to Docker in the Docker Desktop settings.
- Install coreutils using `brew install coreutils` (required for `realpath` command on MacOS)
- Build dev image (one time only): `docker build -t lixibox-spa-dev -f Dockerfile.dev .` (ETA: ~6 minutes)
- Run dev container
  - For the first time run: `` docker run --mount "type=bind,src=`pwd`,dst=/home" --publish 80,443,8080 --name lixibox-spa-dev -it lixibox-spa-dev /bin/bash ``
    - To enable deploying from the container, add flag: `` --mount "type=bind,src=`realpath ~/.aws`,dst=/root/.aws" --mount "type=bind,src=`realpath ~/.ssh`,dst=/root/.ssh" ``
    - Run `bundle` to install remaining dependencies (one time only)
  - For the consecutive time runs: `docker start lixibox-spa-dev && docker attach lixibox-spa-dev`
- To remove the existing container: `docker rm lixibox-spa-dev`
- Notes
  - Build and dev server boot time varies (2-7 minutes on a 2019 Core i7 MacBook Pro based on RAM availability). For faster builds, ensure that Docker has sufficient RAM available and system isn't using significant amount of SWAP.
  - If development server is run on an emulated environment, run `yarn emulator [...]` commands on the host machine instead of the container.

### Install dependencies

```bash
yarn install
```

### Run a development server

```bash
yarn start
```

This runs a development server locally on [http://lvh.me:8080](http://lvh.me:8080), which is a special domain that resolves to `127.0.0.1` (loopback address). By default, this environment uses [https://api.lxb-fe.click](https://api.lxb-fe.click) API server.

**Warning**: This configuration will result in cookie related issues and also third party service integration may not work as expected. To avoid this, use emulated development environment, which is described below.

### Run a development server on emulated environment

To emulate an environment, run,

```bash
yarn emulator emulate <staging-fe|staging-be|staging-mb|qa>
```

Once an environment is emulated, run a development server using the following command

```bash
yarn emulator start
```

This runs a development server locally on the specified emulated environment.

For example, if you run `yarn emulator emulate staging-fe`, then starting the sever with `yarn emulator start` will run the server on [https://www.lxb-fe.click](https://www.lxb-fe.click).

To remove environment emulation, run,

```bash
yarn emulator emulate-off
```

### Linting and auto-formatting

Linter will automatically check for any formatting errors on every commit.
Running `git commit` will automatically run the linter and fix any formatting errors.

To manually check for linting errors for a specific file, run,

```bash
yarn lint:prettier path/to/file # Check for formatting errors
yarn lint:style path/to/file # Check for errors in the stylesheets
```

To manually fix formatting errors for a specific file, run,

```bash
yarn lint:prettier:fix path/to/file # Fix formatting errors
yarn lint:style:fix path/to/file # Fix errors in the stylesheets
```

## Build

### Install dependencies

```bash
yarn install
```

### Build for an environment

```bash
yarn build <staging-fe|staging-be|staging-mb|qa|production>
```

## Deployment

### Deploying on a staging environment

#### Method 1: Using CI/CD

- Create a new deployment branch from the feature branch.
  ```bash
  git checkout -b <deployment-branch-name> <feature-branch-name>
  ```
  - The following branch names are reserved for CI/CD deployment to staging environments.
    - `deploy_staging_fe`
    - `deploy_staging_be`
    - `deploy_staging_mb`
    - `deploy_qa`
    - `deploy_pre_production`
- Checkout to the deployment branch.
  ```bash
  git checkout <deployment-branch-name>
  ```
- Push the deployment branch to the remote repository in order for the CI to build and deploy.
  ```bash
  git push origin <deployment-branch-name>
  ```

#### Method 2: Manually from local machine

##### Prerequisites

A build must be created before deployment. See [Build](#build) section for more details.

##### Deploying on a staging environment

```bash
cap <staging-fe|staging-be|staging-mb|qa> deploy
```

### Deploying on production environment (Git flow)

To release an update on production environment, follow the steps below.

- Merge the changes to [master](https://github.com/lixibox/lixibox-spa/tree/master) branch.
- Create a new release tag [on Github](https://github.com/lixibox/lixibox-spa/releases). Release tag name should follow the [semantic versioning](https://semver.org/) format (`MAJOR.MINOR.PATCH`).
  - If a breaking change or significant UI updates are introduced, increment the `MAJOR` version.
  - If a new feature is added, increment the `MINOR` version.
  - If a bug is fixed or other minor change is performed, increment the `PATCH` version.
  - For example, if the current version is `1.0.0`, and a new feature is added, then the new version should be `1.1.0`.

### Deploying on production environment (manual)

- [Build](#build) the project for production environment.
- Deploy using the following command.

```bash
# deploy
$ bundle exec cap production deploy

# rollback
$ bundle exec cap production deploy:rollback
```

## Docker (stale)

In case you have problem building for production, use docker for a fresh environment instead.

### Build image

```bash
docker build -t lxspa .
```

### Run container for development

```bash
# lxspa is the docker image tag
docker run -it --rm -p 8080:8080 -v $(pwd):/home --cap-add=SYS_PTRACE --security-opt seccomp=unconfined lxspa /bin/bash -c 'yarn dev'
```

### Build

```bash
# lxspa is the docker image tag
docker run -it --rm -v $(pwd):/home lxspa /bin/bash -c 'yarn install && yarn production'
```

## Dependency Installation Guidelines

### Capistrano

Install Ruby

```bash
$ brew install rbenv ruby-build
$ rbenv install 2.7.4
$ rbenv global 2.7.4
$ ruby -v
```

Install Bundler

```bash
gem install bundler
```

Install Ruby dependencies

```bash
bundle install
```

Install latest version of rsync since macOS's resync doesn't support several flags

```bash
brew install rsync
```

Install Capistrano

```bash
gem install capistrano
```
