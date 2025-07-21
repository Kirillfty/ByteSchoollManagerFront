<template>
    <header id="coach-header">
        <!-- <div class="buttons" v-for="(day, index) in getCurrentWeekDaysCompact()" :key="index"> -->
            <div class="buttons" v-for="(date, index) in getCurrentWeekDates()" :key="index"> 
                <div>
                    <Button @click.prevent="GetLessonInDay(date.getDay())">{{ dayjs(date).format('D MMMM') }}</Button>
                </div>
            </div> 
        <!-- </div> -->
    </header>
    <div class="lessons" v-for="index in lessonData" :key="index">
        <div class="lesson" @click.prevent="goToLessonPage(index.lessonId)">
            <p id="name-lesson">{{ index.name }}</p>
            <p id="time-lesson">{{ getHoursMinutes(index.time) }}</p>
            <div class="student-lesson-cont">
                <p id="student-lesson">{{ index.students }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Button } from "@/components/ui/button"
import 'assets/css/style.css'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from "vue-router"

import dayjs from 'dayjs';
import 'dayjs/locale/ru'; // Подключаем русскую локаль
import weekday from 'dayjs/plugin/weekday'; // Для корректного определения недели

// Настраиваем day.js
dayjs.extend(weekday);
dayjs.locale('ru');

function getHoursMinutes(timeStr) {
    return timeStr.split(':').slice(0, 2).join(':');
}

function getCurrentWeekDates(startFromMonday = true) {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (воскресенье) - 6 (суббота)
    
    // Вычисляем смещение до понедельника
    const mondayOffset = startFromMonday 
        ? (dayOfWeek === 0 ? -6 : 1 - dayOfWeek)
        : -dayOfWeek;
    
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        weekDates.push(date);
    }
    
    return weekDates;
}

let lessonData = ref('');
let router = useRouter();



function goToLessonPage(id) {

    router.push('/lesson-' + id);
}
function GetLessonInDay(NumberOfDay) {

    lessonData.value = null;
    let accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    axios.get('https://localhost:7273/api/Course/get-lesson-in-day/' + NumberOfDay, { headers: { Authorization: "Bearer " + accessToken } })
        .then(function (res) {
            lessonData.value = res.data;
            return lessonData;
        })

}

</script>
<style scoped>
p {
    color: aliceblue;
}

.lessons {
    width: 90%;
    padding-top: 3%;
    margin: 0 auto;
}

.student-lesson-cont {
    background-color: aliceblue;
    border-radius: 50%;
    width: 4vh;
    height: 4vh;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#student-lesson {
    color: black;
    border-radius: 10px;
}

.lesson {

    padding: 3%;
    border-radius: 5px;
    background-color: rgb(22, 22, 22);
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.buttons {
    width: 100%;
    border-radius: 5px;
}

#coach-header {
    margin: 0 auto;
    margin-top: 2%;
    width: 90%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: rgb(34, 34, 34);
    padding: 1%;
    border-radius: 5px;
} 

Button {
    width: 80%;
}
@media (max-width:593px) {
    Button{
        font-size: 10px;
    }
}
@media (max-width:376px) {
    Button{
        font-size: 9px;
    }
    #coach-header{
        width:100%;
    }
}
</style>
