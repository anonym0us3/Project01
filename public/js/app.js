/* CLIENT-SIDE JS */

$(document).ready(function() {
	console.log("Braaaaaiiiiiiins");
	$.get('/api/prospects').success(function (prospects) {
		prospects.forEach(function(prospect) {
			renderProspect(prospect);
		});
	});

  $('#prospect-form form').on('submit', function(e) {
  e.preventDefault();
  var formData = $(this).serialize();
  console.log('formData', formData);
  $.post('/api/prospects', formData, function(prospect) {
    console.log('prospect after POST', prospect);
    renderProspect(prospect);  //render the server's response
  });
  $(this).trigger("reset");
  });

  $('#prospects').on('click', '.add-car', function(e) {
    var id = $(this).parents('.prospect').data('prospect-id');
    console.log('id',id);
  $('#newCarModal').data('album-id', id);
  $('#newCarModal').modal();
  });

  $('#prospects').on('click', '.delete-prospect', function(e) {
    var id = $(this).parents('.prospect').data('prospect-id');
    console.log('deleted id', id);
    $.ajax({
      method: 'DELETE',
      url: ('/api/prospects/' + id),
      success: function () {
        console.log("Now I am become death, Destroyer of worlds!");
        $('#' + id).remove();
      }
    });
  });

  $('#prospects').on('click', '.edit-prospect', function(e) {
    var id = $(this).parents('.prospect').data('prospect-id');
    console.log('id', id);
  });

  $('#saveNewCar').on('click', handleNewSongSubmit);

});

// handles the modal fields and POSTing the form to the server
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
  console.log('posting to ', postUrl, ' with data ', formData);

  $.post(postUrl, formData)
    .success(function(wishlist) {
      console.log('wishlist', wishlist);

      // re-get full album and render on page
      $.get('/api/prospects/' + prospectId).success(function(prospect) {
        //remove old entry
        $('[data-prospect-id='+ prospectId + ']').remove();
        // render a replacement
        renderProspect(prospect);
      });

      //clear form
      $('#carMake').val('');
      $('#carModel').val('');     
      $('#carYear').val('');
      $('#carColor').val('');
      $('#carStyle').val('');
      $('#newCarModal').modal('hide');

    });
}

function buildWishlistHtml(wishlists) {
  var wishlistText = "&ndash;";
  wishlists.forEach(function(wishlist) {
    wishlistText = "<li>" + wishlistText + " " + wishlist.make + " " + wishlist.model + " " + wishlist.year + " " + wishlist.color + " " + 
    wishlist.style + "</li>"; 
  });
  var wishlistHtml = 
"                       <li class = 'list=list-group-item'>" +
"                         <h4 class='inline-header'>Wishlists:</h4>" +
"                           <span>" + wishlistText + "</span>" +
"                       </li>";
  return wishlistHtml;
}

// Takes a single prospect and adds it to the page
function renderProspect(prospect) {
  console.log('rendering prospect:', prospect);

  var prospectHtml =
  "        <div class='row prospect' data-prospect-id='" + prospect._id + "' id='" + prospect._id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin prospect internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Prospect Name:</h4>" +
  "                        <span class='prospect-name'>" + prospect.name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Prospect Phone:</h4>" +
  "                        <span class='prospect-phone'>" + prospect.phone + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Prospect Email:</h4>" +
  "                        <span class='prospect-email'>" + prospect.email + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Prospect Address:</h4>" +
  "                        <span class='prospect-address'>" + prospect.address + "</span>" +
  "                      </li>" +

  buildWishlistHtml(prospect.wishlists) +


  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of prospect internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
  "                <button class='btn btn-primary add-car'>Add Car</button>" +
  "                <button class='btn btn-warning edit-prospect'>Edit Prospect</button>" + 
  "                <button class='btn btn-danger delete-prospect'>Delete Prospect</button>" + 
  "              </div>" +

  "              <div class='panel-footer'>" +

  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one prospect -->";

  $('#prospects').prepend(prospectHtml);
 }