import React, { useState } from 'react'
import { View, Button, TouchableOpacity, Text } from 'react-native'
import DatePicker from 'react-native-modern-datepicker'

const Calendars = () => {

    const [fromDate, setFromDate] = useState('')
    const [isFromDate, setIsFromDate] = useState(true)
    const [endDate, setEndDate] = useState('')
    const [isEndDate, setIsEndDate] = useState('')

    function RenderItem({ title, value }) {
        return (
            <View style={{ borderBottomWidth: 1, width: '100%', marginVertical: 8 }}>
                <Text>{title}</Text>
                <Text style={{ paddingVertical: 4 }}>{value}</Text>
            </View>
        )
    }


    return (

        <View>
            {/* <TouchableOpacity onPress={() => {
                setIsFromDate(true)
            }}>
                <Text style={{
                    fontSize: 17,
                    textAlign: 'center'
                }}>
                    Chọn:  {fromDate}
                </Text>
            </TouchableOpacity> */}
            {isFromDate && (
                <DatePicker
                    options={{
                        backgroundColor: '#090C08',
                        textHeaderColor: '#FFA25B',
                        textDefaultColor: '#F6E7C1',
                        selectedTextColor: '#fff',
                        mainColor: '#F4722B',
                        textSecondaryColor: '#D6C7A1',
                        borderColor: 'rgba(122, 146, 165, 0.1)',
                    }}
                    mode="calendar"
                    minuteInterval={30}
                    style={{ borderRadius: 10 }}
                    onSelectedChange={(date) => {
                        setFromDate(date)
                        setIsFromDate(false)
                    }}
                />
            )}
        </View>

    )
}

export default Calendars

