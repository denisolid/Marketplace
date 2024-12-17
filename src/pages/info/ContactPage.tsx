import { Mail, Phone, MapPin } from "lucide-react";

export function ContactPage() {
  return (
    <div className="container py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-gray-500" />
                <span>support@ukrainianfashion.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-gray-500" />
                <span>+380 44 123 4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-gray-500" />
                <span>Khreshchatyk Street, Kyiv, Ukraine</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Business Hours</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Customer Support</h2>
          <p className="text-gray-600 mb-4">
            Our customer support team is available during business hours to
            assist you with:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Order inquiries and tracking</li>
            <li>Product information and availability</li>
            <li>Returns and exchanges</li>
            <li>Shipping and delivery questions</li>
            <li>General inquiries about our services</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
