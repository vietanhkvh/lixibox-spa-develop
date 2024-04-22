const renderDesktop = ({ phone = '' }) => {
  return (
    <div className={'<info-detail-container'}>
      <div className={'info-content'}>
        <h3>Information Collection and Use:</h3>
        <p>
          When you use Lixibox's e-commerce website, we may collect personal information such as your name, email
          address, and shipping address. This information is collected for several purposes, including to process your
          orders, communicate with you about your orders, and provide customer service. We may also use your personal
          information to send you promotional emails about new products and special offers. You may opt-out of receiving
          promotional emails at any time by clicking the unsubscribe link at the bottom of our emails.
        </p>

        <h3>Information Sharing:</h3>
        <p>
          We do not sell, trade, or rent your personal information to third parties. However, we may share your personal
          information with our trusted partners who help us operate our website and provide services to you, such as
          shipping and payment processing. We require our partners to comply with our privacy policy and maintain the
          confidentiality of your personal information.
        </p>

        <h3>Information Security:</h3>
        <p>
          We take reasonable steps to protect your personal information from unauthorized access, use, or disclosure. We
          use industry-standard encryption to protect your sensitive information, such as your credit card number,
          during transmission. We also limit access to your personal information to employees who need it to perform
          their job duties. Despite our best efforts, however, no security measures are perfect or impenetrable, and we
          cannot guarantee the security of your personal information.
        </p>

        <h3>Your Rights:</h3>
        <p>
          You have the right to access, update, or delete your personal information at any time. You can do so by
          contacting us through {phone ? ` our hotline at ${phone} or ` : ''} by sending an email to info@lixibox.com.
          We will promptly respond to your request and take appropriate actions to update or delete your personal
          information.
        </p>

        <h3>Cookies and Other Tracking Technologies:</h3>
        <p>
          We use cookies and other tracking technologies to enhance your user experience and to collect information
          about how our website is used. Cookies are small files that are stored on your computer or mobile device when
          you visit our website. They enable us to remember your preferences and to personalize your experience. You may
          disable cookies in your browser settings, but this may affect your ability to use some features of our
          website.
        </p>

        <h3>Information Retention:</h3>
        <p>
          We retain your personal information for as long as necessary to fulfill the purposes for which it was
          collected, unless a longer retention period is required or permitted by law. When we no longer need your
          personal information, we will securely dispose of it or anonymize it.
        </p>

        <h3>Children's Privacy:</h3>
        <p>
          Our website is not intended for use by children under the age of 16. We do not knowingly collect personal
          information from children under 16. If you are a parent or guardian and believe that your child has provided
          us with personal information, please contact us immediately so that we can delete the information.
        </p>

        <h3>Third-Party Links:</h3>
        <p>
          Our website may contain links to third-party websites or services. We are not responsible for the privacy
          practices or content of those websites or services. We encourage you to review the privacy policies of those
          websites and services before providing them with any personal information.
        </p>

        <h3>Contact Us:</h3>
        <p>
          If you have any questions or concerns about our privacy policy or our use of your personal information, please
          contact us at info@lixibox.com {phone ? ` or by calling our hotline at ${phone} ` : ''}. We will respond to
          your inquiry as soon as possible.
        </p>

        <p>
          We hope this information is helpful, and we encourage you to review our privacy policy periodically to stay
          informed about how we are protecting
        </p>
      </div>
    </div>
  );
};

export default renderDesktop;
