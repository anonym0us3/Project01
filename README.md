# :oncoming_automobile: :blue_car: :car: carTopiary (Project01) :car: :blue_car: :oncoming_automobile:

[heroku link](http://aqueous-island-4247.herokuapp.com)

[github link](https://github.com/anonym0us3/Project01)

![screenshot](http://i.imgur.com/doKKMmM.jpg)



## carTopiary Overview:


Full CRUD Single-Page App with mongoose and Express.



### Prerequisites

* jQuery, AJAX
* Express server, static assets
* RESTful design
* JSON serving /api routes
* Bootstrap - for modals
* CRUD with mongoose
* mongoose embedded relationships


### Completion

- [x] Build a website!
- [x] Have a CRUD'able model
	- [x] Have a CRUD'able **sub**model!
- [ ] Integrate a 3rd-party API
- [ ] Integrate Authentication



### API Endpoints

Endpoint | Method | Route | Data
--- | --- | --- | ---
*Homepage* | GET | / | Serves the homepage
*API* | GET | /api | Basic API details
*All Prospects' data* (aka customers) | GET | /api/prospects | Shows the name, phone number, email address, physical address of all customers, as well as all of their desired car[s]
*New Prospect* | POST | /api/prospects | Creates new prospect and prepends to the page
*Single Prospect* | GET | /api/prospects/:id) | Shows the name, phone, email & physical addresses for a single prospect
*Wishlists* (aka customer's desired car[s]) | GET | /api/prospects/:id/wishlists | Shows make, model, year, color, style for all cars for a single customer
*New vehicle* | POST | /api/prospects/:id/wishlists | Adds single car to an existing customer
*Deleting customer* | DELETE | /api/prospects/:id | Deletes a single customer (and all of its associated cars) from the page
*Update a customer* | PUT | /api/prospects/:id | Form-data'izes a customer and then pushes the update to the page
*Update a customer's car* | PUT | /api/prospects/:prospectId/wishlists/:id | Updates a single car for a particular customer
*Deleting a customer's car* | DELETE | /api/prospects/:prospectId/wishlists/:id | Per click on Delete button, removes 1 car from a single customer
