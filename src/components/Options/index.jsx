/* eslint-disable react/prop-types */

import "./Options.css";
const Options = ({ tabsConfig, currentTab, partsSettings, changeConfigs }) => {
  const optionsList = Object.entries(tabsConfig[currentTab].list);
  return (
    <div
      className="options"
      style={{ display: optionsList.length === 0 ? "none" : "flex" }}
    >
      {optionsList.map(([title, Component], index) => (
        <div
          key={index}
          data-activate={
            partsSettings[currentTab] === title.toLocaleLowerCase()
          }
          onClick={() => changeConfigs(title.toLocaleLowerCase())}
        >
          <Component
            translateValues={{ x: "0", y: "0" }}
            isIndividualComponent={true}
          />
        </div>
      ))}
    </div>
  );
};

export default Options;
