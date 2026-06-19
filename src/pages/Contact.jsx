import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/style.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    details: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.details.trim()
    ) {
      setError(true);
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
    setError(false);

    setFormData({
      name: "",
      email: "",
      subject: "",
      details: ""
    });

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <Layout>
      <div className="content page_contact">
        <div className="full_width">
          <section>
            <h1 className="page-title">Contact us</h1>

            <span className="text">
              <span className="flex_line">
                <span className="int">
                  We'd love to hear from you. Drop us a line and we'll contact you shortly.
                </span>

                <span className="details">
                  <span className="line">
                    <label>Email:</label> support@pikoya.com
                  </span>
                  <span className="line">
                    <label>Company Name:</label> Pikoya Ltd
                  </span>
                  <span className="line">
                    <label>Address:</label> Derekh Yafo 30, Haifa, Israel
                  </span>
                </span>
              </span>

              <span className="cnt_form">
                <span className="contact_form">
                  {submitted && (
                    <span className="line">
                      <span className="alert_green">
                        Thank You for Contacting Us
                      </span>
                    </span>
                  )}

                  {error && (
                    <span className="line">
                      <span className="alert_red">
                        Please fill all the fields
                      </span>
                    </span>
                  )}

                  <form id="input_form" onSubmit={handleSubmit}>
                    <span className="line">
                      <label htmlFor="name_input">Name:</label>
                      <input
                        type="text"
                        id="name_input"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </span>

                    <span className="line">
                      <label htmlFor="email_input">Email:</label>
                      <input
                        type="text"
                        id="email_input"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </span>

                    <span className="line">
                      <label htmlFor="subject_input">Subject:</label>
                      <select
                        id="subject_input"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a topic</option>
                        <option value="I want to advertise on your website">
                          I want to advertise on your website
                        </option>
                        <option value="I want to publish my game">
                          I want to publish my game
                        </option>
                        <option value="I want to publish a guest post">
                          I want to publish a guest post
                        </option>
                        <option value="I have a question...">
                          I have a question...
                        </option>
                      </select>
                    </span>

                    <span className="line">
                      <label htmlFor="details_input">Details:</label>
                      <textarea
                        id="details_input"
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        required
                      />
                    </span>

                    <span className="line align_right">
                      <button type="submit" className="submit pointer">
                        Submit
                      </button>
                    </span>
                  </form>

                  <span className="line text">
                    <h2>Write for Us</h2>
                    <span>
                      <p>We are always on the lookout for the next great game review writer.</p>
                      <p>
                        If you think you have what it takes to write for us and that you like
                        the idea of being able to play games, write about it and earn some cash,
                        then please use the contact form above and reach out to us!
                      </p>
                      <p>
                        Note: Please put "Game Review Writer Job Application" in the Subject
                        line and we'll get back to you!
                      </p>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </section>
        </div>
      </div>
    </Layout>
  );
}