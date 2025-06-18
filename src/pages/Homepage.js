import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Box, Button } from "@mui/material";
import styled from "styled-components";
import Students from "../assets/students.svg";
import { LightPurpleButton } from "../components/buttonStyles";

const Homepage = () => {
  return (
    <StyledContainer>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
          <img src={Students} alt="students" style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <StyledTitle>
              Welcome to{" "}
              <span style={{ color: "rgb(83, 148, 222)" }}>EduVise</span>
            </StyledTitle>
            <StyledText>
              - Your Smart Classroom Companion 📚
              <br />✨ Experience the future of education with EduVise – where
              classrooms become smarter, and learning becomes better.
            </StyledText>
            <StyledBox>
              <StyledLink to="/choose">
                <LightPurpleButton variant="contained" fullWidth>
                  Login
                </LightPurpleButton>
              </StyledLink>
              <StyledLink to="/chooseasguest">
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    mt: 2,
                    mb: 3,
                    color: "rgb(83, 148, 222)",
                    borderColor: "rgb(83, 148, 222)",
                  }}
                >
                  Login as Guest
                </Button>
              </StyledLink>
              <StyledText>
                Don't have an account?{" "}
                <Link
                  to="/Adminregister"
                  style={{ color: "rgb(83, 148, 222)" }}
                >
                  Sign up
                </Link>
              </StyledText>
            </StyledBox>

            <AttributionWrapper>
              <AttributionText>
                ✨ Initiated and Developed by{" "}
                <DeveloperName>Atharve Agrawal</DeveloperName>
              </AttributionText>
              <AttributionSubtext>
                Crafted with ❤️ for the future of education
              </AttributionSubtext>
            </AttributionWrapper>
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  /* font-family: "Manrope"; */
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  /* color: rgb(83, 148, 222); */
  margin-top: 30px;
  margin-bottom: 30px;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

// New styled components for attribution
const AttributionWrapper = styled.div`
  text-align: center;
  padding: 20px;
  background: linear-gradient(
    135deg,
    rgba(83, 148, 222, 0.1),
    rgba(83, 148, 222, 0.05)
  );
  border-radius: 15px;
  border: 1px solid rgba(83, 148, 222, 0.2);
  margin-top: auto;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(83, 148, 222, 0.2),
      transparent
    );
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
`;

const AttributionText = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
`;

const DeveloperName = styled.span`
  background: linear-gradient(135deg, rgb(83, 148, 222), rgb(120, 180, 255));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  font-size: 1.2rem;
  text-shadow: 0 2px 4px rgba(83, 148, 222, 0.3);
  position: relative;

  &::after {
    content: "✨";
    position: absolute;
    right: -25px;
    top: -5px;
    font-size: 0.8rem;
    animation: sparkle 2s infinite;
  }

  @keyframes sparkle {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.2);
    }
  }
`;

const AttributionSubtext = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  font-style: italic;
  position: relative;
  z-index: 1;
`;
