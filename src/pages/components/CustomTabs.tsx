import React, { useState } from "react";
import { Tab, Tabs, Toolbar } from "@material-ui/core";
import { TabContext, TabPanel } from "@material-ui/lab";
import SwipeableViews from "react-swipeable-views";

import styles from "./styles.less";

type CustomTabsProps = {
  tabNames?: any;
  tabContents?: any;
};

const CustomTabs = ({ tabNames, tabContents }: CustomTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const changeTabs = (event: any, newTab: number) => {
    setActiveTab(newTab);
  };

  const changeSwipeableTabs = (newTab: number) => {
    setActiveTab(newTab);
  };

  return (
    <TabContext value={activeTab} style={{ overflow: "hidden" }}>
      <Toolbar disableGutters className={styles.tabsToolbar}>
        <Tabs
          value={activeTab}
          onChange={changeTabs}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          className={styles.tabs}
        >
          {tabNames?.map((tabName: string) => (
            <Tab label={tabName} />
          ))}
        </Tabs>
      </Toolbar>
      <SwipeableViews index={activeTab} onChangeIndex={changeSwipeableTabs}>
        {tabContents?.map((tabContents: any) => (
          <TabPanel value={activeTab}>{tabContents}</TabPanel>
        ))}
      </SwipeableViews>
    </TabContext>
  );
};

export default CustomTabs;
