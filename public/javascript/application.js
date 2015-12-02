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
        var temp = 100;

        // ***** change this
        // concatenate the html to bottom
        // ... of nav links in views/index.erb
        myTag.after(showContactFormHtml);
        //myTag.replaceWith(morePostsHtml);
        registerShowContactSubmitForm();
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

