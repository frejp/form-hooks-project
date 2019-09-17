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
    return shouldRender ? <div className="alert alert-success fade show" role="alert">This is a success message!</div> : null;
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
            <form onSubmit={form.onSubmit} className="form-extra-style">
                <div className="form-group">
                    <label htmlFor="input-text" className="">Input Text</label>
                    <input name="input-text"
                           id="input-text"
                           placeholder="This is input text"
                           type="text" className="form-control"
                        {...bindInputTextField}
                    />
                    <Errors errors={inputTextFieldErrors} />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="">Email</label>
                    <input name="email" id="email"
                           placeholder="email"
                           type="text"
                           className="form-control"
                        {...bindEmailField} />
                    <Errors errors={emailFieldErrors} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleText" className="">Text Area</label>
                    <textarea name="text"
                              id="exampleText"
                              className="form-control"
                        {...bindTextAreaField} >
                    </textarea>
                    <Errors errors={textAreaFieldErrors} />
                </div>
                <SuccessMessage shouldRender={form.isFormValid} />
                <button className="btn btn-secondary">Submit</button>
            </form>
        </Wrapper>
    );
}

export default App;
