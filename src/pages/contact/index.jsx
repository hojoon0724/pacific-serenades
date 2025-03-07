export default function Contact({}) {
  // const { register, handleSubmit } = useForm();

  function onSubmit() {
    console.log("submitted");
  }
  return (
    <div className="contact-page-container">
      {/* placehorder */}
      <section>
        <div
          className="contact-form-placeholder flex justify-center items-center uppercase text-3xl"
          style={{ width: "100%", height: "70svh", border: "solid 1px red" }}
        >
          <form onSubmit={onSubmit()}>
            <div className="mb-5">
              <label htmlFor="name" className="mb-3 block text-base font-medium text-black">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-blue-500 focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="mb-3 block text-base font-medium text-black">
                Email Address
              </label>
              <input
                type="email"
                placeholder="example@domain.com"
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-blue-500 focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="message" className="mb-3 block text-base font-medium text-black">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Type your message"
                className="w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-blue-500 focus:shadow-md"
              ></textarea>
            </div>
            <div>
              <button className="hover:shadow-form rounded-md bg-blue-500 py-3 px-8 text-base font-semibold text-white outline-none">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
