import Nav from "@/components/Nav";
import ProfilePage from "@/components/pages/ProfilePage";
import React from "react";

const page = () => {
  return (
    <main>
      <section>
        <Nav />
      </section>

      <section>
        <ProfilePage />
      </section>

      {/* <div className=" h-screen flex items-center justify-center">
        <div className="w-[300px] h-[300px] bg-[#1d1d1d] p-8 rounded-lg shadow-md flex flex-col items-center justify-center">

          <div className="mb-6">
            <img
              src="https://placekitten.com/200/200" // Replace with the actual photo URL
              alt="Profile"
              className="w-32 h-32 rounded-full"
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl text-white font-semibold">John Doe</h2>
          </div>
        </div>

        <div className="w-[500px] h-[300px] bg-[#1d1d1d] p-8 rounded-lg shadow-md ml-10">

          <div>
            <h3 className="text-lg font-bold mb-4">About Me</h3>
            <p className="text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>


            <div className="mt-4">
              <p className="text-white">
                <strong>Email:</strong> john.doe@example.com
              </p>
              <p className="text-white">
                <strong>Location:</strong> City, Country
              </p>

            </div>
          </div>
        </div>
      </div> */}
    </main>
  );
};

export default page;
