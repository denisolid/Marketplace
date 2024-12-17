import { RefreshCw, Shield, HelpCircle } from "lucide-react";

export function ReturnsPage() {
  return (
    <div className="container py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Returns & Exchanges</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <RefreshCw className="h-5 w-5 mr-2" />
              Return Policy
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 mb-4">
                We want you to be completely satisfied with your purchase. If
                you're not happy with your order, you can return it within 30
                days of delivery for a full refund or exchange.
              </p>
              <h3 className="font-medium mb-2">Return Requirements:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Items must be unworn and in original condition</li>
                <li>Original tags must be attached</li>
                <li>Items must be in original packaging</li>
                <li>Include the original receipt or order confirmation</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Exchange Process
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 mb-4">
                To exchange an item for a different size or color:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Start a return request through your account</li>
                <li>Select "Exchange" as your return reason</li>
                <li>Choose the new size or color you want</li>
                <li>Print the return label and ship the original item back</li>
                <li>
                  Your exchange will be processed once we receive the return
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <HelpCircle className="h-5 w-5 mr-2" />
              FAQ
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <div>
                <h3 className="font-medium mb-2">How long do refunds take?</h3>
                <p className="text-gray-600">
                  Refunds are processed within 5-7 business days after we
                  receive your return. The time it takes for the refund to
                  appear in your account depends on your payment method and
                  bank.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">
                  Do I have to pay for return shipping?
                </h3>
                <p className="text-gray-600">
                  Returns due to sizing issues or preference are at the
                  customer's expense. Returns for defective or incorrect items
                  are free - we'll provide a prepaid return label.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">
                  What items cannot be returned?
                </h3>
                <p className="text-gray-600">
                  For hygiene reasons, we cannot accept returns on:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  <li>Swimwear with removed hygiene stickers</li>
                  <li>Underwear and intimates</li>
                  <li>Face masks</li>
                  <li>Earrings</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
