import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id || name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("Thank you for reaching out.\n Your message has been received. \n I’ll be in touch soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (status) {
    return (
      <div className="contact-page-container flex justify-center items-center min-h-screen">
        <section className="m-6 w-full max-w-[1200px]">
          <div className="flex flex-col justify-center items-start uppercase text-3xl w-full gap-24">
            <h1 className="text-3xl">Contact Us</h1>
            <div className="w-full p-8 bg-green-100 border border-green-400 text-green-800 rounded-md text-lg text-center whitespace-pre-line">
              {status}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="contact-page-container flex justify-center items-center min-h-screen">
      <section className="m-6 w-full max-w-[1200px]">
        <div className="flex flex-col justify-center items-start uppercase text-3xl w-full gap-24">
          <h1 className="text-3xl">Contact Us</h1>
          
          {error && (
            <div className="w-full p-4 bg-red-100 border border-red-400 text-red-800 rounded-md">
              {error}
            </div>
          )}

          <form id="contactForm" className="w-full" onSubmit={handleSubmit}>
            <div className="name-email-container flex flex-col md:flex-row justify-between gap-6 mb-6">
              <div className="contact-name-container w-full">
                <label htmlFor="name" className="mb-3 block text-base font-medium text-black w-auto">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-blue-500 focus:shadow-md disabled:opacity-50"
                  disabled={loading}
                />
              </div>
              <div className="contact-email-container w-full">
                <label htmlFor="email" className="mb-3 block text-base font-medium text-black">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@domain.com"
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-blue-500 focus:shadow-md disabled:opacity-50"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="message" className="mb-3 block text-base font-medium text-black">
                Message
              </label>
              <textarea
                required
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Type your message"
                className="w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-blue-500 focus:shadow-md disabled:opacity-50"
                disabled={loading}
              ></textarea>
            </div>
            <div>
              <button
                id="submitButton"
                disabled={loading}
                type="submit"
                className="hover:shadow-form rounded-md bg-blue-500 py-3 px-8 text-base font-semibold text-white outline-none disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
