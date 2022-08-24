import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Container, TextField, Typography,InputLabel } from '@mui/material';
import * as BackendAPI from  '../../services/BackendAPI';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import gtag, { install } from 'ga-gtag';
import {AddUser} from './loginSlice';
import { useDispatch } from 'react-redux';
import { FilledInput } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { useCountdown } from '../../hooks/useCountdown';
import { ShowCounter } from '../ShowCounter';
import useSound from 'use-sound';
import boopSfx from '../../sound/sad.mp3';

install('G-PCTGS2X60L');

function Login({authenticate}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled , setIsDisabled] = useState(true);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [authError, setAuthError] = useState(false);
    const navigate = useNavigate();
    const isUserAuth  = JSON.parse(localStorage.getItem('user'));
    const [showPassword, setShowPassword]=useState(false);
    const [days, hours, minutes, seconds] = useCountdown('2022-09-30');
    const [play] = useSound(boopSfx);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    

    const dispatch = useDispatch();

    useEffect(()=>{
        if(isUserAuth){
            dispatch(AddUser(Cookies.get('data')));
            navigate('dashboard', {replace: true});
        }
    },[]);

    const resetInput = () => {
        setEmail('');
        setPassword('');
    };

    useEffect(() => {
        setAuthError(false);
    },[email,password]);
    

    const isFormValid = () => {  
        return email && password;
    };

    useEffect(() => {
        setIsDisabled(!!isFormValid());
    },[isFormValid]);
    
    const validateUser = () => {
        setIsLoading(true);
        const requestParams = {
            body: {
                email,
                password
            },
        };
        
        BackendAPI.authentication(requestParams)
            .then(response => {
                const {author} = response.data;
                dispatch(AddUser(author));
                Cookies.set('data', JSON.stringify(author), { expires: 1 });
                Cookies.set('token', author.jwToken, { expires: 1 });
                Cookies.set('author', author.name, { expires: 1 });
                Cookies.set('img', author.img, { expires: 1 });
                gtag('event', 'login', { 'Author': `${email}` });
                authenticate();
                resetInput();
                navigate('dashboard', {replace: true});
                setIsLoading(false);
            })
            .catch( () => {
                setIsLoading(false);
                setAuthError(true);});
    };
    useEffect(() => {
        const listener = event => {
            if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                event.preventDefault();
                validateUser();
            }
        };
        document.addEventListener('keydown', listener);
        return () => {
            document.removeEventListener('keydown', listener);
        };
    }, [email,password]);

    const playMusic = () => {
        play();
        setIsPlaying(true);
    };
    
    return (
        <>
            <Box
                component="main"
                sx={{
                    alignItems      : 'center',
                    display         : 'flex',
                    flexGrow        : 1,
                    minHeight       : '100vh',
                    backgroundColor : 'rgba(250,250,250,.3)'
                }}
            >
                <Container 
                    maxWidth="sm"                
                    onMouseEnter={() => isPlaying ? null : playMusic()}
                >
                    <img src={'https://www.popoptiq.com/wp-content/uploads/2014/01/2.WoodyeBuzz.jpg'}
                        style={{
                            marginTop    : 50,
                            display      : 'inline-block',
                            maxWidth     : '100%',
                            width        : 560,
                            borderRadius : '30px 30px 0px 0px',
                        }}
                    />
                    <form>
                        <Box sx={{ my: 3, textAlign: 'center' }}>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                            It has been one hell of a ride...
                            </Typography>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                <Typography color='red' variant="h4" >
                                    <ShowCounter
                                        days={days}
                                        hours={hours}
                                        minutes={minutes}
                                        seconds={seconds}
                                    />    
                                </Typography>
                            </Typography>
                        </Box>
                        <p aria-live='assertive'> 
                            {authError
                                ? 'bad credentials'
                                :null
                            }
                        </p>
                        <TextField
                            id="filled-basic-email"
                            variant="filled"
                            fullWidth
                            margin="normal"
                            helperText={'email'}
                            label="email"
                            value={email}
                            onChange={(event) => {setEmail(event.target.value);}}
                        />
                        <FormControl fullWidth variant="filled">
                            <InputLabel htmlFor="filled">Password</InputLabel>
                            <FilledInput
                                fullWidth
                                margin="normal"
                                id="filled-basic-pass"
                                value={password}
                                onChange={(event) => {setPassword(event.target.value);}}
                                type={showPassword ? 'text' : 'password'}   
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            <FormHelperText id="filled-weight-helper-text">Password</FormHelperText>
                        </FormControl>
                        <Box sx={{ py: 2 }}>
                            <LoadingButton
                                color="primary"
                                fullWidth
                                loading={isLoading}
                                variant="contained"
                                disabled={!isDisabled}
                                onClick={ () =>{ validateUser();}}
                            >
                                Sign In Now
                            </LoadingButton>
                        </Box>
                    </form>
                </Container>
            </Box>
        </>
    );
}
Login.propTypes = {
    authenticate: PropTypes.func.isRequired,
};
export default Login;
