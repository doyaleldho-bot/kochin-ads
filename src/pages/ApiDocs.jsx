
import React from 'react';
import { Helmet } from 'react-helmet';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import PageTransition from '@/components/PageTransition';

const CodeBlock = ({ code, language = 'bash' }) => {
  const { toast } = useToast();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast({ title: "Copied!", description: "Code snippet copied to clipboard." });
  };

  return (
    <div className="relative group my-4">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button size="sm" variant="secondary" onClick={copyToClipboard} className="h-8 w-8 p-0">
            <Copy size={14} />
        </Button>
      </div>
      <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const ApiDocs = () => {
  return (
    <PageTransition>
      <Helmet><title>API Documentation - Kochin Ads SMM</title></Helmet>
      
      <div className="pt-24 pb-20 min-h-screen bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
              <div className="mb-12">
                  <span className="text-teal-600 font-bold tracking-wider text-sm uppercase">Developer Resources</span>
                  <h1 className="text-4xl font-bold text-slate-900 mt-2 mb-4">SMM API Documentation</h1>
                  <p className="text-xl text-slate-600">
                      Integrate Kochin Ads services directly into your applications.
                  </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-12">
                  
                  {/* Authentication */}
                  <section>
                      <h2 className="text-2xl font-bold text-slate-800 mb-4">Authentication</h2>
                      <p className="text-slate-600 mb-4">
                          All API requests must include your API Key in the query parameters or header. 
                          You can generate your API Key from the Reseller Dashboard.
                      </p>
                      <CodeBlock code={`https://kochinads.com/api/v2?key=YOUR_API_KEY&action=...`} />
                  </section>

                  {/* Add Order */}
                  <section>
                      <h2 className="text-2xl font-bold text-slate-800 mb-4">Add Order</h2>
                      <p className="text-slate-600 mb-4">Create a new SMM order.</p>
                      
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
                          <h4 className="font-bold text-sm mb-2">Parameters</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                              <li><code className="bg-white px-1 rounded border">key</code> - Your API Key</li>
                              <li><code className="bg-white px-1 rounded border">action</code> - add</li>
                              <li><code className="bg-white px-1 rounded border">service</code> - Service ID (see Services List)</li>
                              <li><code className="bg-white px-1 rounded border">link</code> - Link to page/post</li>
                              <li><code className="bg-white px-1 rounded border">quantity</code> - Amount needed</li>
                          </ul>
                      </div>

                      <h4 className="font-bold text-sm">Example Request (Node.js)</h4>
                      <CodeBlock language="javascript" code={`
const axios = require('axios');

const response = await axios.post('https://kochinads.com/api/v2', {
    key: 'YOUR_API_KEY',
    action: 'add',
    service: 1024,
    link: 'https://instagram.com/kochinads',
    quantity: 1000
});

console.log(response.data);
/*
{
    "order": 23501,
    "status": "success"
}
*/
                      `} />
                  </section>

                  {/* Order Status */}
                  <section>
                      <h2 className="text-2xl font-bold text-slate-800 mb-4">Check Order Status</h2>
                      <p className="text-slate-600 mb-4">Retrieve the current status of an order.</p>
                      <CodeBlock code={`
// Request
{
    "key": "YOUR_API_KEY",
    "action": "status",
    "order": 23501
}

// Response
{
    "charge": "0.45",
    "start_count": 1450,
    "status": "processing",
    "remains": 500,
    "currency": "INR"
}
                      `} />
                  </section>
                  
                  {/* Service List */}
                  <section>
                      <h2 className="text-2xl font-bold text-slate-800 mb-4">Services List</h2>
                      <p className="text-slate-600 mb-4">Get current list of all available services.</p>
                      <CodeBlock code={`
// Request
{
    "key": "YOUR_API_KEY",
    "action": "services"
}

// Response
[
    {
        "service": 1,
        "name": "Instagram Followers [Max 50k] [No Refill]",
        "type": "Default",
        "category": "Instagram Followers",
        "rate": "80.00",
        "min": 100,
        "max": 50000
    },
    ...
]
                      `} />
                  </section>

              </div>
          </div>
      </div>
    </PageTransition>
  );
};

export default ApiDocs;
