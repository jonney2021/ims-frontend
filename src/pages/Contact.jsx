import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { API_BASE_URL } from "../services/authService";

const Contact = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please log in to send a message");
      return;
    }
    if (!subject || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/contact`,
        { subject, message },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg overflow-hidden shadow-md mb-8">
          <div className="md:flex">
            <div className="w-full px-6 py-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="subject"
                  >
                    Subject
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="subject"
                    type="text"
                    placeholder="Enter subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="message"
                    placeholder="Enter your message"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaPhone className="text-blue-500 mr-4 text-xl" />
                <span>+1 (438) 456-7890</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-blue-500 mr-4 text-xl" />
                <span>contact@gmail.com</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-blue-500 mr-4 text-xl" />
                <span>123 Main St, Montreal, QC H2Q 2J8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
