
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

type SideBarProps = {
  open: boolean;
  onClose: () => void;
};

export default function SideBar({ open, onClose }: SideBarProps) {
  const itemsGroup1 = ["Inbox", "Starred", "Send email", "Drafts"];
  const itemsGroup2 = ["All mail", "Trash", "Spam"];

  const list = (
    <Box sx={{ width: 250 }} role="presentation" onKeyDown={onClose}>
      <List>
        {itemsGroup1.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={onClose}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        {itemsGroup2.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={onClose}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      {list}
    </Drawer>
  );
}
