export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">

      {/* HERO SECTION */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Transform Your Body
        </h1>

        <p className="text-lg text-gray-400 mb-6">
          Train Hard. Stay Fit. Be Strong 💪
        </p>

        <button className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700 transition">
          Join Now
        </button>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">Personal Training</h3>
            <p className="text-gray-400">One-on-one coaching</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">Yoga</h3>
            <p className="text-gray-400">Flexibility & balance</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">Strength Training</h3>
            <p className="text-gray-400">Build muscle power</p>
          </div>
        </div>
      </section>

    </div>
  );
}
