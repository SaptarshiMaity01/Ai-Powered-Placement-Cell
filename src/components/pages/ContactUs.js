import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Footer from "../Footer";

// Custom icon for the marker
const MarkerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png", // Default Leaflet marker icon URL
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Anchor point of the icon
  popupAnchor: [1, -34], // Popup anchor
});

function CONTACT() {
  useEffect(() => {
    
    // Initialize the map centered on Nashik, India
    const map =L.map("map", {
      // Create a new pane for the map
    }).setView([20.0118, 73.79], 13);

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add a custom red marker for the center of Nashik
    const nashikCenterLocation = [20.0118, 73.79];
    L.marker(nashikCenterLocation, { icon: MarkerIcon })
      .addTo(map)
      .bindPopup("Head Office")
      .openPopup();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#030a1c] text-white/90 ">
      <div className="w-full flex flex-row mq750:flex-col">
        <div className="w-1/2 h-full m-12 mq750:m-2 mq750:w-auto">
          <h1 className="text-21xl font-bold  mb-2">
            Request for Your Query
          </h1>
          <p className=" mb-8">We'll get back to you shortly</p>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-700">First name *</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-slate-600 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Last name *</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-slate-600 rounded-md shadow-sm p-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700">Company</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-slate-600 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">E-mail</label>
                <input
                  type="email"
                  className="mt-1 block w-full border border-slate-600 rounded-md shadow-sm p-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-1">
              <div>
                <label className="block ">
                  What's Your Query
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-slate-600 rounded-md shadow-sm p-2"
                />
              </div>
            </div>
            <div className="flex items-start justify-start ">
              <button
                type="submit"
                className="bg-slate-900 text-white font-bold mt-6 py-2 px-6 rounded-full shadow-lg hover:bg-slate-700 w-1/2"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
        <div className="w-1/2 h-[600px] mq750:w-auto mq750:h-[300px] mq750:m-2 m-12 border border-slate-300 rounded-xl z-10">
          <div
            id="map"
            className="rounded-xl shadow-xl w-full h-full object-cover "
          ></div>
        </div>
      </div>
      <div className="flex flex-col w-full ">
        <div className="bg-slate-900 text-white h-[450px] m-12 mq750:mx-2 rounded-xl font-roboto-serif mq750:h-auto mq750:my-6">
          <div className="container mx-auto text-center justify-center mb-12">
            <h2 className="text-7xl font-semibold mb-10 mt-20">CONTACT US</h2>
            <p className="text-21xl font-bold mb-20">
              For any inquiries or questions
            </p>
          </div>
          <div className="container grid grid-cols-4 mq750:grid-cols-2 mq450:grid-cols-1 gap-8 text-center ">
            {/* Address Section */}
            <div>
              <h3 className="text-3xl font-semibold mb-2">ADDRESS</h3>
              <p> Anjaneri ,Trimbak Road,</p>
              <p> Nashik-422213.</p>
            </div>

            {/* Office Hours Section */}
            <div>
              <h3 className="text-3xl font-semibold mb-2">OFFICE HOURS</h3>
              <p>Monday - Friday:</p>
              <p>7AM - 5PM</p>
            </div>

            {/* Email Section */}
            <div>
              <h3 className="text-3xl font-semibold mb-2">EMAIL</h3>
              <p>bvcoe@gmail.com</p>
            </div>

            {/* Phone Section */}
            <div>
              <h3 className="text-3xl font-semibold mb-2">PHONE</h3>
              <p className="mq450:mb-5">123-456-7890</p>
            </div>
          </div>
        </div>
        <div className="h-full flex items-start justify-start  border-t mb-20 ">
                    <div className="w-full ml-12 mt-12 mr-12 font-roboto-serif ">

                        <h1 className="text-29xl font-bold  mb-20">Work With Us</h1>
                       <div className="sapce-y-6">
                            <div className="grid grid-cols-4 gap-4 mq750:grid-cols-1">
                                <div>
                                    <label className="block text-sm font-medium  mb-1">Company name *</label>
                                    <input type="text" className="w-full border border-slate-600 p-2 rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium  mb-1">Field of service</label>
                                    <input type="text" className="w-full border border-slate-600 p-2 rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium  mb-1">Email *</label>
                                    <input type="email" className="w-full border border-slate-600 p-2 rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium  mb-1">Subject</label>
                                    <input type="text" className="w-full border border-slate-600 p-2 rounded" />
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="w-1/5 bg-slate-900 hover:bg-slate-600 text-white py-2 rounded-full text-sm font-bold mt-10 mq750:w-1/2">SUBMIT</button>
                            </div>
                            </div>
                    </div>
                </div>
      </div>
      <div className="w-full">
      <Footer/>
      </div>
    </div>
  );
}

export default CONTACT;
