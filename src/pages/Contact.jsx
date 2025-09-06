export default function Contact() {
  return (
    <div className="max-w-xl mx-auto p-6 border rounded shadow-md mt-6 bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Contact Information</h1>

      <div className="space-y-4 text-gray-700">
        <p>
          <span className="font-semibold">Address:</span> 123, 09 Street, Dhaka, Bangladesh
        </p>

        <p>
          <span className="font-semibold">Phone:</span> +880 1820903961
        </p>

        <p>
          <span className="font-semibold">Email:</span>{" "}
          <a href="mailto:info@example.com" className="text-blue-500 hover:underline">
            info@task-tutor.com
          </a>
        </p>

        <div>
          <span className="font-semibold">Follow Us:</span>
          <div className="flex gap-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
              LinkedIn
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
