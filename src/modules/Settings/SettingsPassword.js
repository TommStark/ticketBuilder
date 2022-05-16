import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, FilledInput, InputLabel, FormControl } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const SettingsPassword = () => {
    const [values, setValues] = useState({
        password : '',
        confirm  : ''
    });

    const [showPassword, setShowPassword]=useState(false);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    


    return (
        <form>
            <Card>
                <CardHeader
                    subheader="Update password"
                    title="Password"
                />
                <Divider />
                <CardContent>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="filled">Password</InputLabel>
                        <FilledInput
                            fullWidth
                            margin="normal"
                            name="password"
                            onChange={handleChange}
                            type={showPassword ? 'text' : 'password'}   
                            value={values.password}
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
                    </FormControl>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="filled">Confirm password</InputLabel>
                        <FilledInput
                            fullWidth
                            label="Confirm password"
                            margin="normal"
                            name="confirm"
                            onChange={handleChange}
                            type={showPassword ? 'text' : 'password'}   
                            value={values.confirm}
                            variant="outlined"
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
                        />
                    </FormControl>
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display        : 'flex',
                        justifyContent : 'flex-end',
                        p              : 2
                    }}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        disabled={true}
                    >
            Update
                    </Button>
                </Box>
            </Card>
        </form>
    );
};