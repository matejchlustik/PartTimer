import { View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AppText from '../../components/AppText';
import { globalStyles } from '../../styles/Global';
import Button from "../../components/Button";
import { postOffer } from '../../api/OfferRequests';


export default function AddOffer({ navigation }) {
    return (
        <Formik
            initialValues={{ title: "", description: "", pay: "", contact: "" }}
            onSubmit={async (values, { setFieldError, setSubmitting }) => {
                const data = await postOffer(values);
                if (data.message) {
                    setFieldError("contact", data.message);
                    setSubmitting(false);
                } else {
                    console.log(data);
                    navigation.navigate("HomeStack");
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
                return errors;
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <KeyboardAwareScrollView style={globalStyles.formContainer} keyboardShouldPersistTaps={'handled'}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>
                            <AppText style={globalStyles.formLabel}>Title</AppText>
                            <TextInput
                                style={globalStyles.input}
                                onChangeText={handleChange("title")}
                                onBlur={handleBlur('title')}
                                value={values.title}
                            />
                            <AppText style={globalStyles.formErrorText}>{touched.title && errors.title}</AppText>
                            <AppText style={globalStyles.formLabel}>Description</AppText>
                            <TextInput
                                style={{ ...globalStyles.input, height: 150, textAlignVertical: "top" }}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                multiline
                                value={values.description}
                            />
                            <AppText style={globalStyles.formErrorText}>{touched.description && errors.description}</AppText>
                            <AppText style={globalStyles.formLabel}>Pay</AppText>
                            <TextInput
                                style={globalStyles.input}
                                onChangeText={handleChange('pay')}
                                onBlur={handleBlur('pay')}
                                value={values.pay}
                            />
                            <AppText style={globalStyles.formErrorText}>{touched.pay && errors.pay}</AppText>
                            <AppText style={globalStyles.formLabel}>Contact</AppText>
                            <TextInput
                                style={globalStyles.input}
                                onChangeText={handleChange('contact')}
                                onBlur={handleBlur('contact')}
                                value={values.contact}
                            />
                            <AppText style={globalStyles.formErrorText}>{touched.contact && errors.contact}</AppText>
                            <Button onPress={handleSubmit} text="Submit" />
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAwareScrollView>
            )}
        </Formik>
    )
}