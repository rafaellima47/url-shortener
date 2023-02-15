# URL Shortener API 

## Usage

First clone the repository:

    $ git clone git@github.com:rafaellima47/django-accounts.git

Install the dependencies:

    $ npm install

Create a .env file and add the following variables:

    ```
    APPS_URL_LIST=<Add the URLs separated by commas to be added to allowedOrigins (e.g https://www.us.com,http://www.bit.com)>

    SERVER_HOST=<Add the server host (e.g. 127.0.0.1)>

    SERVER_PORT=<Add the server port (e.g. 3000)>

    DBI_URI=<Add the MongoDB connection (e.g. mongodb://localhost:27017)>

    URL_EXPIRATION_TIME_HOURS=<Add in hours the url expiration time. if this variable is empty 24 is the deafult>
    ```

Run the API

    $ npm start


## Endpoints

### POST  /shorten

    ```json
    {
        "url": "<URL you want to shorten>"
    }
    ```

---

### POST  /expand

    ```json
    {
       "url": "<shortened URL you want to expand>"
    }
    ```

---

### GET  /:id

This endpoint is accessed through a shortened URL and redirects to the original URL associated with the `id` parameter. The `id` parameter is the unique identifier of the shortened URL that was created with the `/shorten` endpoint.
