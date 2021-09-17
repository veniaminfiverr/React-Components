import React, { useState } from "react";
import {TextField,} from "@material-ui/core";
import {Controller, useFormContext} from "react-hook-form";

const ContactInfo = () => {
    const { control } = useFormContext();
    return (
        <>
            <Controller
                control={control}
                name="emailAddress"
                render={({ field }) => (
                    <TextField
                        id="email"
                        label="E-mail"
                        variant="outlined"
                        placeholder="Enter Your E-mail Address"
                        fullWidth
                        margin="normal"
                        {...field}
                    />
                )}
            />

            <Controller
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                    <TextField
                        type="number"
                        id="phone-number"
                        label="Phone Number"
                        variant="outlined"
                        placeholder="Enter Your Phone Number"
                        fullWidth
                        margin="normal"
                        {...field}
                    />
                )}
            />
            <Controller
                control={control}
                name="alternatePhone"
                render={({ field }) => (
                    <TextField
                        type="number"
                        id="alternate-phone"
                        label="Alternate Phone"
                        variant="outlined"
                        placeholder="Enter Your Alternate Phone"
                        fullWidth
                        margin="normal"
                        {...field}
                    />
                )}
            />
        </>
    );
};

export default ContactInfo;