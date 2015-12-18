/* CLIENT-SIDE JS */

$(document).ready(function() {
	console.log("Sanity Check:       Braaaaaiiiiiiins");
  // Show prospects on page-load
  $.get('/api/prospects').success(function (prospects) {
    prospects.forEach(function(prospect) {
      renderProspect(prospect);
    });
  });

  // Add a new prospect
  $('#prospect-form form').on('submit', function(e) {
  e.preventDefault();
  var formData = $(this).serialize();
  $.post('/api/prospects', formData, function(prospect) {
    renderProspect(prospect);  //render the server's response
  });
  $(this).trigger("reset");
  });

  // Add an additional car to a prospect's wishlist of desired cars
  $('#prospects').on('click', '.add-car', function(e) {
    var id = $(this).parents('.prospect').data('prospect-id');
  $('#newCarModal').data('prospect-id', id);
  $('#newCarModal').modal();
  });


  // Delete a prospect & their associated vehicle(s) (wishlist items)
  $('#prospects').on('click', '.delete-prospect', function(e) {
    var id = $(this).parents('.prospect').data('prospect-id');
    $.ajax({
      method: 'DELETE',
      url: ('/api/prospects/' + id),
      success: function () {
        // Because Robert Oppenheimer is a f*&%!ng b@d@$$, quoting from Bhagavad-Gita:
        console.log("Now I am become death, Destroyer of worlds!");
        $('#' + id).remove();
      }
    });
  });


  // Save new vehicle submission to prospect's wishlist
  $('#saveNewCar').on('click', handleNewCarSubmit);

  // Update a prospect's details
  $('#prospects').on('click', '.edit-prospect', handleProspectEdit);

  // Save a prospect's details on update
  $('#prospects').on('click', '.save-edits', handleSaveProspectChanges);

  // Click action for editing a single prospect's wishlists
  $('#prospects').on('click', '.edit-wishlists', handleEditWishlistsClick);

  // Click action for deleting a single car (wishlist item) from a single prospect
  $('#editCarsModal').on('click', '.delete-car', handleDeleteCarClick);

  // Submit action for updating a single (or multiple) car's(s') data for a single prospect
  $('#editCarsModal').on('submit', 'form', handleUpdateCar);

});



// End of Document Ready


// AJAX for handling updating single car's data/information fields
function handleUpdateCar(e) {
  e.preventDefault();
  // Get the values from the car in the modal
  var prospectId = $(this).attr('id');
  var make = $(this).find('.wishlist-make').val();
  var model = $(this).find('.wishlist-model').val();
  var year = $(this).find('.wishlist-year').val();
  var color = $(this).find('.wishlist-color').val();
  var style = $(this).find('.wishlist-style').val();
  var wishlistId = $(this).find('.delete-car').attr('data-wishlist-id');
  var url = '/api/prospects/' + prospectId + '/wishlists/' + wishlistId;
  $.ajax({
    method: 'PUT',
    url: url,
    data: { make: make, model: model, year: year, color: color, style: style },
    success: function (data) {
      updateWishlistsList(prospectId);
    }
  });
}


// Function for what to do when clicking on edit desired cars button
function handleEditWishlistsClick(e) {
  e.preventDefault();
  var prospectId = $(this).parents('.prospect').data('prospect-id');
  // getting all cars (wishlists) for this single prospect
  $.get('/api/prospects/' + prospectId + '/wishlists').success(function(wishlists) {
    var formHtml = generateEditWishlistsModalHtml(wishlists, prospectId);
    $('#editCarsModalBody').html(formHtml);
    $('#editCarsModal').modal();    
  });
}


