import Multistep from "react-multistep";
import {
    useForm,
    FormProvider,
} from "react-hook-form";
import BasicInfo from "./Steps/BasicInfo";
import ContactInfo from "./Steps/ContactInfo";
import AddressInfo from "./Steps/AddressInfo";
import React, {useEffect} from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {useHistory} from "react-router-dom";

const prevStyle = { background: '#33c3f0' }
const nextStyle = { background: '#33c3f0' }

const MultiStepForm = (props) => {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if(null == user || !user) {
            history.push('/');
        }
    },[])

    const methods = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            nickName: "",
            emailAddress: "",
            phoneNumber: "",
            alternatePhone: "",
            address: "",
            country: "",
            city: ""
        },
    });
    const steps = [
        {name: 'StepOne', component: <BasicInfo/>},
        {name: 'StepTwo', component: <ContactInfo/>},
        {name: 'StepThree', component: <AddressInfo/>}
    ];

    const isInValid = () => {
        const data = methods.control._formValues;
        return (data.firstName === '' || data.lastName === '' || data.nickName === ''
            || data.emailAddress === ''|| data.phoneNumber === ''|| data.alternatePhone === ''
            || data.address === ''|| data.country === ''|| data.city === '')
    };

    const onSubmit = (data) => {
        if(isInValid()) {
            Swal.fire('Fields Empty!', '', 'error');
            return;
        }
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        axios.post('http://localhost:5000/api/multistepform', data, config).then( resp => {
            Swal.fire('Saved!', '', 'success');
            history.push('/Home');
        }).catch(err => {
            Swal.fire('Error Occurred!', '', 'error');
            });
    };
    const submit = (data) => {
    }
    return(
        <div className="container card pb-5">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(submit)}>
                    <Multistep showNavigation={true} steps={steps} prevStyle={prevStyle} nextStyle={nextStyle} />
                    <input type="submit" value="Submit" onClick={methods.handleSubmit(onSubmit)} className="btn btn-lg btn-primary w-100 mt-5"/>
                </form>
            </FormProvider>
        </div>
    );
}

export default MultiStepForm;