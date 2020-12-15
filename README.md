# Digital_Events

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


---CRUD---

POST  /signup   {user}

POST  /signin   {email, pwd}

GET   /signout


GET   /location []

GET   /location/:id


*AUTH Role == "ADMIN"*

POST    /locations    {location}

PATCH   /location/:id {location}

DELETE  /location/:id


---DA DECIDERE---


GET   /me

PATCH /me {utente}

GET   /users []

GET   /user/:id
