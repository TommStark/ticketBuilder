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

export function ProfileDetails (props){
    const { isBTNLoading, isDisabled, values, handleChange, handleBtnOnClick} = props;
    const userId = useSelector((state)=> state.user.data._id);
    return (
        <form
            autoComplete="off"
            noValidate
        >
            <Card>
                <CardHeader
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
                                helperText="Please specify your discord ID"
                                placeholder=' eg: 801452179177078814'
                                label="discord ID"
                                name="discordId"
                                onChange={handleChange}
                                required
                                value={values.discordId}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <FormControl fullWidth>
                                <InputLabel id="rol">Rol * </InputLabel>
                                <Select
                                    fullWidth
                                    id="RolSelector"
                                    labelId="rol"
                                    label="rol"
                                    name="rol"
                                    onChange={handleChange}
                                    required
                                    value={values.rol}
                                >   
                                    <MenuItem value={'Developer'}> Developer </MenuItem>
                                    <MenuItem value={'Casi Hacker'}> Casi Hacker </MenuItem>
                                    {
                                        (userId  === '6267170f8df19de071b278fc' || userId === '626b22d24d0ffea24d6ccc2e')
                                            ? <MenuItem value={'Project lider'}>Project lider</MenuItem>
                                            : null
                                    }
                                </Select>
                            </FormControl>
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