# Session Planner API

## Description

**Session Planner** is a custom solution developed for the Union Sportive Vernoise Badminton to facilitate session sign-ups. This repository contains the API for the solution, developed using the **Adonis JS** framework, serving as the data source for the web application.

## Prerequisites

![docker](https://img.shields.io/badge/docker-v27-2496ED?logo=docker&logoColor=white&labelColor=2496ED&color=white)
![docker-compose](https://img.shields.io/badge/docker--compose-v1-2496ED?logo=docker&logoColor=white&labelColor=2496ED&color=white)
![node.js](https://img.shields.io/badge/node.js-v20-339933?logo=nodedotjs&logoColor=white&labelColor=339933&color=white)
![npm](https://img.shields.io/badge/npm-v10-CB3837?logo=npm&logoColor=white&labelColor=CB3837&color=white)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MathieuBesson/session-planner-api
   ```
2. **Navigate to the project directory**:
   ```bash
   cd session-planner-api
   ```
3. **Configure environment variables**:
   - Create a `.env` file from `.env.example`
   - Configure the environment variables, including the PostgreSQL database connection.
4. **Start the project's Docker containers**:
   ```bash
   docker-compose up -d
   ```
5. **Run the migrations**:
   ```bash
   docker exec -it session-planner-api node ace migration:run
   ```
6. **Run the seeders**:
   ```bash
   docker exec -it session-planner-api node ace db:seed
   ```

## Start

To start the containers, run the following command:

```bash
docker-compose up
```

- The API will be accessible at: [http://localhost:8080](http://localhost:8080)
- The database visualization tool will be available at: [http://localhost:8081](http://localhost:8081)

## Frontend

The frontend of **Session Planner** is a web application built with **Next.js**. You can find it here: [session-planner-pwa](https://github.com/MathieuBesson/session-planner-pwa).

## TODO

- Validate API data types using schemas ([zod](https://zod.dev/), [vine.js](https://vinejs.dev))
- Add JS documentation to functions
- Add unit tests
- Add Swagger documentation for the API
- Resolve the remaining TODOs

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
