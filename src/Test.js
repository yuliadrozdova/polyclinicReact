import React from 'react';

function Test({collection}) {
// Создать компонент. В пропсах передать коллекцию с данными и отобразить на экране.
const {name, age, country} = collection
return(
    <div>
        <p>Имя: {name}</p>
        <p>Возраст: {age}</p>
        <p>Страна: {country}</p>
    </div>
)
}

export default Test;