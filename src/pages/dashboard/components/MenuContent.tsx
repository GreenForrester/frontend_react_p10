import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
//import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { ReceiptLong } from '@mui/icons-material';
import { Category } from '@mui/icons-material';
import React from 'react';


const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon /> },
  { text: 'Customers', icon: <PeopleRoundedIcon /> },
  { text: 'Products', icon: <Category /> },
  { text: 'Orders', icon: <ReceiptLong/> },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> },
];

interface MenuContentProps {
  onMenuClick: (view: string) => void; // Define the prop type
}

export default function MenuContent({ onMenuClick }: MenuContentProps) {
  const [selectedItem, setSelectedItem] = React.useState('home'); //inititial state
  const handleItemClick = (text: string) => {
    setSelectedItem(text.toLowerCase()); 
    onMenuClick(text.toLowerCase());
  };


  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected= {selectedItem === item.text.toLowerCase()} onClick={() => handleItemClick(item.text)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
