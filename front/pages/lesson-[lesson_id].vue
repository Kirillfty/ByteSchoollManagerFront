<template>
    <header id="coach-header">
        <div class="buttons">
            <Button>Готово</Button>
            <Button>Отмена</Button>
        </div>

        <div class="lessons" v-for="(item, index) in studentsData" :key="index">
            <div class="lessons" v-for="index2 in item.students" :key="index2">
                <div class="lesson">
                    <p id="time-lesson">{{ index2.name }}</p>
                    <div class="select">
                        <select name="" id="">
                            <option value="" selected disabled hidden>ДЗ</option>
                            <option value="">Сделал</option>
                            <option value="">Не сделал</option>
                            <option value="">Не задано</option>
                        </select>
                        <select name="" id="">
                            <option value="" selected disabled hidden>Был</option>
                            <option value="">Был</option>
                            <option value="">Не был</option>
                            <option value="">Онлайн</option>
                            <option value="">Уваж</option>
                            <option value="">Не уваж</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script setup>
import 'assets/css/style.css'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { ref, onMounted } from 'vue'
let { lesson_id } = useRoute().params;
let studentsData = ref('');


async function getLessonData() {

    axios.get('https://localhost:7273/api/Course/get-lesson-by-id/' + Number(lesson_id)).
        then(function (res) {
            studentsData.value = res.data;
            console.log(studentsData.students);
            return studentsData;
        })

}
onMounted(async () => {
    await getLessonData();
})
</script>

<style scoped> 
.select{
    display: flex;
    justify-content: space-between;
    width:50%;
}
Button {
    padding: 3%;
}

.buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

select {
    color: aliceblue;
}

p {
    color: aliceblue;
}

.lessons {
    width: 10cap;
    padding-top: 3%;
}

.lesson {
    padding: 1%;
    border-radius: 5px;
    background-color: rgb(22, 22, 22);
    margin-top: 5%;
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
</style>
