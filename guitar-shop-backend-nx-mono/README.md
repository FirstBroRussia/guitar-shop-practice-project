<H1>Это серверная часть практического проекта «GuitarShop»</H1>

<H2>На данную часть проекта было затрачено примерно 32 часа</H2>

<H2>Проект написан с помощью монорепозитория NX</H2>

<H3>Тут имеется шесть разный микросервисов</H3>

Для запуска каждого из них в режиме разработки я ниже опишу скрипты для запуска:

```sh
nx run users:serve
```

```sh
nx run products:serve
```

```sh
nx run comments:serve
```

```sh
nx run orders:serve
```

```sh
nx run notify:serve
```

```sh
nx run bff:serve
```

<H2>Также вы можете сгенерировать готовые файлы для запуска их в производственной фазе</H2>

```sh
nx run <имя_микросервиса>:build
```

<H2>Также в каждой папке с микросервисом имеется файлы <b>dockerfile</b> и <b>docker-compose.stage.yaml</b> для быстрого развертывания сервисов на серверах

<h3>Внутри <b>docker-compose.stage.yaml</b> вы также найдете сервисы для установки баз данных для каждого конкретного сервиса

<h2>Переменные окружения хранятся внутри каждого микросервиса в папке <b>environments

<h3>Далее опишем какие переменные окружения нужны для каждого из микросервиса:

<h4>Users
<ul>
  <li>MONGO_DB_HOST=string
<li>MONGO_DB_PORT=number

<li>MONGO_DB_NAME=string
<li>MONGO_AUTH_BASE=string
<li>MONGO_DB_USERNAME=string
<li>MONGO_DB_PASSWORD=string
<li>MONGO_DB_CREATE_USERS_SECRET=string

<li>JWT_SECRET=string

<li>CLI_SECRET=string


<li>RABBIT_USER=string
<li>RABBIT_PASSWORD=string
<li>RABBIT_HOST=string
<li>RABBIT_PORT=number
<li>RABBIT_QUEUE=string


<li>ADMIN_EMAIL=string
<li>ADMIN_USERNAME=string
<li>ADMIN_PASSWORD=number

</ul>

<h4>Products
<ul>
<li>POSTGRES_DB_HOST=string
<li>POSTGRES_DB_PORT=number
<li>POSTGRES_DB_NAME=string
<li>POSTGRES_DB_USERNAME=string
<li>POSTGRES_DB_PASSWORD=string
</ul>

<h4>Comments
<ul>
<li>MONGO_DB_HOST=string
<li>MONGO_DB_PORT=number

<li>MONGO_DB_NAME=string
<li>MONGO_AUTH_BASE=string
<li>MONGO_DB_USERNAME=string
<li>MONGO_DB_PASSWORD=string

</ul>

<h4>Orders
<ul>
<li>MONGO_DB_HOST=string
<li>MONGO_DB_PORT=number

<li>MONGO_DB_NAME=string
<li>MONGO_AUTH_BASE=string
<li>MONGO_DB_USERNAME=string
<li>MONGO_DB_PASSWORD=string

<li>ADMIN_EMAIL=string


<li>RABBIT_USER=string
<li>RABBIT_PASSWORD=string
<li>RABBIT_HOST=string
<li>RABBIT_PORT=number
<li>RABBIT_QUEUE=string

</ul>

<h4>Notify
<ul>
<li>MONGO_DB_HOST=string
<li>MONGO_DB_PORT=number

<li>MONGO_DB_NAME=string
<li>MONGO_AUTH_BASE=string
<li>MONGO_DB_USERNAME=string
<li>MONGO_DB_PASSWORD=string


<li>MAIL_SMTP_HOST=string
<li>MAIL_SMTP_PORT=number
<li>MAIL_USERNAME=string
<li>MAIL_PASSWORD=string
<li>MAIL_FROM=Vasya Svetov <notify@nodemailer.com>

<li>CURRENT_GUITAR_SHOP_DOMAIN=string

<li>BACKEND_URL=string


<li>RABBIT_USER=string
<li>RABBIT_PASSWORD=string
<li>RABBIT_HOST=string
<li>RABBIT_PORT=number
<li>RABBIT_QUEUE=string


</ul>

<h4>BFF
<ul>
<li>USERS_MICROSERVICE_HOST=string
<li>USERS_MICROSERVICE_PORT=number

<li>PRODUCTS_MICROSERVICE_HOST=string
<li>PRODUCTS_MICROSERVICE_PORT=number

<li>COMMENTS_MICROSERVICE_HOST=string
<li>COMMENTS_MICROSERVICE_PORT=number

<li>ORDERS_MICROSERVICE_HOST=string
<li>ORDERS_MICROSERVICE_PORT=number


<li>UPLOAD_DIR=string

<li>INTER_SERVICE_SECRET=string
<li>ADMIN_EMAIL=string

<li>RABBIT_USER=string
<li>RABBIT_PASSWORD=string
<li>RABBIT_HOST=string
<li>RABBIT_PORT=number
<li>RABBIT_QUEUE=string

</ul>
