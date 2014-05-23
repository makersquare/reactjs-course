# Single Page Application API Template

Hi! This is a starter kit application template that implements a very basic (and very insecure) API that you can make RESTful requests to with a single-page application frontend. The idea is that you'll be building out a single page application on the root URL using nothing but a framework (or combination of frameworks, libraries, etc.).

## Application Overview

The site you're working with is called **awsumlink**. The database behind it has three core models: users, lists, and links. Users can have lists, and lists can have links.

The DB schemas:

```sql
users(
  id INTEGER PRIMARY KEY,
  username TEXT UNIQUE,
  password TEXT
);

lists(
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name TEXT, last_updated INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

links(
  id INTEGER PRIMARY KEY,
  list_id INTEGER NOT NULL,
  url TEXT,
  name TEXT,
  description TEXT,
  last_updated INTEGER,
  FOREIGN KEY(list_id) REFERENCES lists(id) ON DELETE CASCADE
);
```

There is currently no sign-in mechanism to store sessions or users. You can implement this yourself, but the core idea behind this template is to allow you build out a dynamic frontend interacting with a readily available API. Therefore no emphasis has been placed on typical concerns like session variables, security, etc.

This means that while you can clone and mess around with this site, it's NOT ready to go live! Don't put it on the internet!

## API

### GET `/users`

Returns all users as an array.

Example:

```json
[
  {
    "id": 1,
    "username": "Way",
    "password": "test"
  },
  {
    "id": 2,
    "username": "Jared",
    "password": "dog"
  }
]
```

### GET `/user/:id`

Return the username, password, id, and all lists and links of a specific user (you can pass either id or username here).

Returns:

```json
{
   "id":1,
   "username":"Way",
   "password":"test",
   "lists":[
      {
         "id":17,
         "user_id":1,
         "name":"My Favorite Links",
         "last_updated":1400874056,
         "links":[
            {
               "id":9,
               "list_id":17,
               "url":"http://www.google.com/",
               "name":"Google",
               "description":"I like finding stuff",
               "last_updated":1400874067
            },
            {
               "id":10,
               "list_id":17,
               "url":"http://html5zombo.com/",
               "name":"Zombocom",
               "description":"You can do anything here!",
               "last_updated":1400874120
            },
            {
               "id":11,
               "list_id":17,
               "url":"http://www.reddit.com/",
               "name":"Reddit",
               "description":"It's all right, I guess.",
               "last_updated":1400874297
            }
         ]
      },
      {
         "id":18,
         "user_id":1,
         "name":"Boring Links",
         "last_updated":1400874308,
         "links":[
            {
               "id":12,
               "list_id":18,
               "url":"http://www.worldsmostboringwebsite.com/",
               "name":"the world's most boring website",
               "description":"Not much else to say here.",
               "last_updated":1400874349
            },
            {
               "id":13,
               "list_id":18,
               "url":"http://sbutler.typepad.com/",
               "name":"Another Boring Site",
               "description":"I don't even know what this site is. Who cares?",
               "last_updated":1400874387
            }
         ]
      }
   ]
}
```

### POST `/user`

Create a new user. You must pass `username` and `password` as POST parameters. Returns `{ "status": 200 }` on success.

### DELETE `/user/:id`

Delete a user at the specified ID.

### GET `/user/:user_id/lists`

Returns just the lists belonging to a user.

Example:

```json
[
   {
      "id":17,
      "user_id":1,
      "name":"My Favorite Links",
      "last_updated":1400874056,
      "links":[
         {
            "id":9,
            "list_id":17,
            "url":"http://www.google.com/",
            "name":"Google",
            "description":"I like finding stuff",
            "last_updated":1400874067
         },
         {
            "id":10,
            "list_id":17,
            "url":"http://html5zombo.com/",
            "name":"Zombocom",
            "description":"You can do anything here!",
            "last_updated":1400874120
         },
         {
            "id":11,
            "list_id":17,
            "url":"http://www.reddit.com/",
            "name":"Reddit",
            "description":"It's all right, I guess.",
            "last_updated":1400874297
         }
      ]
   },
   {
      "id":18,
      "user_id":1,
      "name":"Boring Links",
      "last_updated":1400874308,
      "links":[
         {
            "id":12,
            "list_id":18,
            "url":"http://www.worldsmostboringwebsite.com/",
            "name":"the world's most boring website",
            "description":"Not much else to say here.",
            "last_updated":1400874349
         },
         {
            "id":13,
            "list_id":18,
            "url":"http://sbutler.typepad.com/",
            "name":"Another Boring Site",
            "description":"I don't even know what this site is. Who cares?",
            "last_updated":1400874387
         }
      ]
   }
]
```

### GET `/lists`

Returns all available lists.

Example:

