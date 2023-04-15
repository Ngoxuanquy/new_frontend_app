import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

const NgayTrongTuan = [
    { id: 1, ngay: 'Thứ 2', sang: true, trua: false, toi: false },
    { id: 2, ngay: 'Thứ 3', sang: false, trua: false, toi: false },
    // Các ngày và buổi khác tương tự
];

const Daily_Bonus = () => {
    const [selectedLich, setSelectedLich] = useState([]);

    const handleCheckboxChange = (ngayId, buoi) => {
        const index = selectedLich.findIndex(
            (item) => item.ngayId === ngayId && item.buoi === buoi
        );
        if (index > -1) {
            setSelectedLich(
                selectedLich.filter(
                    (item) => !(item.ngayId === ngayId && item.buoi === buoi)
                )
            );
            console.log('Ngày ' + ngayId + ', buổi ' + buoi + ' đã bị hủy đăng ký.');
            // Thực hiện các hành động khác khi check box được bỏ chọn
        } else {
            setSelectedLich([...selectedLich, { ngayId, buoi }]);
            console.log('Ngày ' + ngayId + ', buổi ' + buoi + ' đã được đăng ký.');
            // Thực hiện các hành động khác khi check box được chọn
        }
    };

    console.log(selectedLich)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng ký lịch part-time</Text>
            {NgayTrongTuan.map((ngay) => (
                <View key={ngay.id} style={styles.ngayContainer}>
                    <Text style={styles.ngayTitle}>{ngay.ngay}</Text>
                    <View style={styles.buoiContainer}>
                        <CheckBox
                            title="Buổi sáng"
                            checked={ngay.sang}
                            onPress={() => handleCheckboxChange(ngay.id, 'sang')}
                        />
                        <CheckBox
                            title="Buổi trưa"
                            checked={ngay.trua}
                            onPress={() => handleCheckboxChange(ngay.id, 'trua')}
                        />
                        <CheckBox
                            title="Buổi tối"
                            checked={ngay.toi}
                            onPress={() => handleCheckboxChange(ngay.id, 'toi')}
                        />
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    ngayContainer: {
        marginBottom: 16,
    },
});

export default Daily_Bonus;