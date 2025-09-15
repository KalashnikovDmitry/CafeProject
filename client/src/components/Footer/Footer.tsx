import React from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Link,
} from '@mui/material';
import {
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'black',
        color: 'white',
        py: 2,
        width: '100vw',
        margin: 0,
        padding: 0,
        position: 'relative',
        zIndex: 4,
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        minHeight: 'auto',
      }}
    >
      <Container maxWidth="lg" sx={{ px: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Social Icons */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconButton
              component={Link}
              href="https://www.instagram.com/esenin.cafe.bar/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'rgba(134, 135, 139, 1)',
                fontSize: '1.5rem',
                transition: 'all 0.7s ease',
                '&:hover': {
                  transform: 'scale(1.2) rotate(360deg)',
                  color: 'primary.main',
                },
              }}
            >
              <InstagramIcon fontSize="large" />
            </IconButton>

            <IconButton
              component={Link}
              href="https://vk.com/eseninmalinovka"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'rgba(134, 135, 139, 1)',
                fontSize: '1.5rem',
                transition: 'all 0.7s ease',
                '&:hover': {
                  transform: 'scale(1.2) rotate(360deg)',
                  color: 'primary.main',
                },
              }}
            >
              <Box
                component="svg"
                sx={{
                  width: 24,
                  height: 24,
                  fill: 'currentColor',
                }}
                viewBox="0 0 24 24"
              >
                <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1.01-1.49-.864-1.744-.864-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.271.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.795.780 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
              </Box>
            </IconButton>

            <IconButton
              component={Link}
              href="https://www.facebook.com/eseninmalinovka/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'rgba(134, 135, 139, 1)',
                fontSize: '1.5rem',
                transition: 'all 0.7s ease',
                '&:hover': {
                  transform: 'scale(1.2) rotate(360deg)',
                  color: 'primary.main',
                },
              }}
            >
              <FacebookIcon fontSize="large" />
            </IconButton>
          </Box>

          {/* Copyright */}
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '0.75rem',
              textAlign: 'center',
            }}
          >
            © 2024 Кафе-Бар Есенин. Все права защищены.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;