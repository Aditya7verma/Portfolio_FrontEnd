import React from "react";
import SectionTitel from "../../components/Header/SectionTitel";
import { useSelector } from "react-redux";

function Contact() {
  const { portfolioData } = useSelector((state) => state.root);
  const { contact } = portfolioData;
  // contact._id = undefined;

  return (
    <div>
      <SectionTitel title="Say Hello" />

      <div className="flex sm:flex-col items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-tertiary">{"{"}</p>

          {Object.keys(contact).map(
            (key) =>
              // Logic to remove the Id:-
              key !== "_id" && (
                <p className="ml-5">
                  <span className="text-tertiary">{key} :- </span>
                  <span className="text-tertiary">{contact[key]}</span>
                </p>
              )
          )}
          <p className="text-tertiary">{"}"}</p>
        </div>

        <div className="h-[400px]">
          <lottie-player
            src="https://lottie.host/d40ce627-82d2-4558-9092-5dacebc464b3/bDW9tNgnpX.json"
            background="transparent"
            speed="1"
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}

export default Contact;
