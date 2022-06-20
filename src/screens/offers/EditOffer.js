import { View, TextInput, TouchableWithoutFeedback, Keyboard, BackHandler } from 'react-native';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

import AppTextBold from '../../components/AppTextBold';
import { globalStyles } from '../../styles/Global';
import Button from "../../components/Button";
import { updateOffer } from '../../api/OfferRequests';

export default function EditOffer({ navigation, route }) {

    const listItem = route.params;

    useFocusEffect(
        useCallback(() => {
            navigation.closeDrawer();
            const onBackPress = () => {
                navigation.navigate("My Profile");
                return true;
            }
            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    )

    return (
        <Formik
            initialValues={{ title: listItem.title, description: listItem.description, pay: listItem.pay, contact: listItem.contact, location: listItem.location }}
            onSubmit={async (values, { setFieldError, setSubmitting }) => {
                const data = await updateOffer(values, listItem._id);
                if (data.message) {
                    setFieldError("contact", data.message);
                    setSubmitting(false);
                } else {
                    console.log(data);
                    navigation.navigate("My Profile");
                }
            }}
            validate={values => {
                const errors = {}
                if (!values.title) {
                    errors.title = "Required";
                }
                if (!values.description) {
                    errors.description = "Required";
                } else if (values.description.length < 20) {
                    errors.description = "Too short, please use at least 20 characters";
                }
                if (!values.pay) {
                    errors.pay = "Required";
                } else if (
                    !/^\d+(-\d+)?$/.test(values.pay)
                ) {
                    errors.pay = "Invalid format, use number or range with '-'";
                }
                if (!values.contact) {
                    errors.contact = "Required";
                }
                if (!values.location) {
                    errors.location = "Required"
                }
                return errors;
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <KeyboardAwareScrollView style={globalStyles.formContainer} keyboardShouldPersistTaps={'handled'}>
                    <StatusBar style="light" />
                    <AppTextBold style={globalStyles.formLabel}>Title</AppTextBold>
                    <TextInput
                        style={globalStyles.input}
                        onChangeText={handleChange("title")}
                        onBlur={handleBlur('title')}
                        value={values.title}
                    />
                    <AppTextBold style={globalStyles.formErrorText}>{touched.title && errors.title}</AppTextBold>
                    <AppTextBold style={globalStyles.formLabel}>Description</AppTextBold>
                    <TextInput
                        style={{ ...globalStyles.input, height: 150, textAlignVertical: "top" }}
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        multiline
                        value={values.description}
                    />
                    <AppTextBold style={globalStyles.formErrorText}>{touched.description && errors.description}</AppTextBold>
                    <AppTextBold style={globalStyles.formLabel}>Pay</AppTextBold>
                    <TextInput
                        style={globalStyles.input}
                        onChangeText={handleChange('pay')}
                        onBlur={handleBlur('pay')}
                        value={values.pay}
                    />
                    <AppTextBold style={globalStyles.formErrorText}>{touched.pay && errors.pay}</AppTextBold>
                    <AppTextBold style={globalStyles.formLabel}>Contact</AppTextBold>
                    <TextInput
                        style={globalStyles.input}
                        onChangeText={handleChange('contact')}
                        onBlur={handleBlur('contact')}
                        value={values.contact}
                    />
                    <AppTextBold style={globalStyles.formErrorText}>{touched.contact && errors.contact}</AppTextBold>
                    <AppTextBold style={globalStyles.formLabel}>Location</AppTextBold>
                    <TextInput
                        style={globalStyles.input}
                        onChangeText={handleChange('location')}
                        onBlur={handleBlur('location')}
                        value={values.location}
                    />
                    <AppTextBold style={globalStyles.formErrorText}>{touched.location && errors.location}</AppTextBold>
                    <Button onPress={handleSubmit} text="Submit" />
                </KeyboardAwareScrollView>
            )}
        </Formik>
    )
}
