const TermsOfService = () => {
    return (
      <div className="min-h-screen bg-purple-bg py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-dark-purple mb-8 uppercase">
            Terms of Service
          </h1>
          
          <div className="space-y-6 text-dark-purple font-paragraph">
            <p className="text-lg opacity-90">Last updated: {new Date().toLocaleDateString()}</p>
  
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-dark-purple mt-8 mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-dark-purple mt-8 mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on our website for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on our website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-dark-purple mt-8 mb-4">3. User Accounts</h2>
              <p>
                When you create an account with us, you must provide accurate, complete, and current information. 
                You are responsible for safeguarding the password and for all activities that occur under your account.
              </p>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-dark-purple mt-8 mb-4">4. Prohibited Uses</h2>
              <p>You may not use our website:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>In any way that violates any applicable law or regulation</li>
                <li>To transmit any malicious code or harmful content</li>
                <li>To impersonate or attempt to impersonate the company or its employees</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use of the website</li>
              </ul>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-dark-purple mt-8 mb-4">5. Intellectual Property</h2>
              <p>
                The website and its original content, features, and functionality are owned by us and are protected 
                by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-dark-purple mt-8 mb-4">6. Termination</h2>
              <p>
                We may terminate or suspend your account and bar access to the website immediately, without prior notice or liability, 
                for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-dark-purple mt-8 mb-4">7. Limitation of Liability</h2>
              <p>
                In no event shall we, nor our directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                or other intangible losses, resulting from your use of the website.
              </p>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-dark-purple mt-8 mb-4">8. Governing Law</h2>
              <p>
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which our company operates, 
                without regard to its conflict of law provisions.
              </p>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-dark-purple mt-8 mb-4">9. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-dark-purple mt-8 mb-4">10. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="font-semibold">Email: legal@example.com</p>
            </section>
          </div>
        </div>
      </div>
    );
  };
  
  export default TermsOfService;