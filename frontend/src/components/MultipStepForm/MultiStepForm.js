import Multistep from "react-multistep";
import {
    useForm,
    FormProvider,
} from "react-hook-form";
import BasicInfo from "./Steps/BasicInfo";
import ContactInfo from "./Steps/ContactInfo";
import AddressInfo from "./Steps/AddressInfo";
import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {useHistory} from "react-router-dom";

const prevStyle = { background: '#33c3f0' }
const nextStyle = { background: '#33c3f0' }

const MultiStepForm = (props) => {
    const history = useHistory();
    const steps = [
        {name: 'StepOne', component: <BasicInfo/>},
        {name: 'StepTwo', component: <ContactInfo/>},
        {name: 'StepThree', component: <AddressInfo/>}
    ];
    const onSubmit = (data) => {
        if(data.firstName === '' || data.lastName === '' || data.nickName === ''
            || data.emailAddress === ''|| data.phoneNumber === ''|| data.alternatePhone === ''
            || data.address === ''|| data.country === ''|| data.city === '') {
            return;
        }
        Swal.fire({
            title: 'Please wait...',
            html: '',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });
        console.log(data);
        axios.post('http://localhost:5000/api/multistepform', data).then( resp => {
            Swal.close();
            Swal.fire('Saved!', '', 'success');
            history.push('/Home');
        })
            .catch(err => {
                console.log(err);
            });
        Swal.close()
    };
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
    const submit = (data) => {
        console.log('dummy');
    }
    return(
        <div className="container">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(submit)}>
                    <Multistep showNavigation={true} steps={steps} prevStyle={prevStyle} nextStyle={nextStyle} />
                    <input type="submit" value="Submit" onClick={methods.handleSubmit(onSubmit)}/>
                </form>
            </FormProvider>
        </div>
    );
}

export default MultiStepForm;