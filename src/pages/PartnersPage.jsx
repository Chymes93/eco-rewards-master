import React, { useState } from 'react';
import Footer from '../components/Footer';

const PartnersPage = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    industryType: [],
    companySize: '',
    headquarterLocation: '',
    operatingRegions: [],
    fullName: '',
    role: '',
    email: '',
    phoneNumber: '',
    partnershipTypes: [],
    partnershipOther: '',
    partnershipReason: '',
    ecoPractices: '',
    ecoPracticesDesc: '',
    additionalInfo: '',
    hearAboutUs: [],
    hearAboutUsOther: '',
    privacyConsent: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'partnershipTypes') {
      setFormData((prevState) => {
        const newValues = checked
          ? [...prevState[name], value]
          : prevState[name].filter((item) => item !== value);
        return { ...prevState, [name]: newValues };
      });
    } else if (name === 'ecoPractices') {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    } else if (name === 'hearAboutUs') {
      setFormData((prevState) => {
        const newValues = checked
          ? [...prevState[name], value]
          : prevState[name].filter((item) => item !== value);
        return { ...prevState, [name]: newValues };
      });
    } else {
      setFormData((prevState) => {
        const newValues = checked
          ? [...prevState[name], value]
          : prevState[name].filter((item) => item !== value);
        return { ...prevState, [name]: newValues };
      });
    }
  };

  const FormCheckbox = ({ name, value, label, ...props }) => (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={`${name}-${value}`}
        name={name}
        value={value}
        checked={Array.isArray(formData[name]) ? formData[name].includes(value) : formData[name] === value}
        onChange={handleCheckboxChange}
        className="h-4 w-4 text-eco-green border-gray-300 rounded focus:ring-eco-green"
        {...props}
      />
      <label htmlFor={`${name}-${value}`} className="ml-3 text-base text-gray-700">
        {label}
      </label>
    </div>
  );

  return (
    <div className="bg-white min-h-screen text-eco-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-4 font-poppins">
          Ecorewards Partner Application Form
        </h1>
        <p className="text-lg text-center font-semibold mb-8 font-poppins">
          Join Us in Building a More Sustainable Future!
        </p>
        <p className="text-base text-center text-gray-600 mb-6 font-poppins">
          We're excited to partner with organizations committed to reducing plastic waste, encouraging eco-friendly habits, and creating positive environmental impact.
        </p>
        <p className="text-base text-center text-gray-600 mb-8 font-poppins">
          Kindly fill out the form below to express your interest in becoming a partner.
        </p>
        <hr className="border-t-4 border-eco-green mb-12" />
        
        <div className="bg-[#FFFBF9] p-8 rounded-lg">
          <form>
            <h2 className="text-xl font-bold mb-6">1. Organization Details</h2>

            <div className="mb-8">
              <label htmlFor="organizationName" className="block text-base font-semibold text-gray-800 mb-2">What is your organization's name?</label>
              <input type="text" id="organizationName" name="organizationName" value={formData.organizationName} onChange={handleInputChange} placeholder="Your answer" className="w-full p-4 bg-white border border-gray-300 rounded-xl" />
            </div>

            <div className="mb-8">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Industry Type:</h3>
              <div className="space-y-3">
                <FormCheckbox name="industryType" value="Retail" label="Retail" />
                <FormCheckbox name="industryType" value="FMCG" label="FMCG" />
                <FormCheckbox name="industryType" value="Packaging" label="Packaging" />
                <FormCheckbox name="industryType" value="Non-Profit" label="Non-Profit" />
                <FormCheckbox name="industryType" value="Tech/Startup" label="Tech/Startup" />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Company Size:</h3>
              <div className="space-y-3">
                <FormCheckbox name="companySize" value="1-10" label="1-10 employees" />
                <FormCheckbox name="companySize" value="11-50" label="11-50" />
                <FormCheckbox name="companySize" value="51-200" label="51-200" />
                <FormCheckbox name="companySize" value="201+" label="201+" />
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="headquarterLocation" className="block text-base font-semibold text-gray-800 mb-2">Where is your headquarter located?</label>
              <input type="text" id="headquarterLocation" name="headquarterLocation" value={formData.headquarterLocation} onChange={handleInputChange} placeholder="Your answer" className="w-full p-4 bg-white border border-gray-300 rounded-xl" />
            </div>

            <div className="mb-8">
              <h3 className="text-base font-semibold text-gray-800 mb-2">Operating Regions <span className="font-normal text-gray-500">(Check all that apply)</span></h3>
              <div className="space-y-3">
                <FormCheckbox name="operatingRegions" value="Nationwide" label="Nationwide" />
                <FormCheckbox name="operatingRegions" value="Lagos" label="Lagos" />
                <FormCheckbox name="operatingRegions" value="Abuja" label="Abuja" />
                <FormCheckbox name="operatingRegions" value="Port Harcourt" label="Port Harcourt" />
                <FormCheckbox name="operatingRegions" value="Others" label="Others" />
              </div>
            </div>

            <hr className="border-t border-gray-200 my-8" />

            <h2 className="text-xl font-bold mb-6">2. Contact person</h2>

            <div className="mb-8">
              <label htmlFor="fullName" className="block text-base font-semibold text-gray-800 mb-2">Full Name</label>
              <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Your answer" className="w-full p-4 bg-white border border-gray-300 rounded-xl" />
            </div>

            <div className="mb-8">
              <label htmlFor="role" className="block text-base font-semibold text-gray-800 mb-2">Role/Title</label>
              <input type="text" id="role" name="role" value={formData.role} onChange={handleInputChange} placeholder="Your answer" className="w-full p-4 bg-white border border-gray-300 rounded-xl" />
            </div>

            <div className="mb-8">
              <label htmlFor="email" className="block text-base font-semibold text-gray-800 mb-2">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Your answer" className="w-full p-4 bg-white border border-gray-300 rounded-xl" />
            </div>

            <div className="mb-8">
              <label htmlFor="phoneNumber" className="block text-base font-semibold text-gray-800 mb-2">Phone Number</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Your answer" className="w-full p-4 bg-white border border-gray-300 rounded-xl" />
            </div>

            <hr className="border-t border-gray-200 my-8" />

            <h2 className="text-xl font-bold mb-6">3. Partnership Interest</h2>

            <div className="mb-8">
              <h3 className="text-base font-semibold text-gray-800 mb-4">What type of partnership are you interested in? <span className="font-normal text-gray-500">(Check all that apply)</span></h3>
              <div className="space-y-3">
                <FormCheckbox name="partnershipTypes" value="Displaying Ecorewards QR codes on products" label="Displaying Ecorewards QR codes on products" />
                <FormCheckbox name="partnershipTypes" value="Offering customer incentives for eco-behaviors" label="Offering customer incentives for eco-behaviors" />
                <FormCheckbox name="partnershipTypes" value="Joint environmental campaigns " label="Joint environmental campaigns " />
                <FormCheckbox name="partnershipTypes" value="Hosting Ecorewards eco-points redemption hubs" label="Hosting Ecorewards eco-points redemption hubs" />
                <FormCheckbox name="partnershipTypes" value="Technology/API integration" label="Technology/API integration" />
                <FormCheckbox name="partnershipTypes" value="Other" label="Other (please specify)" />
              </div>
              {formData.partnershipTypes.includes('Other') && (
                <div className="mt-4">
                  <input 
                    type="text" 
                    name="partnershipOther" 
                    value={formData.partnershipOther} 
                    onChange={handleInputChange}
                    placeholder="Please specify" 
                    className="w-full p-4 bg-white border border-gray-300 rounded-xl mt-2"
                  />
                </div>
              )}
            </div>

            <div className="mb-8">
              <label htmlFor="partnershipReason" className="block text-base font-semibold text-gray-800 mb-2">
                Why are you interested in partnering with us?
              </label>
              <textarea 
                id="partnershipReason" 
                name="partnershipReason" 
                value={formData.partnershipReason} 
                onChange={handleInputChange} 
                placeholder="Your answer" 
                rows="4"
                className="w-full p-4 bg-white border border-gray-300 rounded-xl"
              />
            </div>

            <div className="mb-8">
              <h3 className="text-base font-semibold text-gray-800 mb-4">
              Are you currently implementing any eco-friendly practices?
              </h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ecoPractices-yes"
                    name="ecoPractices"
                    value="Yes"
                    checked={formData.ecoPractices === 'Yes'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-eco-green border-gray-300 focus:ring-eco-green"
                  />
                  <label htmlFor="ecoPractices-yes" className="ml-3 text-base text-gray-700">
                    Yes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ecoPractices-no"
                    name="ecoPractices"
                    value="No"
                    checked={formData.ecoPractices === 'No'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-eco-green border-gray-300 focus:ring-eco-green"
                  />
                  <label htmlFor="ecoPractices-no" className="ml-3 text-base text-gray-700">
                    No
                  </label>
                </div>
              </div>
              {formData.ecoPractices === 'Yes' && (
                <div>
                  <label htmlFor="ecoPracticesDesc" className="block text-base font-semibold text-gray-800 mb-2">
                    Please describe briefly
                  </label>
                  <textarea 
                    id="ecoPracticesDesc" 
                    name="ecoPracticesDesc" 
                    value={formData.ecoPracticesDesc} 
                    onChange={handleInputChange} 
                    placeholder="Your answer" 
                    rows="4"
                    className="w-full p-4 bg-white border border-gray-300 rounded-xl"
                  />
                </div>
              )}
            </div>

            <hr className="border-t border-gray-200 my-8" />

            <h2 className="text-xl font-bold mb-6">4. Additional Information</h2>

            <div className="mb-8">
              <label htmlFor="additionalInfo" className="block text-base font-semibold text-gray-800 mb-2">
              Website / Social Media Links
              </label>
              <textarea 
                id="additionalInfo" 
                name="additionalInfo" 
                value={formData.additionalInfo || ''} 
                onChange={handleInputChange} 
                placeholder="Your answer" 
                rows="4"
                className="w-full p-4 bg-white border border-gray-300 rounded-xl"
              />
            </div>

            <div className="mb-8">
              <h3 className="text-base font-semibold text-gray-800 mb-4">
                How did you hear about us?
              </h3>
              <div className="space-y-3">
                <FormCheckbox name="hearAboutUs" value="Social Media" label="Social Media" />
                <FormCheckbox name="hearAboutUs" value="Referral" label="Referral" />
                <FormCheckbox name="hearAboutUs" value="Event" label="Event" />
                <FormCheckbox name="hearAboutUs" value="News Article" label="News Article" />
                <FormCheckbox name="hearAboutUs" value="Other" label="Other (please specify)" />
              </div>
              {formData.hearAboutUs && formData.hearAboutUs.includes('Other') && (
                <div className="mt-4">
                  <input 
                    type="text" 
                    name="hearAboutUsOther" 
                    value={formData.hearAboutUsOther || ''} 
                    onChange={handleInputChange}
                    placeholder="Please specify" 
                    className="w-full p-4 bg-white border border-gray-300 rounded-xl mt-2"
                  />
                </div>
              )}
            </div>

            <div className="mb-8">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="privacyConsent"
                    name="privacyConsent"
                    type="checkbox"
                    checked={formData.privacyConsent || false}
                    onChange={(e) => setFormData({...formData, privacyConsent: e.target.checked})}
                    className="h-4 w-4 text-eco-green border-gray-300 rounded focus:ring-eco-green"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="privacyConsent" className="font-medium text-gray-700">
                    I consent to the processing of my personal data in accordance with Ecorewards' Privacy Policy
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-eco-green hover:bg-eco-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PartnersPage;
