import React, { useRef } from 'react';
import Layout from '../components/Layout';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';

export default function ContactScreen() {
  const nameRef = useRef();
  const emailRef = useRef();
  const telephoneRef = useRef();

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm('gmail ', 'template_gk9vjvi', e.target, 'G2lpCxE7Bm_KknnOI')
      .then(
        () => {
          toast.success(
            'We will respond to you via your email as soon as possible.'
          );
          e.target.reset();
        },
        () => {
          toast.error('There was an error in your form');
          e.target.reset();
        }
      );
  }
  return (
    <Layout title="Contact">
      <form className="mx-auto w-5/6" onSubmit={sendEmail}>
        <h1 className="mb-4 text-xl font-bold">Contact Us</h1>
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            ref={nameRef}
            name="name"
            className="w-full mt-4"
            id="name"
            required
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            ref={emailRef}
            name="email"
            className="w-full mt-4"
            id="email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="telphone">Phone Number</label>
          <input
            type="tel"
            name="telephone"
            ref={telephoneRef}
            className="w-full mt-4"
            id="telphone"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message">Message</label>
          <textarea
            className="w-full mt-4"
            name="message"
            id="message"
            required
            rows={10}
          />
        </div>
        <div className="mb-4">
          <button className="primary-button">Submit</button>
        </div>
      </form>
    </Layout>
  );
}
