export default function WhatWeOffer() {
  const offerings = [
    {
      title: "Extensive Question Bank",
      description:
        "Access hundreds of questions across Math, Physics, Chemistry, and Biology.",
      icon: "📚",
    },
    {
      title: "Custom Exam Generator",
      description:
        "Filter by subject, difficulty, and type to create your personalized exams.",
      icon: "🎯",
    },
    {
      title: "Official-style Pagination",
      description:
        "Navigate large sets of questions easily with clean, user-friendly pagination.",
      icon: "📝",
    },
    {
      title: "Instant Answer View",
      description:
        "Check answers instantly with toggleable answer sections for each question.",
      icon: "✅",
    },
    {
      title: "Budget Tracker",
      description:
        "Manage your daily income and expenses efficiently and keep track of your savings.",
      icon: "💰",
    },
    {
      title: "Study Planner",
      description:
        "Break down big study goals into smaller, manageable tasks to stay organized.",
      icon: "🗓️",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">What We Offer</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map((offer, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
            >
              <div className="text-5xl mb-4">{offer.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{offer.title}</h3>
              <p className="text-gray-600">{offer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
