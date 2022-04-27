import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import * as BackendAPI from  '../services/BackendAPI';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import gtag, { install } from 'ga-gtag';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
install('G-PCTGS2X60L');
function Login({authenticate}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled , setIsDisabled] = useState(true);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [authError, setAuthError] = useState(false);
    const navigate = useNavigate();
    const isUserAuth  = JSON.parse(localStorage.getItem('user'));

    useEffect(()=>{
        isUserAuth && navigate('factory', {replace: true});
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
                Cookies.set('token', author.jwToken, { expires: 1 });
                Cookies.set('author', author.name, { expires: 1 });
                gtag('event', 'login', { 'Author': `${email}` });
                authenticate();
                resetInput();
                navigate('factory', {replace: true});
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

    return (
        <ThemeProvider theme={darkTheme}>
            <header className="App-header">
                <Box
                    sx={{
                        width           : 400,
                        maxWidth        : '90%',
                        backgroundColor : '#a6aeb791',
                        padding         : '30px'
                    }}>
                    <h1 className="App" > login  </h1>
                    <p aria-live='assertive'> 
                        {authError
                            ? 'bad credentials <-----urgente un diseñador xD'
                            :null
                        }
                    </p>
                    <TextField
                        id="filled-basic"
                        label="email"
                        variant="filled"
                        value={email}
                        onChange={(event) => {setEmail(event.target.value);}}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        id="filled-basic"
                        label="password"
                        variant="filled"
                        value={password}
                        onChange={(event) => {setPassword(event.target.value);}}
                        fullWidth
                        type='password'
                        margin="normal"
                    />

                    <div className="App">
                        <LoadingButton 
                            loading={isLoading}
                            variant="contained"
                            disabled={!isDisabled}
                            onClick={ () =>{ validateUser();}}
                        > Log In
                        </LoadingButton>
                    </div>
            
                </Box>
            </header>
        </ThemeProvider>
    );
}
Login.propTypes = {
    authenticate: PropTypes.func.isRequired,
};
export default Login;
