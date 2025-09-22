'use client';

import PageHeader from "@/components/PageHeader.jsx";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "" });
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setStatus({ type: "success", message: "Message sent successfully." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <>
      <PageHeader>Contact</PageHeader>
      <section id="contact" className="section">
        <div className="contact-form">
          <div className="container">
            <div className="row contact-form-area">
              <div className="col-md-12 col-lg-6 col-sm-12">
                <div className="contact-block">
                  <h2>Contact Form</h2>
                  <form id="contactForm" onSubmit={onSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            placeholder="Name"
                            required
                            data-error="Please enter your name"
                          />
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="email"
                            placeholder="Email"
                            id="email"
                            className="form-control"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            required
                            data-error="Please enter your email"
                          />
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Subject"
                            id="msg_subject"
                            className="form-control"
                            name="subject"
                            value={form.subject}
                            onChange={onChange}
                            required
                            data-error="Please enter your subject"
                          />
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            id="message"
                            placeholder="Your Message"
                            rows="5"
                            name="message"
                            value={form.message}
                            onChange={onChange}
                            data-error="Write your message"
                            required
                          ></textarea>
                          <div className="help-block with-errors"></div>
                        </div>
                        <div className="submit-button">
                          <button
                            className="btn btn-common"
                            id="submit"
                            type="submit"
                            disabled={status.type === "loading"}
                          >
                            {status.type === "loading"
                              ? "Sending..."
                              : "Send Message"}
                          </button>
                          {status.message && (
                            <div
                              id="msgSubmit"
                              className="h3 text-center"
                              style={{ marginTop: "10px" }}
                            >
                              {status.message}
                            </div>
                          )}
                          <div className="clearfix"></div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 col-sm-12">
                <div className="contact-right-area wow fadeIn">
                  <h2>Contact Address</h2>
                  <div className="contact-info">
                    <div className="single-contact">
                      <div className="contact-icon">
                        <i className="lni-map-marker"></i>
                      </div>
                      <p>
                        Main Office: NO.22-23 Street Name- City,Country Customer
                        Center: NO.130-45 Streen Name- City, Country
                      </p>
                    </div>
                    <div className="single-contact">
                      <div className="contact-icon">
                        <i className="lni-envelope"></i>
                      </div>
                      <p>
                        <a href="mailto:hello@tom.com">
                          Customer Support: info@mail.com Technical Support:{" "}
                        </a>
                      </p>
                      <p>
                        <a href="mailto:tomsaulnier@gmail.com">
                          support@mail.com
                        </a>
                      </p>
                    </div>
                    <div className="single-contact">
                      <div className="contact-icon">
                        <i className="lni-phone-handset"></i>
                      </div>
                      <p>
                        <a href="#">Main Office: +880 123 456 789</a>
                      </p>
                      <p>
                        <a href="#">Customer Supprort: +880 123 456 789</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
