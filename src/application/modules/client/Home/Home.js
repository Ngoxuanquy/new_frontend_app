import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
import { View, Text, Button, TouchableOpacity, Dimensions } from 'react-native'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
const Home = ({ navigation }) => {

    const [tuans, setTuan] = useState([])

    function getFormattedDate(date) {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        return day + '/' + month + '/' + year;
    }

    useEffect(() => {
        var today = new Date();

        // Tính toán ngày đầu tiên trong tuần
        var firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));

        // console.log(getFormattedDate(firstDayOfWeek))


        // Khai báo một mảng để lưu trữ các ngày trong tuần
        var daysOfWeek = [];

        // Thêm các ngày trong tuần vào mảng
        for (var i = 0; i < 6; i++) {
            var day = new Date(firstDayOfWeek);
            day.setDate(firstDayOfWeek.getDate() + i);
            daysOfWeek.push(getFormattedDate(day));
        }

        // Hiển thị các ngày trong tuần
        setTuan(daysOfWeek)
    }, [])


    const chartConfig = {
        backgroundGradientFrom: "white",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "white",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `#367fa9`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const data = {
        labels: tuans,
        datasets: [
            {
                data: [2, 4, 8, 0, 9, 3]
            }
        ]
    };



    return (
        <ScrollView style={{ paddingHorizontal: 12 }}>
            <View>
                <Text style={{ fontSize: 18, paddingVertical: 8 }}>Chấm công hôm nay</Text>
                <View>
                    <Text style={{ paddingVertical: 12, borderWidth: 0.4, paddingLeft: 8 }}>
                        Sáng vào:
                    </Text>
                    <Text style={{ paddingVertical: 12, borderWidth: 0.4, paddingLeft: 8 }}>
                        Sáng ra:
                    </Text>
                    <Text style={{ paddingVertical: 12, borderWidth: 0.4, paddingLeft: 8 }}>
                        Chiều vào:
                    </Text>
                    <Text style={{ paddingVertical: 12, borderWidth: 0.4, paddingLeft: 8 }}>
                        Chiều ra:
                    </Text>
                </View>
            </View>

            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 18, textAlign: 'center' }}>Biểu đồ số đơn hằng ngày</Text>
                <BarChart
                    style={{
                        // width: 400,
                        // height: 400
                        marginTop: 30
                    }}
                    data={data}
                    width={Dimensions.get('window').width - 20}
                    height={300}
                    yAxisLabel="Đơn"
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                />
            </View>

            <View>
                <TouchableOpacity
                    onPress={() => navigation.replace('Login')}
                >
                    <Text>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Home