const PrivacyPolicy = () => {
    return (
      <div className="min-h-screen bg-purple-bg py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-dark-purple mb-8 uppercase">
            Privacy Policy
          </h1>
          
          <div className="space-y-6 text-dark-purple font-paragraph">
            <p className="text-lg opacity-90">Last updated: {new Date().toLocaleDateString()}</p>
  
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-dark-purple mt-8 mb-4">1. Introduction</h2>
              <p>
                Welcome to our website. We are committed to protecting your personal information and your right to privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-dark-purple mt-8 mb-4">2. Information We Collect</h2>
              <p>
                We may collect information about you in a variety of ways. The information we may collect on the site includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Personal Data: Name, email address, phone number, and other contact information</li>
                <li>Derivative Data: Information our servers automatically collect when you access the site</li>
                <li>Financial Data: Payment information necessary to process your transactions</li>
                <li>Mobile Device Data: Device information when you access our site via mobile</li>
              </ul>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-dark-purple mt-8 mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Process your transactions and manage your orders</li>
                <li>Send you marketing and promotional communications</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Improve our website and user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-dark-purple mt-8 mb-4">4. Disclosure of Your Information</h2>
              <p>
                We may share your information with third parties in certain situations, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Service providers who perform services for us</li>
                <li>Business partners for marketing purposes</li>
                <li>Legal compliance when required by law</li>
                <li>Business transfers in case of merger or acquisition</li>
              </ul>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-dark-purple mt-8 mb-4">5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate or incomplete data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
              </ul>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-dark-purple mt-8 mb-4">6. Data Security</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. 
                While we have taken reasonable steps to secure the personal information you provide to us, please be aware 
                that despite our efforts, no security measures are perfect or impenetrable.
              </p>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-dark-purple mt-8 mb-4">7. Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <p className="font-semibold">Email: privacy@example.com</p>
            </section>
          </div>
        </div>
      </div>
    );
  };
  
  export default PrivacyPolicy;