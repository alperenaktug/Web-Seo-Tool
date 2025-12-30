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
      alert("Mesajınız başarıyla gönderildi!");
      event.target.reset();
    }
  };

  return (
    <div id="contact" className="max-w-7xl mx-auto px-6 py-12 md:py-24">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 justify-center items-start">
        {/* Sol Taraf: İletişim Bilgileri */}
        <div className="w-full lg:w-1/2 space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-800">
            Let's talk
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
            Uygulamamızı daha iyi hale getirmek için öneri ve isteklerinizi bize
            gönderebilirsiniz. Sizinle iletişimde kalarak daha iyi bir hizmet
            sunabiliriz!
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-5 group">
              <div className="p-3 bg-slate-100 rounded-full group-hover:bg-slate-200 transition-colors">
                <img src={mail_icon} alt="Email" className="w-6 h-6" />
              </div>
              <p className="text-gray-700 font-medium">
                webtool.2009@gmail.com
              </p>
            </div>

            <div className="flex items-center gap-5 group">
              <div className="p-3 bg-slate-100 rounded-full group-hover:bg-slate-200 transition-colors">
                <img src={call_icon} alt="Phone" className="w-6 h-6" />
              </div>
              <p className="text-gray-700 font-medium">0507-865-6213</p>
            </div>

            <div className="flex items-center gap-5 group">
              <div className="p-3 bg-slate-100 rounded-full group-hover:bg-slate-200 transition-colors">
                <img src={location_icon} alt="Location" className="w-6 h-6" />
              </div>
              <p className="text-gray-700 font-medium">Denizli, Türkiye</p>
            </div>
          </div>
        </div>

        {/* Sağ Taraf: Form */}
        <form
          onSubmit={onSubmit}
          className="w-full lg:w-1/2 flex flex-col gap-6 bg-white p-2 md:p-0"
        >
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-semibold">Your Name</label>
            <input
              className="w-full p-4 rounded-lg bg-slate-100 border border-transparent focus:border-slate-400 focus:bg-white outline-none transition-all"
              type="text"
              placeholder="Enter your name"
              name="name"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-semibold">Your Email</label>
            <input
              className="w-full p-4 rounded-lg bg-slate-100 border border-transparent focus:border-slate-400 focus:bg-white outline-none transition-all"
              type="email"
              placeholder="Enter your email"
              name="email"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-semibold">
              Write your message here
            </label>
            <textarea
              className="w-full p-4 rounded-lg bg-slate-100 border border-transparent focus:border-slate-400 focus:bg-white outline-none transition-all min-h-[150px]"
              name="message"
              rows="5"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>

          <button
            className="w-full md:w-max px-10 py-4 bg-slate-700 text-white font-bold rounded-full hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
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
