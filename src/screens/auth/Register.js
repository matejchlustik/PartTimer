import { View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Formik } from 'formik';
import { useContext, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from '@react-navigation/native';

import AppTextBold from '../../components/AppTextBold';
import { globalStyles } from '../../styles/Global';
import Button from "../../components/Button";
import { registerUser } from '../../api/AuthRequests';
import { UserContext } from '../../contexts/UserContext';

export default function Register({ navigation }) {

    const { setUser } = useContext(UserContext);

    useFocusEffect(
        useCallback(() => {
            navigation.closeDrawer();
        }, [])
    )

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
                <KeyboardAwareScrollView style={globalStyles.formContainer} keyboardShouldPersistTaps={'handled'} >
                    <StatusBar style="light" />
                    <AppTextBold style={globalStyles.formLabel}>Username</AppTextBold>
                    <TextInput
                        style={globalStyles.input}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                        textContentType="username"
                        autoComplete="username"
                    />
                    <AppTextBold style={globalStyles.formErrorText}>{touched.username && errors.username}</AppTextBold>
                    <AppTextBold style={globalStyles.formLabel}>Email</AppTextBold>
                    <TextInput
                        style={globalStyles.input}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType={'email-address'}
                        textContentType="emailAddress"
                        autoComplete="email"
                    />
                    <AppTextBold style={globalStyles.formErrorText}>{touched.email && errors.email}</AppTextBold>
                    <AppTextBold style={globalStyles.formLabel}>Password</AppTextBold>
                    <TextInput
                        style={globalStyles.input}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={true}
                        textContentType="newPassword"
                        autoComplete="password-new"
                    />
                    <AppTextBold style={globalStyles.formErrorText}>{touched.password && errors.password}</AppTextBold>
                    <AppTextBold style={globalStyles.formLabel}>Confirm password</AppTextBold>
                    <TextInput
                        style={globalStyles.input}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        secureTextEntry={true}
                        textContentType="newPassword"
                        autoComplete="password-new"
                    />
                    <AppTextBold style={globalStyles.formErrorText}>{touched.confirmPassword && errors.confirmPassword}</AppTextBold>
                    <Button onPress={handleSubmit} text="Register" />
                </KeyboardAwareScrollView>
            )
            }
        </Formik >
    )
}