```json
[
   {
      "id":14,
      "user_id":2,
      "name":"instantly",
      "last_updated":1400790553,
      "links":[
         {
            "id":7,
            "list_id":14,
            "url":"www.google.com",
            "name":"Jared loves google",
            "description":"description required",
            "last_updated":1400790518
         },
         {
            "id":8,
            "list_id":14,
            "url":"www.google.com",
            "name":"Jared still loves google",
            "description":"Here's a longer description Here's a longer description Here's a longer description Here's a longer description Here's a longer description Here's a longer description Here's a longer description Here's a longer description ",
            "last_updated":1400856519
         }
      ]
   },
   {
      "id":16,
      "user_id":2,
      "name":"Jared's New List",
      "last_updated":1400790570,
      "links":[
         {
            "id":14,
            "list_id":16,
            "url":"http://www.jared.com/en/jaredstore/gold--silver---other-jewelry/pandora-dangle-charm--dog--sterling-silver/100165/100165.100191.100192",
            "name":"Dog Necklace",
            "description":"Just in case I decide to buy this",
            "last_updated":1400874431
         }
      ]
   },
   {
      "id":17,
      "user_id":1,
      "name":"My Favorite Links",
      "last_updated":1400874056,
      "links":[
         {
            "id":9,
            "list_id":17,
            "url":"http://www.google.com/",
            "name":"Google",
            "description":"I like finding stuff",
            "last_updated":1400874067
         },
         {
            "id":10,
            "list_id":17,
            "url":"http://html5zombo.com/",
            "name":"Zombocom",
            "description":"You can do anything here!",
            "last_updated":1400874120
         },
         {
            "id":11,
            "list_id":17,
            "url":"http://www.reddit.com/",
            "name":"Reddit",
            "description":"It's all right, I guess.",
            "last_updated":1400874297
         }
      ]
   },
   {
      "id":18,
      "user_id":1,
      "name":"Boring Links",
      "last_updated":1400874308,
      "links":[
         {
            "id":12,
            "list_id":18,
            "url":"http://www.worldsmostboringwebsite.com/",
            "name":"the world's most boring website",
            "description":"Not much else to say here.",
            "last_updated":1400874349
         },
         {
            "id":13,
            "list_id":18,
            "url":"http://sbutler.typepad.com/",
            "name":"Another Boring Site",
            "description":"I don't even know what this site is. Who cares?",
            "last_updated":1400874387
         }
      ]
   }
]
```

### GET `/list/:id`

Returns a specific list, including its links.

Example:

```json
{
   "id":18,
   "user_id":1,
   "name":"Boring Links",
   "last_updated":1400874308,
   "links":[
      {
         "id":12,
         "list_id":18,
         "url":"http://www.worldsmostboringwebsite.com/",
         "name":"the world's most boring website",
         "description":"Not much else to say here.",
         "last_updated":1400874349
      },
      {
         "id":13,
         "list_id":18,
         "url":"http://sbutler.typepad.com/",
         "name":"Another Boring Site",
         "description":"I don't even know what this site is. Who cares?",
         "last_updated":1400874387
      }
   ]
}
```

### POST `/list`

Create a new list. Requires POST parameters `name` and `user_id`. Returns `{ "status": 200 }` on success.

### PUT `/list/:id`

Update a list's values. You can include the parameters `user_id` and `name`. This means that you can rename and reassign lists to different users if you choose. Returns `{ "status": 200 }` on success.

### DELETE `/list/:id`

Delete a list. Returns `{ "status": 200 }` on success.

### GET `/links`

Returns all available links.

Example:

```json
[
   {
      "id":1,
      "list_id":2,
      "url":"http://www.just.com/",
      "name":"Jared's Renamed Link",
      "description":"Yeah! OK!",
      "last_updated":1400686875
   },
   {
      "id":5,
      "list_id":12,
      "url":"blah.com",
      "name":"blah",
      "description":"blah!!",
      "last_updated":1400790157
   },
   {
      "id":6,
      "list_id":3,
      "url":"jared.com",
      "name":"jared's link",
      "description":"jared loves links",
      "last_updated":1400790228
   },
   {
      "id":7,
      "list_id":14,
      "url":"www.google.com",
      "name":"Jared loves google",
      "description":"description required",
      "last_updated":1400790518
   },
   {
      "id":8,
      "list_id":14,
      "url":"www.google.com",
      "name":"Jared still loves google",
      "description":"Here's a longer description Here's a longer description Here's a longer description Here's a longer description Here's a longer description Here's a longer description Here's a longer description Here's a longer description ",
      "last_updated":1400856519
   },
   {
      "id":9,
      "list_id":17,
      "url":"http://www.google.com/",
      "name":"Google",
      "description":"I like finding stuff",
      "last_updated":1400874067
   },
   {
      "id":10,
      "list_id":17,
      "url":"http://html5zombo.com/",
      "name":"Zombocom",
      "description":"You can do anything here!",
      "last_updated":1400874120
   },
   {
      "id":11,
      "list_id":17,
      "url":"http://www.reddit.com/",
      "name":"Reddit",
      "description":"It's all right, I guess.",
      "last_updated":1400874297
   },
   {
      "id":12,
      "list_id":18,
      "url":"http://www.worldsmostboringwebsite.com/",
      "name":"the world's most boring website",
      "description":"Not much else to say here.",
      "last_updated":1400874349
   },
   {
      "id":13,
      "list_id":18,
      "url":"http://sbutler.typepad.com/",
      "name":"Another Boring Site",
      "description":"I don't even know what this site is. Who cares?",
      "last_updated":1400874387
   },
   {
      "id":14,
      "list_id":16,
      "url":"http://www.jared.com/en/jaredstore/gold--silver---other-jewelry/pandora-dangle-charm--dog--sterling-silver/100165/100165.100191.100192",
      "name":"Dog Necklace",
      "description":"Just in case I decide to buy this",
      "last_updated":1400874431
   }
]
```

### POST `/link`

Create a link. Requires all POST parameters `list_id`, `url`, `name`, and `description`. Returns `{ "status": 200 }` on success.

### PUT `/link/:id`

Update a link. Requires at least one POST parameter out of `list_id`, `url`, `name`, and `description`. Returns `{ "status": 200 }` on success.

### DELETE `/link/:id`

Delete a link. Returns `{ "status": 200 }` on success.
