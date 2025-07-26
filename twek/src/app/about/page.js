export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          About Us
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Welcome to our brand dashboard. We&apos;re passionate about creating amazing digital experiences.
        </p>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            To deliver innovative solutions that help businesses grow and succeed in the digital world.
          </p>
        </div>
      </div>
    </div>
  );
}
