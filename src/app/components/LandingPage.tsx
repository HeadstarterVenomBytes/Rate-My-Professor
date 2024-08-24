import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  IconButton,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Import the hamburger icon
import NextLink from "next/link";

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = ({}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Function to open the menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to close the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Define the Topbar component inside the same file
  const Topbar: React.FC = () => {
    return (
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 16px",
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

          {/* Hamburger Menu */}
          <Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenuOpen} // Trigger menu open
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
              onClose={handleMenuClose} // Trigger menu close
            >
              {/* Menu items for navigation */}
              <MenuItem
                component={NextLink}
                href="/search"
                onClick={handleMenuClose}
              >
                Search
              </MenuItem>
              <MenuItem
                component={NextLink}
                href="/submit-url"
                onClick={handleMenuClose}
              >
                Submit URL
              </MenuItem>
              <MenuItem
                component={NextLink}
                href="/login"
                onClick={handleMenuClose}
              >
                Login
              </MenuItem>
              <MenuItem
                component={NextLink}
                href="/sign-up"
                onClick={handleMenuClose}
              >
                Sign Up
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    );
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: theme.palette.surface.main,
      }}
    >
      {/* Use the Topbar component here */}
      <Topbar />

      {/* Content */}
      <Box display="flex" flexGrow={1}>
        <Box
          component="div"
          flex="0 0 50%"
          padding={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          sx={{ backgroundColor: theme.palette.primaryContainer.main }}
        >
          <Typography
            variant="h3"
            component="h1"
            color={theme.palette.onSurface.main}
            sx={{ fontWeight: "bold" }}
          >
            Unlock your Learning Potential with the right Professor
          </Typography>
          <Typography
            variant="subtitle1"
            color={theme.palette.onSurfaceVariant.main}
            sx={{ mt: 2 }}
          >
            By Venombytes
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            href="/search"
            LinkComponent={NextLink}
            sx={{
              mt: 4,
              maxWidth: "fit-content",
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
              },
            }}
          >
            USE NOW
          </Button>
        </Box>
        <Box
          display="flex"
          component="div"
          alignItems="center"
          justifyContent="center"
          sx={{
            flex: "0 0 50%",
            backgroundColor: theme.palette.tertiaryContainer.main,
          }}
        >
          <Box
            sx={{
              width: "60%",
              height: "60%",
              border: `2px dashed ${theme.palette.outline.main}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: theme.palette.onSurfaceVariant.main }}
            >
              picture here
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
