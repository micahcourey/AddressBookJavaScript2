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

        var newContact = new Contact(inputtedFirstName, inputtedLastName);

        $(".new-address").each(function() {
            var inputtedStreet = $(this).find("input.new-street").val();
            var inputtedCity = $(this).find("input.new-city").val();
            var inputtedState = $(this).find("input.new-state").val();
            var inputtedType = $(this).find("input.new-type").val();

            var newAddress = { street: inputtedStreet, city: inputtedCity, state: inputtedState, type: inputtedType};
            newContact.addresses.push(newAddress);

            console.log("new address type" + newAddress.type);
        });

        $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

        $(".contact").last().click(function() {
            $("#show-contact").show();
            $("#show-contact h2").text(newContact.firstName);
            $(".first-name").text(newContact.firstName);
            $(".last-name").text(newContact.lastName);

            $("ul#address").text("");
            newContact.addresses.forEach(function(address) {
                $("ul#address").append("<li>" + address.street + ", " + address.city + ", " +
                    address.state + " (" + address.type + ")" + "</li>");
            });
        });

        resetFields();

    });
});
