/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import * as BackendAPI from  '../../services/BackendAPI';
import LoadingButton from '@mui/lab/LoadingButton';
import { ChangeSnackbar } from '../AppSlice';


export function ProfileDetails (props){
    const user = useSelector((state)=> state.user.data);
    const [isBTNLoading, setIsBTNLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [values, setValues] = useState({});
    const dispatch = useDispatch();

    
    useEffect(()=>{
        user &&  setValues(user);
    },[user]);

    const handleChange = (event) => {
        setIsDisabled(false);
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleBtnOnClick = () => {
        setIsBTNLoading(true);
        const requestParams = {
            body: values
        };

        delete requestParams.body.jwToken;
        delete requestParams.body._id;
        delete requestParams.body.img;
        delete requestParams.body.__v;

        BackendAPI.modifyUserInfo(requestParams)
            .then( res => {
                setIsBTNLoading(false);
                setIsDisabled(true);
                setValues(res.data);
                dispatch(ChangeSnackbar({state: true,txt: ' The update was successfully!'}));
            })
            .catch(
                () =>  {
                    setIsBTNLoading(false);
                    setIsDisabled(true);
                    dispatch(ChangeSnackbar({state: true,txt: ' upps something happend!',severity: 'error'}));
                });
    };

    return (
        <form
            autoComplete="off"
            noValidate
            {...props}
        >
            <Card>
                <CardHeader
                    subheader="The information can be edited"
                    title="Profile"
                />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Please specify the first name"
                                label="name"
                                name="name"
                                onChange={handleChange}
                                required
                                value={values.name}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Last name"
                                name="lastName"
                                onChange={handleChange}
                                required
                                value={values.lastName}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                onChange={handleChange}
                                required
                                value={values.email}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phone"
                                onChange={handleChange}
                                type="number"
                                value={values.phone}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Country"
                                name="country"
                                onChange={handleChange}
                                required
                                value={values.country}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="state"
                                name="state_code"
                                onChange={handleChange}
                                required
                                value={values.state_code}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display        : 'flex',
                        justifyContent : 'flex-end',
                        p              : 2
                    }}
                >
                    <LoadingButton
                        color="primary"
                        variant="contained"
                        onClick={() => handleBtnOnClick()}
                        loading={isBTNLoading}
                        disabled={isDisabled}
                    >
            Save details
                    </LoadingButton>
                </Box>
            </Card>
        </form>
    );
}