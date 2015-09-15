function Contact(firstName, lastName){
  this.firstName = firstName;
  this.lastName = lastName;
  this.addresses = [];
};

Contact.prototype.fullName = function() {
    return this.firstName + " " + this.lastName;
};

function Address(street, city, state, type) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.type = type;
};

Address.prototype.fullAddress = function() {
    return this.street + ", " + this.city + ", " + this.state;
};

function resetFields() {
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");
    $("input.new-type").val("");

    // Hide all but the first new address form on reset
    $(".new-address").not(":first").fadeOut("slow");
};

function newAddress() {
    $("#new-addresses").append('<div class="new-address">' +
                                '<div class="form-group">' +
                                    '<label for="new-street">Street</label>' +
                                    '<input type="text" class="form-control new-street">' +
                                '</div>' +
                                '<div class="form-group">' +
                                    '<label for="new-city">City</label>' +
                                    '<input type="text" class="form-control new-city">' +
                                '</div>' +
                                '<div class="form-group">' +
                                    '<label for="new-state">State</label>' +
                                    '<input type="text" class="form-control new-state">' +
                                '</div>' +
                                '<div class="form-group">' +
                                    '<label for="new-type">Address Type</label>' +
                                    '<input type="text" class="form-control new-type">' +
                                '</div>' +
                            '</div>').hide().fadeIn("slow");
};

$(document).ready(function() {
    $("#add-address").click(function() {
        newAddress();
        // $(".new-address").hide().fadeIn("slow");
    });


    $("form#new-contact").submit(function(event) {
        event.preventDefault();

        var inputtedFirstName = $("input#new-first-name").val();
        var inputtedLastName = $("input#new-last-name").val();

        // If user did not input a first or last name, animate the button
        // and don't submit the form.
        // Else submit the form.
        if (inputtedFirstName === "" || inputtedLastName === "") {
            console.log("no first or last name");
            $("#submit-btn").toggleClass("shakeyrbutt");
        } else {
            var newContact = new Contact(inputtedFirstName, inputtedLastName);

            $(".new-address").each(function() {
                var inputtedStreet = $(this).find("input.new-street").val();
                var inputtedCity = $(this).find("input.new-city").val();
                var inputtedState = $(this).find("input.new-state").val();
                var inputtedType = $(this).find("input.new-type").val();

                var newAddress = { street: inputtedStreet, city: inputtedCity, state: inputtedState, type: inputtedType};
                newContact.addresses.push(newAddress);
            });

            $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

            $(".contact").last().click(function() {
                // Copy to clipboard on click--
                // Create a temporary input box and add it to the end of the page
                var tempInputBox = $("<input>");
                $("body").append(tempInputBox);

                // Insert the full name of this contact into the new box and select it
                tempInputBox.val(newContact.fullName()).select();

                // Run the copy command and remove the temporary input box
                document.execCommand("copy");
                tempInputBox.remove();
            });

            $(".contact").last().hover(function() {
                // Hover on
                $("#show-contact").show();
                $("#show-contact h2").text(newContact.firstName);
                $(".first-name").text(newContact.firstName);
                $(".last-name").text(newContact.lastName);

                $("ul#address").text("");
                newContact.addresses.forEach(function(address) {
                    $("ul#address").append("<li>" + address.street + ", " + address.city + ", " +
                        address.state + " (" + address.type + ")" + "</li>");
                });
            }, function() {
                // Hover off
                // $("#show-contact").hide();
            });

            resetFields();

        }



    });
});
