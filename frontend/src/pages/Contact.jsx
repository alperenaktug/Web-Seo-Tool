import mail_icon from "../assets/mail_icon.svg";
import location_icon from "../assets/location_icon.svg";
import call_icon from "../assets/call_icon.svg";

const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    formData.append("access_key", "6aa29518-c008-4ce4-9647-905d07ae4af5");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      alert(res.message);
    }
  };
  return (
    <div
      id="contact"
      className="flex flex-col items-center justify-center gap-80px m-80px m-170px"
    >
      <div className="flex gap-150px ">
        <div className="flex flex-col gap-30 font-700 ">
          <h1 className=" font-600 text-4xl font-serif mt-6">Let{"'"}s talk</h1>
          <p className="mt-16 mb-16 max-w-550px text-gray-600 text-xxl leading-35px">
            You can send us your suggestions and wishes to make our application
            better Remember that we can provide a better service by contacting
            us!!
          </p>
          <div className="flex flex-col gap-30px text-gray-400 text-22px">
            <div className="flex items-center gap-20px">
              <img className="text-" src={mail_icon} alt="" />{" "}
              <p className="text-gray-600 text-lg">webtool.2009@gmail.com</p>
            </div>
            <div className="flex items-center gap-20px">
              <img src={call_icon} alt="" />{" "}
              <p className="text-gray-600 text-lg">0507-865-6213</p>
            </div>
            <div className="flex items-center gap-20px">
              <img src={location_icon} alt="" />{" "}
              <p className="text-gray-600 text-lg">Denizli , Türkiye</p>
            </div>
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-start gap-30px "
        >
          <label className="text-gray-600 text-xl font-medium">Your Name</label>
          <input
            className="border-none w-8/12  h-16 pl-20px rounded-md bg-slate-300 text-gray-600 text-20px"
            type="text"
            placeholder="Enter your name"
            name="name"
          />
          <label className="text-gray-600 text-xl  font-medium">
            Your Email
          </label>
          <input
            className="border-none w-8/12  h-16 pl-20px rounded-md bg-slate-300 text-gray-600 text-20px"
            type="email"
            placeholder="Enter your email"
            name="email"
          />
          <label className="text-gray-600 font-medium text-xl ">
            Write your message here
          </label>
          <textarea
            className="w-650px border-none p-25px rounded-md bg-slate-300 text-gray-600 text-20px"
            name="message"
            rows="3"
            placeholder="Enter your message"
          ></textarea>

          <button
            className="border-none bg-slate-500   text-white rounded-full bg- text-22px p-5 px-15 mb-12 cursor-pointer transition-all duration-300 hover:scale-110 transition-all duration-300"
            type="submit"
          >
            Submit now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
