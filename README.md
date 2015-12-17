# Project01

heroku link: TO BE DETERMINED

**carTopiary Overview:**



Full CRUD Single-Page App with mongoose and Express.

**Prerequisites:**

* jQuery, AJAX
* Express server, static assets
* RESTful design
* JSON serving /api routes
* Bootstrap - for modals
* CRUD with mongoose
* mongoose embedded relationships

Endpoint | Method | Route | Data
--- | --- | --- | ---
*Homepage* | GET | / | Serves the homepage
*API* | GET | /api | Basic API details
*All Prospects' data* (aka customers) | GET | /api/prospects | shows the name, phone number, email address, physical address for all prospects, as well as all of their Wishlists (aka desired car[s])
*New Prospect* | POST | /api/prospects | Creates new prospect and prepends to the page
*Single Prospect* | GET | /api/prospects/:id) | shows the name, phone, email & physical addresses for a single prospect
*Wishlists* (aka customer's desired car[s]) | GET | /api/prospects/:id/wishlists | shows make, model, year, color, style for all cars for a single customer
*New vehicle* | POST | /api/prospects/:id/wishlists | Adds single car to an existing customer
*Deleting customer* | DELETE | /api/prospects/:id | Deletes a single customer (and all of its associated cars) from the page
*Update a customer* | PUT | /api/prospects/:id | Form-data'izes a customer and then pushes the update to the page
*Update a customer's car* | PUT | /api/prospects/:prospectId/wishlists/:id | Updates a single car for a particular customer
*Deleting a customer's car* | DELETE | /api/prospects/:prospectId/wishlists/:id | Per click on Delete button, removes 1 car from a single customer