import { View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Formik } from 'formik';
import { useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";

import AppText from '../../components/AppText';
import { globalStyles } from '../../styles/Global';
import Button from "../../components/Button";
import { registerUser } from '../../api/AuthRequests';
import { UserContext } from '../../contexts/UserContext';

export default function Register() {

    const { setUser } = useContext(UserContext);

    return (
        <Formik
            initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
            onSubmit={async (values, { setFieldError, setSubmitting }) => {
                const data = await registerUser(values);
                console.log(data);
                if (data.message) {
                    setFieldError("email", data.message);
                    setSubmitting(false);
                } else {
                    setUser(data.id);
                    await SecureStore.setItemAsync("token", data.token);
                }
            }}
            validate={values => {
                const errors = {}
                if (!values.username) {
                    errors.username = "Required";
                }
                if (!values.email) {
                    errors.email = "Required";
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = "Invalid email address";
                }
                if (!values.password) {
                    errors.password = "Required";
                }
                if (!values.confirmPassword) {
                    errors.confirmPassword = "Please confirm password";
                } else if (values.password !== values.confirmPassword) {
                    errors.confirmPassword = "Passwords do not match";
                }
                return errors;
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <KeyboardAwareScrollView style={globalStyles.formContainer} keyboardShouldPersistTaps={'handled'}>
                    <StatusBar style="light" />
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>
                            <AppText style={globalStyles.formLabel}>Username</AppText>
                            <TextInput
                                style={globalStyles.input}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                            <AppText style={globalStyles.formErrorText}>{touched.username && errors.username}</AppText>
                            <AppText style={globalStyles.formLabel}>Email</AppText>
                            <TextInput
                                style={globalStyles.input}
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType={'email-address'}
                            />
                            <AppText style={globalStyles.formErrorText}>{touched.email && errors.email}</AppText>
                            <AppText style={globalStyles.formLabel}>Password</AppText>
                            <TextInput
                                style={globalStyles.input}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={true}
                            />
                            <AppText style={globalStyles.formErrorText}>{touched.password && errors.password}</AppText>
                            <AppText style={globalStyles.formLabel}>Confirm password</AppText>
                            <TextInput
                                style={globalStyles.input}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                secureTextEntry={true}
                            />
                            <AppText style={globalStyles.formErrorText}>{touched.confirmPassword && errors.confirmPassword}</AppText>
                            <Button onPress={handleSubmit} text="Register" />
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAwareScrollView>
            )
            }
        </Formik >
    )
}
