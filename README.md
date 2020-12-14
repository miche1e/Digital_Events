# Digital_Events

- obbligatori
? facoltativi


---OBJECTS---

user ={
  -id
  -email
  -pwd
  -ruolo
  ?firstName
  ?secondName
  ?phone
  ?position
}

location = {
  -id
  -description
  -position
}

position = {
  -lat
  -long
}


---CRUD---

POST  /signup   {user}

POST  /signin   {email, pwd}

GET   /signout


GET   /location []

GET   /location/:id

POST  /locations  {location}


*AUTH Role == "ADMIN"*

POST    /locations    {location}

PATCH   /location/:id {location}

DELETE  /location/:id


---DA DECIDERE---


GET   /me

PATCH /me {utente}

GET   /users []

GET   /user/:id
