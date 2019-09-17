import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import styled from "styled-components";
import useInput from './hooks/useInput.js';
import useForm from './hooks/useForm.js';
import { validateEmail } from './helpers.js';

const Errors = ({errors}) => {
    console.log(errors);
    return errors.map((error) => {
        return (
            <div>
                {error}
            </div>
        )
    });
};

const SuccessMessage = ({shouldRender}) => {
    return shouldRender ? <Alert color="success">
        This is a success alert — check it out!
    </Alert> : null;
};

export const Wrapper = styled.div`
    width: 80%;
    margin: auto;
    margin-top: 30px;
    @media (min-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh
        width: 100vw;
    }
`;

function App() {

    const form = useForm();

    const { bind:bindInputTextField, errors: inputTextFieldErrors } = useInput(form,'', {
        validations: [
            value =>
            value.length < 1 && "Must be at least one character"
        ]});

    const { bind:bindEmailField, errors: emailFieldErrors} = useInput(form,'',{
        validations: [
            value =>
            !validateEmail(value) && "Email is invalid"
        ]});

    const { bind:bindTextAreaField, errors: textAreaFieldErrors } = useInput(form,'', {
        validations: [
            value =>
            value.length < 21 && "Text must be at least 20 characters"
        ]});

    return (
        <Wrapper>
            <Form onSubmit={form.onSubmit} className="form-extra-style">
                <FormGroup>
                    <Label for="input-text">Input Text</Label>
                    <Input {...bindInputTextField} type="text" name="input-text" id="input-text" placeholder="This is input text" />
                    <Errors errors={inputTextFieldErrors} />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input {...bindEmailField} type="text" name="email" id="email" placeholder="email" />
                    <Errors errors={emailFieldErrors} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">Text Area</Label>
                    <Input {...bindTextAreaField}  type="textarea" name="text" id="exampleText" />
                    <Errors errors={textAreaFieldErrors} />
                </FormGroup>
                <SuccessMessage shouldRender={form.isFormValid} />
                <Button>Submit</Button>
            </Form>
        </Wrapper>
    );
}

export default App;
