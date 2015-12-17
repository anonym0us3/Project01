# Project01

heroku link: TO BE DETERMINED

**Project01 Overview:**



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
*API* | GET | /api | Basic API details
*All Prospects' data* (aka customers) | GET | /api/prospects | shows the name, phone number, email address, physical address for all prospects, as well as all of their Wishlists (aka desired car[s])
*Single Prospect* | GET | /api/prospects/:prospectId (or :id) | shows the name, phone, email & physical addresses for a single prospect
*Wishlists* (aka customer's desired car[s]) | GET | /api/prospects/:prospectId/wishlists | shows make, model, year, color, style for all cars for a single customer
