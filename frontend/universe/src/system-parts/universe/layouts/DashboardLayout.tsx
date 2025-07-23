import React, { useState, useEffect } from 'react';
import {
  Box,
  CssBaseline,
  Container,
  Typography,
  IconButton,
  InputBase,
  Paper,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ProfileMenu from '../comp/ProfileMenu';
import SideMenu from '../comp/SideMenu';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />

      {/* Top Navbar */}
      <Box
        component="header"
        sx={{
          height: 64,
          bgcolor: isScrolled ? 'transparent' : 'grey.300',
          color: 'black',
          px: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'grey.500',
          flexShrink: 0,
          transition: 'background-color 0.3s ease',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={toggleMenu} edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ mr: 4 }}>
            🔮 Djinni
          </Typography>

          {/* Search Field */}
          <Paper
            component="form"
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: 500,
              height: 36,
              px: 1,
              borderRadius: 1,
              backgroundColor: 'white',
            }}
            elevation={0}
          >
            <SearchIcon sx={{ color: 'grey.600', mr: 1 }} />
            <InputBase
              placeholder="Looking for something? Ask away :) "
              sx={{ flex: 1, fontSize: 14 }}
              inputProps={{ 'aria-label': 'Ask Djinni anything' }}
            />
          </Paper>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <ProfileMenu />
      </Box>      

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Side Menu */}
        <SideMenu open={menuOpen} />

        {/* Page Content */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: 'calc(100vh - 64px - 48px)', // Adjust for header and footer
            pt: 0,
            pb: 4,
          }}
        >
          
          {/* Right-Aligned Content Wrapper */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start', 
              px: { xs: 0, md: 1 }, // some padding
              mt: 1,
            }}
          >
            <Box
              sx={{
                width: { xs: '100%', sm: '100%', md: '90%', lg: '100%', xl: '100%' },
                maxWidth: '100%',
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Spacer to push footer to bottom */}

      {/* Docked Footer */}
      <Box
        component="footer"
        sx={{
          height: 48,
          bgcolor: 'grey.200',
          p: 2,
          textAlign: 'center',
          borderTop: '1px solid',
          borderColor: 'grey.500',
          flexShrink: 0,
        }}
      >
        <Typography variant="body2">© {new Date().getFullYear()} Universe Inc.</Typography>
      </Box>
    </Box>
  );
}
