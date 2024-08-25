import React from "react";
import SectionTitel from "../../components/Header/SectionTitel";
// import { certificates } from "../../resources/certificates";
import { useSelector } from "react-redux";

function Certificates() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { certificates } = portfolioData;

  return (
    <div>
      <SectionTitel title="Certificates" />

      <div className="flex py-10 gap-32 sm:flex-col">
        {/* displaying the Projects title */}

        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {certificates.map((certificate, index) => (
            <div
              onClick={() => {
                setSelectedItemIndex(index);
              }}
              className="cursor-pointer"
            >
              <h1
                className={`text-xl px-10 ${
                  selectedItemIndex === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#04645f5f] py-3"
                    : "text-white"
                }`}
              >
                {certificate.title}
              </h1>
            </div>
          ))}
        </div>

        {/* displaying the content of those projects title */}
        <div className="flex items-center justify-center gap-10 sm:flex-col">
          <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-xl">
              {certificates[selectedItemIndex].title}
            </h1>
            <h1 className="text-secondary text-xl">
              {certificates[selectedItemIndex].duration}
            </h1>

            <p className="text-white">
              {certificates[selectedItemIndex].description}
            </p>
            {/* <p className="text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque asperiores laborum voluptate officiis libero quo,
              dolore assumenda harum sapiente vitae inventore! Totam tempore
              iste unde excepturi, dolorum deleniti accusamus eum.
            </p> */}
          </div>
          <img
            src={certificates[selectedItemIndex].image}
            alt=""
            className="h-56 w-80 sm:h-52 sm:w-56"
          />
        </div>
      </div>
    </div>
  );
}

export default Certificates;
