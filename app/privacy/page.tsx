'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="border-b bg-muted/30 py-8">
          <div className="mx-auto max-w-7xl px-4">
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-8">
          <Card className="p-8">
            <div className="prose prose-sm max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-bold">1. Introduction</h2>
                <p className="text-muted-foreground">
                  We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold">2. Information We Collect</h2>
                <p className="text-muted-foreground">
                  We may collect information about you in a variety of ways. The information we may collect on the site includes:
                </p>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li><strong>Personal Data:</strong> Name, email address, phone number, shipping address, billing address, and payment information</li>
                  <li><strong>Browsing Data:</strong> Information about how you interact with our website, including pages visited, time spent, and links clicked</li>
                  <li><strong>Device Data:</strong> IP address, browser type, operating system, and device identifiers</li>
                  <li><strong>Cookies:</strong> We use cookies to enhance your experience and remember your preferences</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold">3. Use of Your Information</h2>
                <p className="text-muted-foreground">
                  Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:
                </p>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>Process your transactions and send related information</li>
                  <li>Email you regarding an order or account</li>
                  <li>Fulfill and manage purchases, orders, payments, and other transactions</li>
                  <li>Generate a personal profile about you</li>
                  <li>Increase the efficiency and operation of the site</li>
                  <li>Monitor and analyze usage and trends to improve your experience</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold">4. Disclosure of Your Information</h2>
                <p className="text-muted-foreground">
                  We may share information we have collected about you in certain situations:
                </p>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li><strong>By Law or to Protect Rights:</strong> If required by law or if we believe disclosure is necessary to protect our rights</li>
                  <li><strong>Third-Party Service Providers:</strong> We may share your information with vendors and contractors to perform services on our behalf</li>
                  <li><strong>Business Transfer:</strong> Your information may be disclosed and otherwise transferred in connection with a merger or sale of assets</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold">5. Security of Your Information</h2>
                <p className="text-muted-foreground">
                  We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold">6. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions or comments about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 space-y-2 text-muted-foreground">
                  <p>Email: privacy@example.com</p>
                  <p>Phone: +1 (555) 000-0000</p>
                  <p>Address: 123 Fashion Street, New York, NY 10001</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold">7. Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify this privacy policy at any time. Changes and clarifications will take effect immediately upon posting to the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances we may disclose it.
                </p>
              </section>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
