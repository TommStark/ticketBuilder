/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Skeleton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as BackendAPI from  '../../services/BackendAPI';
import { NewsBuilder } from './NewsBuilder';
import { Newsprev } from './NewsPrev';
import { ChangeSnackbar } from '../AppSlice';
import { NewsVersion } from './NewsVersion';



function NewsContainer (){
    const news = useSelector((state)=> state.app.news);
    const [isLoading, setIsLoading]=useState(true);
    const dispatch = useDispatch();
    const [isBTNLoading, setIsBTNLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [values, setValues] = useState({});
    const [newVersionTxt, setNewVersionTxt] = useState('');
    console.log('newVersionTxt: ', newVersionTxt);

    useEffect(()=>{
        if(news){
            setIsLoading(false);
            setValues({
                title : 'title',
                text  : ' lorem ipmskd bla bla bla bla... ',
                color : 'default'
            });
        }
    },[news]);

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
            newsId : news._id,
            body   : values
        };
        
        BackendAPI.createPost(requestParams)
            .then( res => {
                setIsBTNLoading(false);
                setIsDisabled(true);
                setValues(res.data);
                dispatch(ChangeSnackbar({state: true,txt: ' The post was successfully created!'}));
            })
            .catch(
                () =>  {
                    setIsBTNLoading(false);
                    setIsDisabled(true);
                    dispatch(ChangeSnackbar({state: true,txt: ' upps something happend!',severity: 'error'}));
                });
        setIsBTNLoading(false);
    };
    
    const handleBtnVersionOnClick = () => {
        setIsBTNLoading(true);

        const requestParams = {
            id      : news._id,
            version : newVersionTxt
        };
        
        BackendAPI.sendVersion(requestParams)
            .then( () => {
                setIsBTNLoading(false);
                setIsDisabled(true);
                setNewVersionTxt('');
                dispatch(ChangeSnackbar({state: true,txt: ' The post was successfully created!'}));
            })
            .catch(
                () =>  {
                    setIsBTNLoading(false);
                    setIsDisabled(true);
                    dispatch(ChangeSnackbar({state: true,txt: ' upps something happend!',severity: 'error'}));
                });
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
                                'News Builder'
                        }
                    </Typography>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            {
                                isLoading
                                    ? <Skeleton variant="rectangular" height={500} />
                                    : <NewsBuilder
                                        values={values}
                                        handleChange={handleChange}
                                        handleBtnOnClick={handleBtnOnClick}
                                        isBTNLoading={isBTNLoading}
                                        isDisabled={isDisabled}

                                    />
                            }

                        </Grid>
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xs={12}
                        >
                            {
                                isLoading
                                    ? <Skeleton variant="rectangular" height={280} />
                                    : <Newsprev
                                        item={values}
                                    />
                            }
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={8}
                            xs={12}
                        >
                            {
                                isLoading
                                    ? <Skeleton variant="rectangular" height={100} />
                                    : <NewsVersion
                                        version={news.version}
                                        NewsVersion={newVersionTxt}
                                        setNewVersionTxt={setNewVersionTxt}
                                        handleBtnVersionOnClick={handleBtnVersionOnClick}
                                        isDisabled={isDisabled}
                                        setIsDisabled={setIsDisabled}
                                    />
                            }
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

export default NewsContainer;