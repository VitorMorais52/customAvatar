/* eslint-disable react/prop-types */

import "./NavBar.css";

const NavBar = ({ tabsConfig, currentTab, changeCurrentTab }) => {
  return (
    <div className="containerBar">
      <div className="bar">
        {Object.entries(tabsConfig).map(([key, tabConfig]) => (
          <div
            data-activate={currentTab === key}
            key={key}
            onClick={() => changeCurrentTab(key)}
          >
            {tabConfig.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
