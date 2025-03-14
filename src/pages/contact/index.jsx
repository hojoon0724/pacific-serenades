import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("submitButton").disabled = true;
    document.getElementById("submitButton").classList.add("cursor-not-allowed", "opacity-50");

    // The URL of your Google Apps Script Web App
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbw5o-nLD2lWtJ_i4TWHN_-VV1EUaT6c_wR0EhC_JmdAm2W49_uNvT7uSDudo5nqInNe/exec";

    // Prepare form data
    const formBody = new URLSearchParams();
    formBody.append("name", formData.name);
    formBody.append("email", formData.email);
    formBody.append("message", formData.message);

    console.log("Form data:", formBody);

    // try {
    //   const response = await fetch(scriptUrl, {
    //     method: "POST",
    //     body: formBody,
    //   });

    //   if (response.ok) {
    //     // console.log("Form submitted successfully");
    //     document.getElementById("contactForm").style.display = "none";
    //     document.getElementById("success").style.display = "flex";
    //   } else {
    //     console.log("Error submitting form");
    //     alert("There was an error. Please try again.");
    //   }
    // } catch (error) {
    //   console.log("Error:", error);
    //   alert("An error occurred. Please try again later.");
    // }
  };

  return (
    <div className="contact-page-container mx-6">
      <section>
        <div className="flex justify-center items-center uppercase text-3xl w-full">
          <form id="contactForm" className="w-full" onSubmit={handleSubmit}>
            <div className="name-email-container flex flex-col md:flex-row justify-between gap-6 mb-6">
              <div className="contact-name-container w-full">
                <label htmlFor="name" className="mb-3 block text-base font-medium text-black w-auto">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-blue-500 focus:shadow-md"
                />
              </div>
              <div className="contact-email-container w-full">
                <label htmlFor="email" className="mb-3 block text-base font-medium text-black">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@domain.com"
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-blue-500 focus:shadow-md"
                />
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="message" className="mb-3 block text-base font-medium text-black">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Type your message"
                className="w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-blue-500 focus:shadow-md"
              ></textarea>
            </div>
            <div>
              <button
                id="submitButton"
                disabled={false}
                type="submit"
                className="hover:shadow-form rounded-md bg-blue-500 py-3 px-8 text-base font-semibold text-white outline-none "
              >
                Submit
              </button>
            </div>
          </form>
          {/* <button className="py-3 px-8 bg-blue-500 text-white rounded-md" onClick={handleSubmit}>
            toggle
          </button> */}
          <div
            id="success"
            className="form-success-message-container flex flex-col items-center justify-center"
            style={{ display: "none" }}
          >
            <h3>Thank you for your submission</h3>
            <h3>We will get back to you soon</h3>
          </div>
        </div>
      </section>
    </div>
  );
}
