/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function NewsBuilder (props){
    const {handleChange, values, isBTNLoading, isDisabled,handleBtnOnClick} = props;

    return (
        <form
            autoComplete="off"
            noValidate
        >
            <Card>
                <CardHeader
                    title="Create new Post"
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
                                label="title"
                                name="title"
                                onChange={handleChange}
                                required
                                value={values.title}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <FormControl fullWidth>
                                <InputLabel id="color">Colors * </InputLabel>
                                <Select
                                    fullWidth
                                    id="RolSelector"
                                    labelId="color"
                                    label="color"
                                    name="color"
                                    onChange={handleChange}
                                    required
                                    value={values.color}
                                >   
                                    <MenuItem value={'default'}> Grey </MenuItem>
                                    <MenuItem value={'info'}> Cian </MenuItem>
                                    <MenuItem value={'error'}> Red </MenuItem>
                                    <MenuItem value={'success'}> Green </MenuItem>
                                    <MenuItem value={'warning'}> Yellow </MenuItem>
                                    <MenuItem value={'primary'}> Light blue </MenuItem>
                                    <MenuItem value={'secondary'}> Lila </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="text"
                                name="text"
                                required
                                variant="outlined"
                                onChange={handleChange}
                                value={values.text}
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
            Send
                    </LoadingButton>
                </Box>
            </Card>
        </form>
    );
}