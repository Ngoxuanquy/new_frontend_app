import React, { useState } from 'react';
import { View, Button } from 'react-native';
import Picker from '@react-native-picker/picker';

function App() {
    const [selectedDate, setSelectedDate] = useState(null);
    const daysInMonth = 31; // Số ngày trong tháng

    const handleDateChange = (day) => {
        setSelectedDate(day);
    };

    return (
        <View>
            <Picker
                selectedValue={selectedDate}
                onValueChange={handleDateChange}
            >
                <Picker.Item label="Chọn ngày" value={null} />
                {Array.from({ length: daysInMonth }, (_, index) => {
                    const day = index + 1;
                    return <Picker.Item key={day} label={day.toString()} value={day} />;
                })}
            </Picker>
            <Button
                title="Chọn"
                onPress={() => {
                    console.log('Ngày đã chọn:', selectedDate);
                }}
            />
        </View>
    );
}

export default App;
