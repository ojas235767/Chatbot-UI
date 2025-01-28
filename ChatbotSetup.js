
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

const ChatbotSetup = () => {
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState("");
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    website: "",
    description: "",
  });
  const [scrapedData, setScrapedData] = useState([
    { id: 1, url: "https://example.com/about", status: "Scraped" },
    { id: 2, url: "https://example.com/services", status: "Pending" },
    { id: 3, url: "https://example.com/contact", status: "Detected" },
  ]);
  const [integrationSuccess, setIntegrationSuccess] = useState(false);

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg"
      >
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-4">User Registration</h2>
            <Input placeholder="Name" className="mb-2" />
            <Input placeholder="Email" type="email" className="mb-2" />
            <Input placeholder="Password" type="password" className="mb-4" />
            <Button className="w-full mb-2">Continue with Google</Button>
            <Button className="w-full" onClick={handleNextStep}>
              Submit & Verify Email
            </Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Email Verification</h2>
            <Input
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="mb-4"
            />
            <Button className="w-full" onClick={handleNextStep}>
              Verify
            </Button>
            <Button className="w-full mt-2" variant="ghost" onClick={handlePrevStep}>
              Back
            </Button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Setup Organisation</h2>
            <Input
              placeholder="Company Name"
              className="mb-2"
              value={companyDetails.name}
              onChange={(e) =>
                setCompanyDetails({ ...companyDetails, name: e.target.value })
              }
            />
            <Input
              placeholder="Company Website URL"
              className="mb-2"
              value={companyDetails.website}
              onChange={(e) =>
                setCompanyDetails({ ...companyDetails, website: e.target.value })
              }
            />
            <Textarea
              placeholder="Company Description"
              className="mb-4"
              value={companyDetails.description}
              onChange={(e) =>
                setCompanyDetails({ ...companyDetails, description: e.target.value })
              }
            />
            <Button className="w-full mb-2" onClick={handleNextStep}>
              Next: View Scraped Data
            </Button>
            <Button className="w-full" variant="ghost" onClick={handlePrevStep}>
              Back
            </Button>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Scraped Webpages</h2>
            <div className="space-y-4">
              {scrapedData.map((page) => (
                <Card key={page.id} className="p-4">
                  <CardContent className="flex justify-between items-center">
                    <span>{page.url}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        page.status === "Scraped"
                          ? "bg-green-100 text-green-700"
                          : page.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {page.status}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button className="w-full mt-4" onClick={handleNextStep}>
              Next: Chatbot Integration
            </Button>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Chatbot Integration</h2>
            <Button className="w-full mb-2">Test Chatbot</Button>
            <Button className="w-full mb-2">Integrate on Website</Button>
            <Button
              className="w-full"
              onClick={() => setIntegrationSuccess(true)}
            >
              Test Integration
            </Button>
          </div>
        )}

        {integrationSuccess && step === 5 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Integration Successful!</h2>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-4"
            >
              🎉 Integration completed successfully!
            </motion.div>
            <Button className="w-full mb-2">Explore Admin Panel</Button>
            <Button className="w-full mb-2">Start Talking to Your Chatbot</Button>
            <div className="flex justify-center space-x-2">
              <Button variant="outline">Share on Twitter</Button>
              <Button variant="outline">Share on LinkedIn</Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ChatbotSetup;
