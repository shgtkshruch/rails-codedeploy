[![Rails test](https://github.com/shgtkshruch/rails-aws-boilerplate/workflows/Rails%20test/badge.svg)](https://github.com/shgtkshruch/rails-aws-boilerplate/actions?query=workflow%3A%22Rails+test%22)

# Rails AWS Boilerplate

- Ruby 2.7.2
- Rails 6
- Docker & Docker Compose
- GitHub Actions(CI)
- AWS CDK

## Development

```sh
$ COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build
$ docker-compose up -d
```

open `localhost:3000` with browser.

## AWS

Create AWS resources.

- VPC (4 Subnets, 2 NAT)
- Load Balancer
- EC2 (Nginx)
- Route 53
- Session Manager

```sh
npm run cdk:deploy
```

URL: `http://rails-aws-boilerplate.shgtkshruch.com/`

Cleaning.

```sh
npm run cdk:destroy
```
