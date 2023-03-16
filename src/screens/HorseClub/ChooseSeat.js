import React, { useCallback, useEffect, useState } from 'react';
import { Linking, Platform, StyleSheet, View } from 'react-native';

import * as regex from '../../constants/regex';
import { Block, Input, Image, Text, Checkbox } from '../../components';
import { Divider, TextInput, Button } from 'react-native-paper';

import { Button as PaperButton, Headline } from 'react-native-paper';
import { PaperSelect } from 'react-native-paper-select';



import GridRow from '../../components/GridRow';
import GridCol from '../../components/GridCol';

import styles from './styles';

export const selectValidator = (value) => {
    if (!value || value.length <= 0) {
        return 'Please select a value.';
    }

    return '';
};


const isAndroid = Platform.OS === 'android';

const ChooseSeat = ({ navigation, route }) => {
    const service = route.params;

    const [text, setText] = React.useState('');

    const [formValues, setFormValues] = useState({
        username: {
            value: '',
            isValid: false,
            message: 'Tài khoản/SDT không hợp lệ',
        },
        password: {
            value: '',
            isValid: false,
            message: 'Mật khẩu không hợp lệ',
        },
    });

    function handleChangeField() { }


    const handleNavigation = useCallback(
        (to, item) => {
            navigation.navigate(to, item);
        },
        [navigation],
    );

    const [gender, setGender] = useState({
        value: '',
        list: [
            { _id: '1', value: 'MALE' },
            { _id: '2', value: 'FEMALE' },
            { _id: '3', value: 'OTHERS' },
        ],
        selectedList: [],
        error: '',
    });

    const [colors, setColors] = useState({
        value: '',
        list: [
            { _id: '1', value: 'BLUE' },
            { _id: '2', value: 'RED' },
            { _id: '3', value: 'GREEN' },
            { _id: '4', value: 'YELLOW' },
            { _id: '5', value: 'BROWN' },
            { _id: '6', value: 'BLACK' },
            { _id: '7', value: 'WHITE' },
            { _id: '8', value: 'CYAN' },
        ],
        selectedList: [],
        error: '',
    });

    useEffect(() => {
        console.log(`Booking: `, service);
    }, []);

    return (
        <Block style={{ backgroundColor: 'white' }}>

            <Block style={{ padding: 24, marginTop: 24 }}>
                <View style={styles.title}></View>
                <Text center bold>THÔNG TIN ĐẶT LỊCH</Text>
                <View style={[styles.app]}>
                    <GridRow style={styles.textRow} >
                        <GridCol numRows={4} >
                            <Text bold black align='left'   >Dịch vụ: {service?.name}</Text>
                        </GridCol>
                    </GridRow>
                    <PaperSelect
                        label="Chọn lều"
                        value={gender.value}
                        onSelection={(value) => {
                            setGender({
                                ...gender,
                                value: value.text,
                                selectedList: value.selectedList,
                                error: '',
                            });
                        }}
                        selectAllText="Chọn tất cả"
                        searchPlaceholder="Tìm kiếm"
                        modalCloseButtonText="Đóng"
                        modalDoneButtonText="Hoàn tất"
                        arrayList={[...gender.list]}
                        selectedArrayList={gender.selectedList}
                        errorText={gender.error}
                        multiEnable={true}
                        dialogTitleStyle={{ color: 'black' }}
                        checkboxColor="black"
                        checkboxLabelStyle={{ color: 'black', fontWeight: '700' }}
                        textInputBackgroundColor="white"
                        textInputColor="black"
                        outlineColor="black"
                        theme={{
                            colors: {
                                placeholder: 'black'
                            }
                        }}
                    />
                    <PaperSelect
                        label="Chọn set ăn"
                        value={gender.value}
                        onSelection={(value) => {
                            setGender({
                                ...gender,
                                value: value.text,
                                selectedList: value.selectedList,
                                error: '',
                            });
                        }}
                        selectAllText="Chọn tất cả"
                        searchPlaceholder="Tìm kiếm"
                        modalCloseButtonText="Đóng"
                        modalDoneButtonText="Hoàn tất"
                        arrayList={[...gender.list]}
                        selectedArrayList={gender.selectedList}
                        errorText={gender.error}
                        multiEnable={true}
                        dialogTitleStyle={{ color: 'black' }}
                        checkboxColor="black"
                        checkboxLabelStyle={{ color: 'black', fontWeight: '700' }}
                        textInputBackgroundColor="white"
                        textInputColor="black"
                        outlineColor="black"
                        theme={{
                            colors: {
                                placeholder: 'black'
                            }
                        }}
                    />
                    <PaperSelect
                        label="Chọn bàn ăn"
                        value={gender.value}
                        onSelection={(value) => {
                            setGender({
                                ...gender,
                                value: value.text,
                                selectedList: value.selectedList,
                                error: '',
                            });
                        }}
                        selectAllText="Chọn tất cả"
                        searchPlaceholder="Tìm kiếm"
                        modalCloseButtonText="Đóng"
                        modalDoneButtonText="Hoàn tất"
                        arrayList={[...gender.list]}
                        selectedArrayList={gender.selectedList}
                        errorText={gender.error}
                        multiEnable={true}
                        dialogTitleStyle={{ color: 'black' }}
                        checkboxColor="black"
                        checkboxLabelStyle={{ color: 'black', fontWeight: '700' }}
                        textInputBackgroundColor="white"
                        textInputColor="black"
                        outlineColor="black"
                        theme={{
                            colors: {
                                placeholder: 'black'
                            }
                        }}
                    />
                </View>

            </Block>
            <Block style={styles.bookingWrapper}>
                <Button
                    textColor="white"
                    buttonColor="black"
                    style={[styles.bookingButton, styles.button]}
                    ma
                    icon="book"
                    mode="contained"
                    onPress={() => { 
                        navigation.goBack();
                    }}>
                    XÁC NHẬN
                </Button>
                <Button
                    textColor="white"
                    buttonColor="gray"
                    style={[styles.backButton, styles.button]}
                    ma
                    icon="keyboard-return"
                    mode="contained"
                    onPress={() => {
                        navigation.goBack();
                    }}>    
                    QUAY LẠI
                </Button>
            </Block>
        </Block>
    );0
};

export default ChooseSeat;
