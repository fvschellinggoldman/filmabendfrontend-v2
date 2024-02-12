import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import EventArchiveOverview from "./EventArchiveOverview";
import { MovieArchive } from "./MovieArchive";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <>{children}</>}
    </div>
  );
}

const ArchiveTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", marginTop: "3px" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Movie Archive" />
          <Tab label="Category Archive" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <MovieArchive />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EventArchiveOverview />
      </TabPanel>
    </Box>
  );
};

export default ArchiveTabs;
