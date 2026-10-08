# Library Books API Design

This REST API manages books in a library.

## 1. List Books

- **Method:** GET
- **Path:** `/books`
- **Description:** Returns a list of all books.
- **Success status:** `200 OK`

Example request:

```http
GET /books
````

---

## 2. Get One Book

* **Method:** GET
* **Path:** `/books/{id}`
* **Description:** Returns a single book using its ID.
* **Success status:** `200 OK`

Example request:

```http
GET /books/42
```

---

## 3. Create a Book

* **Method:** POST
* **Path:** `/books`
* **Description:** Creates a new book.
* **Success status:** `201 Created`

Example request body:

```json
{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "publishedYear": 1958
}
```

---

## 4. Update a Book

* **Method:** PUT
* **Path:** `/books/{id}`
* **Description:** Replaces or updates an existing book.
* **Success status:** `200 OK`

Example request:

```http
PUT /books/42
```

Example request body:

```json
{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "publishedYear": 1958
}
```

---

## 5. Delete a Book

* **Method:** DELETE
* **Path:** `/books/{id}`
* **Description:** Deletes a book using its ID.
* **Success status:** `204 No Content`

Example request:

```http
DELETE /books/42
```

---

## 6. List Books by Author

* **Method:** GET
* **Path:** `/books?author={author}`
* **Description:** Returns books written by the specified author.
* **Success status:** `200 OK`

Example request:

```http
GET /books?author=Chinua%20Achebe
```

## Error Codes

### 400 Bad Request

The request is invalid or contains missing/invalid data.

Example:

```http
POST /books
```

with a request body missing the required `title` field.

### 404 Not Found

The requested resource does not exist.

Example:

```http
GET /books/9999
```

when book `9999` does not exist.

```