// Take an array of car data from the wishlist and produce an Edit form from the data
function generateEditWishlistsModalHtml(wishlists, prospectId) {
  var html = '';
  wishlists.forEach(function(wishlist) {
    html += '<form class="form-inline" id="' + prospectId + '">' +
            ' <div class="form-group">' +
            '<label class="col-md-4 control-label" for="make">Make</label>'+
              '<input type="text" class="form-control wishlist-make" value="' + wishlist.make + '">' +
            '</div>' +
            ' <div class="form-group">' +
            '<label class="col-md-4 control-label" for="model">Model</label>'+
              '<input type="text" class="form-control wishlist-model" value="' + wishlist.model + '">' +
            '</div>' +
            ' <div class="form-group">' +
            '<label class="col-md-4 control-label" for="year">Year</label>'+
              '<input type="number" class="form-control wishlist-year" value="' + wishlist.year + '">' +
            '</div>' +
            ' <div class="form-group">' +
            '<label class="col-md-4 control-label" for="color">Color</label>'+
              '<input type="text" class="form-control wishlist-color" value="' + wishlist.color + '">' +
            '</div>' +
            ' <div class="form-group">' +
            '<label class="col-md-4 control-label" for="style">Style</label>'+
              '<input type="text" class="form-control wishlist-style" value="' + wishlist.style + '">' +
            '</div>' +
            ' <div class="form-group">' +
              '<button class="btn btn-danger delete-car" data-wishlist-id="' + wishlist._id + '">Delete Car</button>' +
            '</div>' +
            ' <div class="form-group">' +
              '<button type="submit" class="btn btn-success save-car" data-wishlist-id"' + wishlist._id + '">Save changes</span></button>' +
            '</div>' +  
            '<hr>' +  
            '</form>';
  });

  return html;
}


function handleDeleteCarClick(e) {
  e.preventDefault();
  var wishlistId = $(this).data('wishlist-id');
  var prospectId = $(this).closest('form').attr('id');
  var $thisWishlist = $(this);
  var requestUrl = ('/api/prospects/' + prospectId + '/wishlists/' + wishlistId);
  $.ajax({
    method: 'DELETE',
    url: requestUrl,
    success: function(data) {
      $thisWishlist.closest('form').remove();
      updateWishlistsList(prospectId);
    }
  });
}


function updateWishlistsList(prospectId) {
  // Re-getting cars again (after one has been deleted)
  $.get('/api/prospects/' + prospectId + '/wishlists/').success(function(someProspects) {
    // Build a new <li> item
    var replacementLi = buildWishlistHtml(someProspects);
    // Replace the <li> with the cars in it
    $('[data-prospect-id=' + prospectId + '] .carsHeader').remove();
    $('[data-prospect-id=' + prospectId + '] .carsList').remove();
    $('[data-prospect-id=' + prospectId + '] .stuffContainer').append(replacementLi);
  });
}


// Takes a customer (prospect) id (from mongoDB) and returns the row in which that customer exists
function getProspectRowById(id) {
  return $('[data-prospect-id=' + id + ']');
}


// Create the UPDATE form for customer (prospect) model when using UPDATE route
function handleProspectEdit (e) {
  var prospectId = $(this).parents('.prospect').data('prospect-id');
  var $prospectRow = getProspectRowById(prospectId);

  $(this).parent().find('.edit-prospect').hide();
  $(this).parent().find('.save-edits').show();

  // replace current spans with inputs
  var prospectName = $prospectRow.find('span.prospect-name').text();
  $prospectRow.find('span.prospect-name').html('<input class="edit-prospect-name" value="' + prospectName + '"></input>');

  var prospectPhone = $prospectRow.find('span.prospect-phone').text();
  $prospectRow.find('span.prospect-phone').html('<input class="edit-prospect-phone" type="tel" pattern="^\d{10}$" value="' + prospectPhone + '"></input>');

  var prospectEmail = $prospectRow.find('span.prospect-email').text();
  $prospectRow.find('span.prospect-email').html('<input class="edit-prospect-email" value="' + prospectEmail + '"></input>');

  var prospectAddress = $prospectRow.find('span.prospect-address').text();
  $prospectRow.find('span.prospect-address').html('<input class="edit-prospect-address" value="' + prospectAddress + '"></input>');

}


// Process the newly-supplied data for a customer and PUT it back to the DB
function handleSaveProspectChanges(e) {
  var prospectId = $(this).parents('.prospect').data('prospect-id');
  var $prospectRow = getProspectRowById(prospectId);

  var data = {
    name: $prospectRow.find('.edit-prospect-name').val(),
    phone: $prospectRow.find('.edit-prospect-phone').val(),
    email: $prospectRow.find('.edit-prospect-email').val(),
    address: $prospectRow.find('.edit-prospect-address').val()
  };

  $.ajax({
    method: 'PUT',
    url: '/api/prospects/' + prospectId,
    data: data,
    success: function(data) {
      $prospectRow.replaceWith(generateProspectHtml(data));
    }
  });

  $(this).parent().find('.save-edits').hide();
  $(this).parent().find('.edit-prospect').show();
}


