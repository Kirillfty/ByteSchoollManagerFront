<template>
    <header id="coach-header">
        <div class="buttons">
            <Button @click.prevent="GetLessonInDay(1)">Пн</Button>
            <Button @click.prevent="GetLessonInDay(2)">Вн</Button>
            <Button @click.prevent="GetLessonInDay(3)">Ср</Button>
            <Button @click.prevent="GetLessonInDay(4)">Чт</Button>
            <Button @click.prevent="GetLessonInDay(5)">Пт</Button>
            <Button @click.prevent="GetLessonInDay(6)">Сб</Button>
            <Button @click.prevent="GetLessonInDay(0)">Вс</Button>
        </div>
        <div class="lessons" v-for="index in lessonData" :key="index">
            <div class="lesson" @click.prevent = "goToLessonPage(index.lessonId)">
                <p id="name-lesson">{{index.name}}</p>
                <p id="time-lesson">{{DateConverter(index.time)}}</p>
                <p id="student-lesson">{{index.students}}</p>
            </div>
        </div>
    </header>
</template>
<script setup>
import { Button } from "@/components/ui/button"
import 'assets/css/style.css'
import axios from 'axios'
import {ref} from 'vue'
import { useRouter } from "vue-router"
let lessonData = ref('');
let router = useRouter();
function DateConverter(timeString){
const time = timeString.slice(0, 5);
console.log(time); // "14:45"
return time;
}
function goToLessonPage(id){
    
    router.push('/lesson-'+id);
}
function GetLessonInDay(NumberOfDay){
    
    lessonData.value = null;
    let accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    axios.get('https://localhost:7273/api/Course/get-lesson-in-day/'+NumberOfDay,{headers: { Authorization: "Bearer " + accessToken }})
    .then(function(res){
        lessonData.value = res.data;
        return lessonData;
    })
    
}
</script>
<style>
p{
    color:aliceblue;
}
.lessons{
     width: 100%;
    padding-top: 3%;
}
#student-lesson{
    background-color: aliceblue;
    padding:2%;
    color:black;
    border-radius: 10px;
}
.lesson {
   
    padding:3%;
    border-radius: 5px;
    background-color: rgb(22, 22, 22);
    display:flex;
    justify-content: space-around;
    align-items: center;
}
.buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    border-radius: 5px !important;
}

#coach-header {
    margin: 0 auto;
    margin-top: 2%;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: rgb(34, 34, 34);
    padding: 1%;
    border-radius: 5px;
}

Button {
    width: 10%;
}
</style>
