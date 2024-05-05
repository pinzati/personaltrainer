import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import Traininglist from './Traininglist';
import Customerlist from './Customerlist';
import TrainingsCalendar from './Calendar';
import TrainingChart from './TrainingChart';

function TabPage() {

    
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    return (
        <div>
        <Tabs value={value} onChange={handleChange} style={{ marginBottom: '5px' }} >
            <Tab label="Customers" value={0}/>
            <Tab label="Trainings" value={1}/>
            <Tab label="Calendar" value={2} />
            <Tab label="Chart" value={3} />
        </Tabs>
        {value === 0 && <Customerlist />}
        {value === 1 && <Traininglist />}
        {value === 2 && <TrainingsCalendar />}
        {value === 3 && <TrainingChart />}
        </div>
    );
}

export default TabPage; 