// Handle the modal fields and POST the form to the server
function handleNewCarSubmit(e) {
  var prospectId = $('#newCarModal').data('prospect-id');
  var carMake = $('#carMake').val();
  var carModel = $('#carModel').val();
  var carYear = $('#carYear').val();
  var carColor = $('#carColor').val();
  var carStyle = $('#carStyle').val();

  var formData = {
    make: carMake,
    model: carModel,
    year: carYear,
    color: carColor,
    style: carStyle
  };

  var postUrl = '/api/prospects/' + prospectId + '/wishlists';

  $.post(postUrl, formData)
    .success(function(wishlist) {
      // Re-get full prospect and render on page
      $.get('/api/prospects/' + prospectId).success(function(prospect) {
        // Remove old entry
        $('[data-prospect-id='+ prospectId + ']').remove();
        // Render a replacement
        renderProspect(prospect);
      });

      // Clear form
      $('#carMake').val('');
      $('#carModel').val('');     
      $('#carYear').val('');
      $('#carColor').val('');
      $('#carStyle').val('');
      $('#newCarModal').modal('hide');

    });
}


function buildWishlistHtml(wishlists) {
  var wishlistText = "";
  wishlists.forEach(function(wishlist) {
    wishlistText += "<li class='wishlists-list' id=" + wishlist._id + ">" + " " + wishlist.make + " " + wishlist.model + " " +
                  wishlist.year + " " + wishlist.color + " " + wishlist.style + "</a></li>";
  });
  var wishlistHtml = 
"                       <h4 class='inline-header carsHeader'>Desired cars list:</h4>" +
"                       <ul class='carsList'>" + wishlistText + "</ul>";
  return wishlistHtml;
}


// Take a single prospect and add it to the page
function generateProspectHtml(prospect) {

  var prospectHtml =
  "        <div class='row prospect' data-prospect-id='" + prospect._id + "' id='" + prospect._id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin prospect internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-9 col-xs-12 stuffContainer'>" +
  "                    <ul class='list-group'>" +
  "                       <div id=basicDetails>" + 
  "                          <li class='list-group-item'>" +
  "                          <h4 class='inline-header'>Prospect Name:</h4>" +
  "                          <span class='prospect-name'>" + prospect.name + "</span>" +
  "                        </li>" +
  "                        <li class='list-group-item'>" +
  "                          <h4 class='inline-header'>Prospect Phone:</h4>" +
  "                          <span class='prospect-phone'>" + prospect.phone + "</span>" +
  "                        </li>" +
  "                        <li class='list-group-item'>" +
  "                          <h4 class='inline-header'>Prospect Email:</h4>" +
  "                          <span class='prospect-email'>" + prospect.email + "</span>" +
  "                        </li>" +
  "                       <li class='list-group-item'>" +
  "                          <h4 class='inline-header'>Prospect Address:</h4>" +
  "                          <span class='prospect-address'>" + prospect.address + "</span>" +
  "                        </li>" +
  "                       </div>" +
  "                    </ul>" +
  buildWishlistHtml(prospect.wishlists) +


  "                  </div>" +
  "                </div>" +
  "                <!-- end of prospect internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
  "                <button class='btn btn-primary add-car'>Add Car to List</button>" +
  "                <button class='btn btn-info edit-wishlists'>Edit Desired Cars</button>" +
  "                <button class='btn btn-warning edit-prospect'>Edit Prospect</button>" +
  "                <button class='btn btn-success btn-lg save-edits'>Save Changes</button>" + 
  "                <button class='btn btn-danger delete-prospect'>Delete Prospect</button>" + 
  "              </div>" +

  "              <div class='panel-footer'>" +

  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one prospect -->";

    return prospectHtml;
 }

// Takes a single prospect and render it to the page
function renderProspect(prospect) {
  var html = generateProspectHtml(prospect);

  $('#prospects').prepend(html);
}