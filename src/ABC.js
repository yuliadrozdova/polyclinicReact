import React from 'react';
import Test from "./Test";

function ABC() {
// Напишите функцию, которая вернет только те элементы массива/коллекции соотвествующие условию

    function Func (arr) {
        let newArr = [];
        arr.forEach(value =>{
            if (typeof value !== "number"){
                newArr.push(value)
            }
        })
        return newArr;
    }

    let array1 = [1, true, -8, null, 39, 'hello'];
    const res1 = Func(array1);
    console.log(res1);

// Напишите функцию, которая вернет true, если вес элементы соответствуют условию?

    function Func (arr) {
        let a = true;
        arr.forEach(value =>{
            if (value <= 0){
                return a = false;
            }
        })
        return a;
    }

    let array = [1, 4, -8, 5, 39, 14];
    const res = Func(array);
    console.log(res);

// Создать компонент. В пропсах передать коллекцию с данными и отобразить на экране.
    const collection =
        [
            {
                name: "Ivan",
                age: 18,
                country: "Russia"
            },
            {
                name: "Alex",
                age: 30,
                country: "USA"
            },
            {
                name: "Petr",
                age: 23,
                country: "Ukraine"
            },
        ];


    return(
        <div>
            {
                collection.map((value, index) => <Test key={`col-${index}`} collection = {value} />)
            }

        </div>
    )
}

export default ABC;