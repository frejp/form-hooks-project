import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";
import useInput from './hooks/useInput.js';
import useForm from './hooks/useForm.js';
import { validateEmail } from './helpers.js';

const Errors = ({errors}) => {
    return errors.map((error) => {
        return (
            <div>
                {error}
            </div>
        )
    });
};

const SuccessMessage = ({shouldRender}) => {
    return shouldRender ? <div class="alert alert-success fade show" role="alert">This is a success message!</div> : null;
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
        ]
    });

    return (
        <Wrapper>
            <form onSubmit={form.onSubmit} class="form-extra-style">
                <div class="form-group">
                    <label for="input-text" class="">Input Text</label>
                    <input name="input-text"
                           id="input-text"
                           placeholder="This is input text"
                           type="text" class="form-control"
                        {...bindInputTextField}
                    />
                    <Errors errors={inputTextFieldErrors} />
                </div>
                <div class="form-group">
                    <label for="email" class="">Email</label>
                    <input name="email" id="email"
                           placeholder="email"
                           type="text"
                           class="form-control"
                        {...bindEmailField} />
                    <Errors errors={emailFieldErrors} />
                </div>
                <div class="form-group">
                    <label for="exampleText" class="">Text Area</label>
                    <textarea name="text"
                              id="exampleText"
                              class="form-control"
                        {...bindTextAreaField} >
                    </textarea>
                    <Errors errors={textAreaFieldErrors} />
                </div>
                <SuccessMessage shouldRender={form.isFormValid} />
                <button class="btn btn-secondary">Submit</button>
            </form>
        </Wrapper>
    );
}

export default App;
