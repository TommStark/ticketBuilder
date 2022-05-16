/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Skeleton, Typography } from '@mui/material';
import { ProfileAccount } from './ProfileAccount';
import { ProfileDetails } from './ProfileDetails';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as BackendAPI from  '../../services/BackendAPI';
import { ChangeSnackbar } from '../AppSlice';
import { hasInvalidChars } from '../Utils';


function Account (){
    const user = useSelector((state)=> state.user?.data);
    const [isLoading, setIsLoading]=useState(true);
    const dispatch = useDispatch();
    const [isBTNLoading, setIsBTNLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [values, setValues] = useState({});
    
    const [invalidFields, setInvalidFields] = useState([]);
    
    const checkInvalidField = (field) => invalidFields.indexOf(field) !== -1;

    useEffect(()=>{
        if(user){
            setValues(user);
            setIsLoading(false);
        }
        return function () {
            setInvalidFields([]);
        };
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
        const invalidFieldsValues = hasInvalidChars(values);
        if (!invalidFieldsValues.length) {
            setInvalidFields([]);
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
        }
        setInvalidFields(invalidFieldsValues);
        setIsBTNLoading(false);
    };

    return(
        <>
            <Box
                component="main"
                sx={{
                    flexGrow : 1,
                    py       : 1
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        sx={{ mb: 3 }}
                        variant="h4"
                    >
                        {
                            isLoading
                                ? <Skeleton width={'30%'} />
                                :
                                'Account'
                        }
                    </Typography>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xs={12}
                        >
                            {
                                isLoading
                                    ? <Skeleton variant="rectangular" height={280} />
                                    :
                                    <ProfileAccount
                                        user={user}
                                    />
                            }
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            {
                                isLoading
                                    ? <Skeleton variant="rectangular" height={500} />
                                    :
                                    <ProfileDetails
                                        values={values}
                                        handleBtnOnClick={handleBtnOnClick}
                                        handleChange={handleChange}
                                        isBTNLoading={isBTNLoading}
                                        isDisabled={isDisabled}
                                        checkInvalidField={checkInvalidField}
                                    />
                            }
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

export default Account;