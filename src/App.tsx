
import { useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CountdownTimer from '@components/CountdownTimer/CountdownTimer'
import UserList from '@components/UserList/UserList'
import WindowSize from '@components/WindowSize/WindowSize'

function App() {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box className="box">
      <TabContext value={value}>
        <Box className="boxInner">
          <TabList onChange={handleChange}>
            <Tab label="CountdownTimer" value="1" />
            <Tab label="UserList" value="2" />
            <Tab label="WindowSize" value="3" />
          </TabList>
        </Box>
        <TabPanel className='tabPanel' value="1">
          <CountdownTimer />
        </TabPanel>
        <TabPanel className='tabPanel' value="2">
          <UserList />
        </TabPanel>
        <TabPanel className='tabPanel' value="3">
          <WindowSize />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default App
