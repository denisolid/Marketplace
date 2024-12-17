import { Truck, Clock, Globe } from "lucide-react";

export function ShippingPage() {
  return (
    <div className="container py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shipping Information</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Truck className="h-5 w-5 mr-2" />
              Delivery Options
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <div>
                <h3 className="font-medium mb-2">Standard Delivery</h3>
                <p className="text-gray-600">
                  3-5 business days
                  <br />
                  Free for orders over $100
                  <br />
                  $10 for orders under $100
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Express Delivery</h3>
                <p className="text-gray-600">
                  1-2 business days
                  <br />
                  $20 flat rate
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              International Shipping
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 mb-4">
                We ship to most countries worldwide. International shipping
                rates are calculated based on:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Destination country</li>
                <li>Package weight and dimensions</li>
                <li>Shipping method selected</li>
                <li>Order value</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Processing Time
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 mb-4">
                Orders are typically processed within 1-2 business days. During
                peak seasons or sales periods, processing time may be extended
                by an additional 1-2 business days.
              </p>
              <p className="text-gray-600">
                You will receive a shipping confirmation email with tracking
                information once your order has been shipped.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
