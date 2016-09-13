$(document).ready(function () {
    // submit action for form
    $('form').on("submit", function (event) {
        event.preventDefault();
        let result = checkForm();
        if (result.length === 0) {
            if($('#emsg').hasClass('noshow') == false) {
                $('#emsg').addClass('noshow');
            }
            sendMail(this);
        }
        else {
            result.css("background-color", "pink");
            $('#emsg').toggleClass('noshow');
        }
        
    });
    // initialize empty (invalid) fields
    $('input.required').addClass('invalid');
    
    // check required fields as user types input
    $('input').keyup(function (e) {
        switch (this.id) {
        case "first":
        case "last":
            if (checkName(this.value) !== true) {
                toInvalid(this);
                return;
            }
            break;
        case "email":
            if (checkEmail(this.value) !== true) {
                toInvalid(this);
                return;
            }
            break;
        default:
            return;
        }
        // did pass all checks above, so input value valid
        $(this).removeClass('invalid').addClass('valid').css("background-color", "white");
    });
    // ignore 'enter' key
    $('form').find('input').keypress(function (e) {
        if (e.which == 13) // Enter key has keycode = 13
        {
            return false; // ignore Enter key
        }
    });
});

function checkName(str) {
    // at least one letter character
    let re = /^.*[a-zA-Z]+.*$/;
    return re.test(str);
}

function checkEmail(str) {
    // must match email pattern
    let re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    return re.test(str);
}

function checkForm() {
    // Find jQuery list of
    // Invalid input element(s) (having class 'invalid')
    let ret = $('input.required').filter(function (index, element) {
        return $('#' + element.id).hasClass('invalid');
    });
    return ret;
}

function sendMail(form) {
    // Form fields have been validated.
    // Gather data and send email
    // TBD
    alert("mail sent");
    clearForm();
}

function clearForm() {
    $('form input.required').addClass('invalid'); // reset invalid
    $('form textarea').each(function () {
        $(this).val(''); // textarea set to empty
    });
    $('form input[type="text"]').each(function () {
        $(this).val(''); // text fields set to empty
    });
    $("form input[type='checkbox']").each(function () {
        if ($(this).prop('checked')) {
            // each checked checkbox set to unchecked
            $(this).prop('checked', false);
        }
    });
}

function toInvalid(item) {
    // set class to invalid for a single field.
    // also remove valid class
    $(item).addClass('invalid');
    $(item).removeClass('valid');
}