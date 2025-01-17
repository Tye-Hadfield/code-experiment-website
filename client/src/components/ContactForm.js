import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import api from "../helpers/api";
import ModalContext from "../contexts/ModalContext";

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { setModalIsOpen, setModalHeadingText, setModalContentText } =
        useContext(ModalContext);

    const onSubmit = (data, e) => {
        setIsSubmitting(true);
        JSON.stringify(data);
        api.post("/", {
            subject: "New Message From Website",
            name: data.name,
            email: data.email,
            text: data.question,
        })
            .then((res) => {
                if (res.data.status === "success") {
                    e.target.reset();
                    setModalHeadingText("Success!");
                    setModalContentText(
                        "You have successfully submitted the form."
                    );
                    setModalIsOpen(true);
                    setIsSubmitting(false);
                } else {
                    setModalHeadingText("UNSUCCESSFUL!");
                    setModalContentText(
                        "It seems like our mail server is down.  Please try again later"
                    );
                    setModalIsOpen(true);
                    setIsSubmitting(false);
                }
            })
            .catch(() => {
                setModalHeadingText("Error");
                setModalContentText("Server possibly down");
                setModalIsOpen(true);
                setIsSubmitting(false);
            });
    };

    return (
        <div className="contact-form-wrapper">
            <div className="contact-form-container container" id="Contact">
                <h1 className="contact-form-header-text">Contact Us</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="contact-form"
                >
                    <input
                        className="contact-form--input"
                        type="text"
                        placeholder="Name"
                        {...register("name", { required: "Required" })}
                    />
                    {errors.name && errors.name.type === "required" && (
                        <span className="contact-form-error">
                            This is required
                        </span>
                    )}

                    <input
                        className="contact-form--input"
                        type="email"
                        {...register("email", {
                            required: "Required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address",
                            },
                        })}
                        placeholder="Email"
                    />
                    {errors.name && errors.name.type === "required" && (
                        <span className="contact-form-error">
                            This is required
                        </span>
                    )}

                    <textarea
                        placeholder="Enter your question here."
                        className="contact-form--input"
                        {...register("question", { required: "Required" })}
                    />
                    {errors.name && errors.name.type === "required" && (
                        <span className="contact-form-error">
                            This is required
                        </span>
                    )}

                    {isSubmitting ? (
                        <button disabled className="contact-form-btn">
                            Submitting...
                        </button>
                    ) : (
                        <button type="submit" className="contact-form-btn">
                            Submit
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
