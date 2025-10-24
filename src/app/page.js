"use client";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 shadow-sm dark:shadow-gray-800">
        <h1 className="text-2xl font-bold">My Portfolio</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4">
          Hi, I’m <span className="text-blue-600 dark:text-blue-400">Daksha acedemy </span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
          A passionate Web Developer crafting beautiful and efficient web experiences.
        </p>
        <a
          href="#contact"
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-500 transition"
        >
          Get in Touch
        </a>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-8 bg-gray-100 dark:bg-gray-800">
        <h3 className="text-3xl font-bold text-center mb-10">Projects</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {["TrueSync", "APIJET", "Portfolio Site"].map((project) => (
            <div
              key={project}
              className="p-6 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-700 rounded-2xl hover:scale-105 transition-transform"
            >
              <h4 className="text-xl font-semibold mb-2">{project}</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                A detailed description of the {project} project highlighting its features and
                technologies used.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-8 text-center">
        <h3 className="text-3xl font-bold mb-10">Skills</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS", "Docker"].map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-8 bg-gray-100 dark:bg-gray-800 text-center">
        <h3 className="text-3xl font-bold mb-6">Contact Me</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Have a project or idea? Let’s connect!
        </p>
        <a
          href="mailto:youremail@example.com"
          className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-500 transition"
        >
          Send Email
        </a>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-gray-300 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Prakash R — All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
