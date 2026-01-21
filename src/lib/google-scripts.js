// add this to google scripts to send emails

function doPost(e) {
  // Extract form data from the POST request
  var name = e.parameter.name;
  var email = e.parameter.email;
  var message = e.parameter.message;

  // Set the recipient email address
  var recipient = "info@pacser.org";

  // Set the email subject
  var subject = "New Contact Form Submission";

  // Construct the email body
  var body = "You have a new contact form submission:\n\n";
  body += "Name: " + name + "\n";
  body += "Email: " + email + "\n";
  body += "Message: " + message + "\n";

  // Send the email
  MailApp.sendEmail(recipient, subject, body);

  // Return a success response
  return ContentService.createTextOutput("Success");
}