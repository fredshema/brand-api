# Shema's brand API

[![CI/CD](https://github.com/fredshema/brand-api/actions/workflows/ci.yaml/badge.svg)](https://github.com/fredshema/brand-api/actions/workflows/ci.yaml) [![codecov](https://codecov.io/gh/fredshema/brand-api/graph/badge.svg?token=PRR2CURFSU)](https://codecov.io/gh/fredshema/brand-api)

This repository contains the source code for the brand API. The API is built using the Node.js [express](https://expressjs.com/) framework and uses [MongoDB](https://www.mongodb.com/) as the database.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository

```sh
git clone git@github.com:fredshema/brand-api.git
```

2. Install the dependencies

```sh
npm install
```

3. Create a `.env` file in the root of the project and add the following environment variables

```sh
PORT=3000
MONGODB_URI=mongodb://localhost:27017/brand-api
JWT_SECRET=your-secret
```

4. Run the development server

```sh
npm run dev
```

## Testing

To run the tests, run the following command

```sh
npm test
```

## API documentation

The API documentation is available at [http://shema-api.fly.dev/docs](http://shema-api.fly.dev/docs)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details