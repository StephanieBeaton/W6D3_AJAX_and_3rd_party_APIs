$(function() {

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  var handlers = {
    container: $("#contacts").find('tbody'),
    addContact: function(index, contact) {
      var tr = $("<tr>").appendTo(handlers.container);
      $("<td>").text(contact.firstname).appendTo(tr);
      $("<td>").text(contact.lastname).appendTo(tr);
      $("<td>").text(contact.email).appendTo(tr);
    },
    receiveContacts: function(contacts) {
      $.each(contacts, handlers.addContact);
    },
    getPlayers: function() {
      handlers.container.empty();
      $.getJSON("/contacts", handlers.receiveContacts);
    }
  };


  // ----------------------------------------------------------
  // event handler for submit button on Add Contact Form
  //
  //  MUST ADD THIS AFTER ADD CONTACT FORM IS LOADED !!!
  // ----------------------------------------------------------
  function registerAddContactSubmitForm () {
    $("#submitbutton").on('click', function(event) {

      // get values from the form input fields here

      var firstname = $("#firstname").val();
      var lastname  = $("#lastname").val();
      var email     = $("#email").val();

      var data = {};
      data.firstname = firstname;
      data.lastname  = lastname;
      data.email     = email;

      // use AJAX to send new Contact to the server
      $.ajax({
        url: 'contacts',
        method: 'POST',
        dataType: 'json',
        data: data,
        success: function (result) {
          var temp = 100;

          // should handle both success and error returned

          // send message back to main page
          $("#message").text("Sucessfully save new contact.");

          // add to table here
          var myTag = $("#contacts").find('tbody');

          var contact = result.contact;

          var tr = $("<tr>").appendTo(myTag);
          $("<td>").text(contact.firstname).appendTo(tr);
          $("<td>").text(contact.lastname).appendTo(tr);
          $("<td>").text(contact.email).appendTo(tr);

        },
        error: function (err) {
          var temp = 100;
          console.log("Save of new Contact failed.");
        }
      });

    });
  }

  // ----------------------------------------------------------
  //
  //  display the New Contact Form
  //
  // ----------------------------------------------------------

  function displayNewContactForm(event, myMainMenu) {

    //  construct the form
    //
    //  <fieldset>
    //   <legend>New Player</legend>
    //   <input type="text" id="jersey" placeholder="Jersey Number"><br>
    //   <input type="text" id="position" placeholder="Position?"><br>
    //   <input type="text" id="weight" placeholder="How fat is he?"><br>
    //   <button id="new_player">New Player</button><br>
    // </fieldset>

    // <div id="container">
    //   <h1>Add Contact</h1>
    //   <form action="" method="post" id="customtheme">
    //     <p>
    //       <label for="firstname">First name</label>
    //       <input type="text" name="firstname" id="firstname" placeholder="First Name"/>
    //     </p>

    //     <p>
    //       <label for="lastname">Last name</label>
    //       <input type="text" name="lastname" id="lastname" placeholder="Last Name"/>
    //     </p>

    //     <p>
    //       <label for="email">Email</label>
    //       <input type="text" name="email" id="email" placeholder="email@foo.net"/>
    //     </p>

    //     <p>
    //       <input type="button" name="submit" value="Submit" id="submitbutton"/>
    //     </p>
    //   </form>
    // </div>


   //  <fieldset>
    //   <legend>New Player</legend>
    //   <input type="text" id="jersey" placeholder="Jersey Number"><br>
    //   <input type="text" id="position" placeholder="Position?"><br>
    //   <input type="text" id="weight" placeholder="How fat is he?"><br>
    //   <button id="new_player">New Player</button><br>
    // </fieldset>

    // var tr = $("<fieldset>").appendTo(myMainMenu);
    //   $("legend").text("New Player").appendTo(myMainMenu);
    //   $("<td>").text(contact.firstname).appendTo(tr);
    //   $("<td>").text(contact.lastname).appendTo(tr);
    //   $("<td>").text(contact.email).appendTo(tr);

     removeAllForNewCommand();

     // ----------------------------------------------
     //  Cheat and get contact form html from server
     // ----------------------------------------------
     $.ajax({
      url: 'add_contact_form.html',
      method: 'GET',
      success: function (addContactsFormHtml) {
        var temp = 100;

        myMainMenu.after(addContactsFormHtml);
        //myMainMenu.replaceWith();
        registerAddContactSubmitForm();
      }
    });

  }

  // ----------------------------------------------------------
  //
  //  display the list of all the Contacts
  //
  // ----------------------------------------------------------

  function listContactsForm(event, myTag) {

    removeAllForNewCommand();

    // get the contacts
    $.getJSON("/contacts", handlers.receiveContacts);

  }


  // ----------------------------------------------------------
  //
  //  register an event handler to handle the
  //  ... submit button on the Show Contact form
  //
  // ----------------------------------------------------------

  function registerShowContactSubmitForm() {
   $("#submitbutton").on('click', function(event) {

      // get values from the form input fields here

      var contactid = $("#contactid").val();

      // use AJAX to send new Contact to the server
      $.ajax({
        url: 'contacts/' + contactid,
        method: 'GET',
        success: function (contactJsonString) {

          contact = JSON.parse(contactJsonString);
          // should handle both success and error returned

          // send message back to main page
          //  ... display the Contact

          $("#message").text("Sucessfully retrieved contact.");
          var myTag = $("#contacts").find('tbody');


          var tr = $("<tr>").appendTo(myTag);
          $("<td>").text(contact.firstname).appendTo(tr);
          $("<td>").text(contact.lastname).appendTo(tr);
          $("<td>").text(contact.email).appendTo(tr);

        },
        error: function (err) {
          var temp = 100;
          console.log("Get of Contact with contact id failed.");
        }
      });

    });
  }

  // ----------------------------------------------------------
  //
  //  display the "show" Contact form
  //  ... where user enters  Contact Id
  //
  // ----------------------------------------------------------
  function showContactsForm(event, myTag) {

    removeAllForNewCommand();

    $.ajax({
      url: 'show_contact_form.html',
      method: 'GET',
      success: function (showContactFormHtml) {

        myTag.after(showContactFormHtml);

        registerShowContactSubmitForm();
      }
    });

  }

  // ----------------------------------------------------------
  //
  //  Get 3rd Party API data
  //
  // ----------------------------------------------------------
  function get3rdPartyAPIData(myTag) {

    removeAllForNewCommand();

    // ----------------------------------------------
    //  works to my local Sinatra server
    //
    // var host_prefix = "http://localhost:3000";
    //
    // var url = host_prefix + '/jsonp?callback=?';
    // ----------------------------------------------

    // Instagram
    //  [http://instagram.com/developer/endpoints/tags/#get_tags_media_recent]

    // https://api.instagram.com/v1/tags/{tag-name}/media/recent?access_token=ACCESS-TOKEN

    // GET/tags/tag-name/media/recent

    // Hint #2: Instagram has changed there api to sandbox all new apps
    // and restrict them to only the users posted pictures before the app is approved.
    // If you're debugging instagram api issues
    // that are returning no data for tags on the 3rd party api homework,
    // that's likely the cause.


    //   http://www.pinceladasdaweb.com.br/instagram/access-token/

    //  This tool will return an Instagram API access token.
    //  An access token is required by the Instagram API to make user specific queries.
    //  Once you have your access token you can pull your recent pictures using this api call:

    //  https://api.instagram.com/v1/users/[USER ID]/media/recent?access_token=[ACCESS TOKEN]


    // CLIENT INFO
    // CLIENT ID d62e74ff28a94958970a92a4cf727da4
    // CLIENT SECRET 5562c717c6b44364b8a0b574f6c76379
    // WEBSITE URL http://localhost:3000
    // REDIRECT URI  https://github.com/StephanieBeaton
    // SUPPORT EMAIL stefanybeaton@gmail.com


   // https://api.instagram.com/v1/tags/{tag-name}/media/recent?access_token=ACCESS-TOKEN

   // If you're writing an AJAX application, and you'd like to wrap our response with a callback,
   // all you have to do is specify a callback parameter with any API call:


    var host_prefix = "https://api.instagram.com";
    var tag_name = 'lighthouse';

    var ACCESS_TOKEN = "2306277391.d62e74f.01eabd78d0704e80b695fc97d52e1b61";
    var url = host_prefix + '/v1/tags/' + tag_name + '/media/recent?access_token=' + ACCESS_TOKEN;

    //+ '&callback=callbackFunction'

    console.log(url);

    $.ajax({
      url: url,
      method: 'GET',
      dataType:  'jsonp',
      success: function (jsonp) {


        // Instagram
        //
        // Hint #1: extract the image URL from the JSON data by referencing it like so:
        //          Where index is an integer variable
        //
        //     json.data[index].images.standard_resolution.url


        $("#message").text("Sucessfully retrieved 3rd party data.");

        var photo_url = "";

        text = "<div class='thirdparty' id='3rdpartydata'>";

        for (var index=0; index<jsonp.data.length; index++) {

          photo_url = jsonp.data[index].images.standard_resolution.url;
          text += "<img height=200px src='" + photo_url + "'><br>";

        }

        text += "</div>";

        //var text = "<div id='3rdpartydata'>" + JSON.stringify(jsonp, null, 2) + "</div>";

        myTag.after(text);

      },
      error: function (err) {
        var temp = 100;
        console.log("JSONP GET failed.");
      }
    });


  }

  // ----------------------------------------------------------
  //
  //  delete everything ready for new command
  //
  // ----------------------------------------------------------
  function removeAllForNewCommand () {

    // delete all Data Rows in table
    var myTag = $("#contacts").find('tbody');

    myTag.html("");

    // remove Add Contact Form
    $('#addcontactcontainer').remove();

    // remove Show Contact Form
    $('#showcontactcontainer').remove();

    $("#message").text("");

    $("#3rdpartydata").remove();
  }


  // function () {
  //     var button = $(‘load-more-posts’);
  //     button.on(‘click’, function () {
  //       $.ajax({
  //         url: 'add_contact_form.html',
  //         method: 'GET',
  //         data: { name: name}
  //         success: function (morePostsHtml) {
  //           button.replaceWith(morePostsHtml);
  //         }
  //       });
  //     });
  //   }

  // ----------------------------------------------------------
  //
  // event handler for "navigation" links on home page
  //
  // ----------------------------------------------------------
  $("#mainmenu").on('click', function(event){

    var target  = event.target.id;
    var myTag = $(this);

    event.preventDefault();

    switch(target) {
    case "new":
        console.log("mainmenu new");
        displayNewContactForm(event, myTag);
        break;
    case "list":
        console.log("mainmenu list");
        listContactsForm(event, myTag);
        break;
    case "show":
        console.log("mainmenu show");
        showContactsForm(event, myTag);
        break;
    case "find":
        console.log("mainmenu find");
        break;
    case "3rdpartyapi":
        console.log("mainmenu get 3rd party API data");
        get3rdPartyAPIData(myTag);
        break;
    default:
        console.log("mainmenu error");
    }


  });


  // ----------------------------------------------------------
  //   --- end ----
  // ----------------------------------------------------------


});


// ----------------------------------------------------------
//   Don Burkes code from class
// ----------------------------------------------------------
// $(function() {
//   var handlers = {
//     container: $("#canucks").find('tbody'),
//     addPlayer: function(index, player) {
//       var tr = $("<tr>").appendTo(handlers.container);
//       $("<td>").text(player.name).appendTo(tr);
//       $("<td>").text(player.position).appendTo(tr);
//       $("<td>").text(player.weight).appendTo(tr);
//     },
//     receivePlayers: function(players) {
//       $.each(players, handlers.addPlayer);
//     },
//     getPlayers: function() {
//       handlers.container.empty();
//       $.getJSON("/players", handlers.receivePlayers);
//     }
//   };

//   $("#load_players").on('click', handlers.getPlayers);
//   $("#new_player").on('click', function() {
//     var num = $("#jersey").val();
//     var pos = $("#position").val();
//     var weight = $("#weight").val();
//     var player = {name: num, position: pos, weight: weight};

//     $.post("/new_player", player, function(data) {
//       if (data.result) {
//         handlers.addPlayer(0, player);
//       } else {
//         alert("Unable to create player.");
//       }
//     }, 'json');
//   });
// });

