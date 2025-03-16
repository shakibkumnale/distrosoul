// src/app/terms/page.jsx
import React from 'react';

export const metadata = {
  title: 'Terms & Conditions | SoulDistribution',
  description: 'Terms and conditions for SoulDistribution music distribution services.',
};

const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
        <p className="text-gray-600 mb-8">Last updated: March 2025</p>

        <div className="prose max-w-none">
          <h2>1. Services & Pricing</h2>
          <p>
            SoulDistribution (hereinafter "the Agency") provides the following services:
          </p>
          <h3>Premium Plan – ₹1199/Year</h3>
          <ul>
            <li>Unlimited releases for one year</li>
            <li>100% royalties</li>
            <li>Distribution to 150+ Indian and International stores</li>
            <li>Spotify verification and custom release date</li>
            <li>Content ID and playlist pitching</li>
            <li>Instagram audio page linking</li>
            <li>24/7 support (approval in 24 hours, live in 2 days)</li>
            <li>Lifetime availability: Music remains on platforms indefinitely, provided the Artist complies with the terms.</li>
          </ul>

          <h3>YouTube OAC (Official Artist Channel) – ₹499</h3>
          <ul>
            <li>Verified badge on YouTube</li>
            <li>Merging of all music content (albums, singles, music videos)</li>
            <li>Access to YouTube analytics and fan insights</li>
            <li>"Music" tag on videos</li>
            <li>Custom artist profile and banner</li>
            <li>Higher search ranking and better visibility</li>
          </ul>

          <h2>2. Distribution Terms</h2>
          <h3>Original Content Requirement</h3>
          <p>
            The Artist confirms that all submitted content is 100% original and does not infringe on any copyright or third-party rights.
          </p>

          <h3>Copyright Responsibility</h3>
          <p>
            The Agency is not responsible for any copyright claims, strikes, or legal actions that may arise.
          </p>

          <h3>U.S. Tax Deduction</h3>
          <p>
            The Artist acknowledges that U.S. tax deductions will apply under the India-U.S. tax treaty (W8-BEN).
          </p>

          <h3>Exclusivity Clause</h3>
          <p>
            The Artist cannot distribute the same track through multiple distributors simultaneously. However, the Artist may distribute different songs through other distributors, provided those songs are not distributed by the Agency.
          </p>

          <h3>Renewal & Music Availability Clause</h3>
          <p>
            If the Artist does not renew the Premium Plan, their music will remain live on all platforms, but earnings will not be paid during the unpaid period. The Artist retains access to their account and dashboard. If renewal is delayed beyond 7 days, earnings for that period cannot be recovered.
          </p>

          <h2>3. Payouts & Withdrawal Policy</h2>
          <p>
            Withdrawals are managed through the Distribution Dashboard under Earnings  Withdrawals. Artists must complete an electronic tax form (powered by Tipalti) before withdrawing funds. Processing time: 1-7 business days.
          </p>

          <p>Payout fees apply as follows (fees will be converted to INR at the current exchange rate):</p>
          <table className="min-w-full border border-gray-200 my-4">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2 text-left">Payout Method</th>
                <th className="border p-2 text-left">Fee (USD)</th>
                <th className="border p-2 text-left">Minimum Payout Amount (USD)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">ACH (US)</td>
                <td className="border p-2">$1.00</td>
                <td className="border p-2">$5.00</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2">Local Bank Transfer (International ACH/eCheck)</td>
                <td className="border p-2">$5.00</td>
                <td className="border p-2">$5.00</td>
              </tr>
              <tr>
                <td className="border p-2">Wire Transfer (US)</td>
                <td className="border p-2">$15.00</td>
                <td className="border p-2">$15.00</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2">International Wire Transfer (Local Currency)</td>
                <td className="border p-2">$20.00</td>
                <td className="border p-2">$15.00</td>
              </tr>
              <tr>
                <td className="border p-2">International Wire Transfer (USD)</td>
                <td className="border p-2">$26.00</td>
                <td className="border p-2">$15.00</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2">PayPal (US Residents)</td>
                <td className="border p-2">2% (Max $1.00)</td>
                <td className="border p-2">$1.00</td>
              </tr>
              <tr>
                <td className="border p-2">PayPal (Non-US Residents)</td>
                <td className="border p-2">2% (Max $21.00)</td>
                <td className="border p-2">$1.00</td>
              </tr>
            </tbody>
          </table>
          <p>Additional fees may apply for failed or rejected transactions.</p>

          <h2>4. Refund Policy</h2>
          <p>A 100% refund is available if:</p>
          <ul>
            <li>The Artist's music has not been distributed to any music store.</li>
            <li>The YouTube OAC request is rejected by YouTube.</li>
          </ul>
          <p>No refund is available if the distribution process has been initiated or if the YouTube OAC request is under review.</p>

          <h2>5. Switching Distributors</h2>
          <p>
            If the Artist wishes to migrate to another distributor, the Agency will provide the following within 30 days of the request:
          </p>
          <ul>
            <li>Metadata and assets (audio files, cover art, etc.)</li>
            <li>Revenue charts and streaming reports</li>
            <li>Necessary permissions to facilitate the migration</li>
          </ul>

          <h2>6. Reporting & Transparency</h2>
          <p>
            The Agency will provide monthly reports via email or the Distribution Dashboard, detailing:
          </p>
          <ul>
            <li>Streams</li>
            <li>Revenue performance</li>
            <li>Other relevant analytics</li>
          </ul>

          <h2>7. Termination & Rights</h2>
          <ul>
            <li>The Artist may request termination at any time by providing written notice to the Agency.</li>
            <li>Upon termination, the Artist's content will remain live, but earnings will be paused until any outstanding fees are settled.</li>
            <li>If the Premium Plan expires without renewal, the content remains live, but earnings are paused as per Section 2.</li>
          </ul>

          <h2>8. Governing Law & Dispute Resolution</h2>
          <p>
            This Agreement is governed by Indian law. Any disputes will be resolved through mutual discussion. If unresolved, disputes will be handled under Indian legal jurisdiction.
          </p>

          <h2>9. Agreement Acceptance</h2>
          <p>
            By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;