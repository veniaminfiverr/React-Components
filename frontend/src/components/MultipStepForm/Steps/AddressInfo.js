import React, { useState } from "react";
import {TextField,} from "@material-ui/core";
import {Controller, useFormContext} from "react-hook-form";

const AddressInfo = () => {
    const { control } = useFormContext();
    return (
        <>
            <Controller
                control={control}
                name="address"
                render={({ field }) => (
                    <TextField
                        id="address"
                        label="Address"
                        variant="outlined"
                        placeholder="Enter Your Address"
                        fullWidth
                        margin="normal"
                        {...field}
                    />
                )}
            />

            <Controller
                control={control}
                name="country"
                render={({ field }) => (
                    <TextField
                        id="country"
                        label="Country"
                        variant="outlined"
                        placeholder="Enter Your country"
                        fullWidth
                        margin="normal"
                        {...field}
                    />
                )}
            />
            <Controller
                control={control}
                name="city"
                render={({ field }) => (
                    <TextField
                        id="city"
                        label="City"
                        variant="outlined"
                        placeholder="Enter Your City"
                        fullWidth
                        margin="normal"
                        {...field}
                    />
                )}
            />
        </>
    );
};

export default AddressInfo;