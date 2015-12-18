1: implementing pattern-control to force this field to be a 10-digit number

<input id="phone" name="phone" type="tel" pattern="^\d{10}$" placeholder="1234567890" class="form-control input-md" required="">


2: Using += here instead of just = meant that I was no longer duplicating my submission entries, but rather adding to the existing ones

wishlistText += "<li class='wishlists-list' id=" + wishlist._id + ">" + " " + wishlist.make + " " + wishlist.model + " " +
wishlist.year + " " + wishlist.color + " " + wishlist.style + "</a></li>";

3: CSS Style for hard-coded new customer submit button

\#singlebutton {
	background-color: rgb(109,135,77);
}