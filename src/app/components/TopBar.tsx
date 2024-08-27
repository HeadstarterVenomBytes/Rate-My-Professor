import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  IconButton,
  useTheme,
  Typography,
  Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NextLink from "next/link";

interface TopBarProps {}

const TopBar: React.FC<TopBarProps> = ({}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 6px",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            "&:hover": {
              color: theme.palette.primary.light,
            },
          }}
        >
          ProfPick
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton
            LinkComponent={NextLink}
            href="/search"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
              },
            }}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            aria-label="menu"
            edge="end"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            sx={{
              mr: 2,
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <Link href="/submit-url" component={NextLink} passHref>
              <MenuItem>Submit Url</MenuItem>
            </Link>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
