import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
  Typography,
  Fade,
} from '@mui/material';
import { AccountCircle, School, Group, ArrowForward } from '@mui/icons-material';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const password = "zxc"

  const { status, currentUser, currentRole } = useSelector(state => state.user);;

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Adminlogin');
      }
    }

    else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1"
        const studentName = "Dipesh Awasthi"
        const fields = { rollNum, studentName, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Studentlogin');
      }
    }

    else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Teacherlogin');
      }
    }
  }

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      }
      else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    }
    else if (status === 'error') {
      setLoader(false)
      setMessage("Network Error")
      setShowPopup(true)
    }
  }, [status, currentRole, navigate, currentUser]);

  const userTypes = [
    {
      type: "Admin",
      icon: <AccountCircle />,
      title: "Administrator",
      description: "Access the dashboard to manage app data, users, and system settings.",
      color: "#FF6B6B",
      gradient: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)"
    },
    {
      type: "Student",
      icon: <School />,
      title: "Student",
      description: "Explore course materials, assignments, and track your academic progress.",
      color: "#4ECDC4",
      gradient: "linear-gradient(135deg, #4ECDC4 0%, #6EE5DD 100%)"
    },
    {
      type: "Teacher",
      icon: <Group />,
      title: "Teacher",
      description: "Create courses, manage assignments, and monitor student progress.",
      color: "#45B7D1",
      gradient: "linear-gradient(135deg, #45B7D1 0%, #67C3E0 100%)"
    }
  ];

  return (
    <StyledContainer>
      <FloatingShapes>
        <Shape1 />
        <Shape2 />
        <Shape3 />
        <Shape4 />
      </FloatingShapes>
      
      <ContentWrapper>
        <HeaderSection>
          <WelcomeText variant="h2">
            Welcome to EduVise
          </WelcomeText>
          <SubText variant="h6">
            Choose your role to get started
          </SubText>
        </HeaderSection>

        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {userTypes.map((user, index) => (
              <Grid item xs={12} sm={6} md={4} key={user.type}>
                <Fade in={true} timeout={1000 + index * 200}>
                  <UserCard
                    elevation={0}
                    onClick={() => navigateHandler(user.type)}
                    gradient={user.gradient}
                    color={user.color}
                  >
                    <CardContent>
                      <IconWrapper color={user.color}>
                        {user.icon}
                      </IconWrapper>
                      
                      <UserTitle variant="h5">
                        {user.title}
                      </UserTitle>
                      
                      <UserDescription variant="body1">
                        {user.description}
                      </UserDescription>
                      
                      <ActionButton>
                        <span>Get Started</span>
                        <ArrowForward className="arrow-icon" />
                      </ActionButton>
                    </CardContent>
                  </UserCard>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ContentWrapper>

      <StyledBackdrop
        open={loader}
      >
        <LoaderContent>
          <CircularProgress size={60} sx={{ color: '#fff', marginBottom: 2 }} />
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 300 }}>
            Please Wait...
          </Typography>
        </LoaderContent>
      </StyledBackdrop>
      
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(120deg); }
  66% { transform: translateY(10px) rotate(240deg); }
`;

const floatReverse = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(15px) rotate(-90deg); }
  66% { transform: translateY(-10px) rotate(-180deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.1); opacity: 0.9; }
`;

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const StyledContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  position: relative;
  overflow: hidden;
`;

const FloatingShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const Shape1 = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: 10%;
  left: 10%;
  animation: ${float} 6s ease-in-out infinite;
`;

const Shape2 = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  top: 70%;
  right: 10%;
  animation: ${floatReverse} 8s ease-in-out infinite;
`;

const Shape3 = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  top: 20%;
  right: 20%;
  animation: ${pulse} 4s ease-in-out infinite;
`;

const Shape4 = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  bottom: 20%;
  left: 20%;
  animation: ${float} 7s ease-in-out infinite reverse;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  animation: ${slideInUp} 1s ease-out;
`;

const WelcomeText = styled(Typography)`
  && {
    color: white;
    font-weight: 700;
    margin-bottom: 1rem;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;

const SubText = styled(Typography)`
  && {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 300;
    text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  }
`;

const UserCard = styled(Paper)`
  && {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 0;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
    overflow: hidden;
    height: 100%;
    min-height: 280px;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: ${props => props.gradient};
    }

    &:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
      
      .arrow-icon {
        transform: translateX(5px);
      }
    }

    &:active {
      transform: translateY(-5px) scale(1.01);
    }
  }
`;

const CardContent = styled.div`
  padding: 2.5rem 2rem;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: ${props => props.color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  .MuiSvgIcon-root {
    font-size: 2.5rem;
    color: white;
  }
`;

const UserTitle = styled(Typography)`
  && {
    color: #2c3e50;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;

const UserDescription = styled(Typography)`
  && {
    color: #7f8c8d;
    line-height: 1.6;
    margin-bottom: 2rem;
    font-size: 0.95rem;
  }
`;

const ActionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #3498db;
  font-weight: 600;
  font-size: 1rem;
  margin-top: auto;
  
  .arrow-icon {
    transition: transform 0.3s ease;
    font-size: 1.2rem;
  }
`;

const StyledBackdrop = styled(Backdrop)`
  && {
    z-index: 9999;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
  }
`;

const LoaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;