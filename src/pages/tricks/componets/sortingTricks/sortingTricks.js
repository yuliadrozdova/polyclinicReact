import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

const SortingTricks = ({tricks, setTricks}) => {

    const [sortTricks, setSortTricks] = useState('none');
    const [sortDirect, setSortDirect] = useState('asc');

    const [classSort, setClassSort] = useState('hidden');


    useEffect(() => {                       //sort
        const copy = tricks.map(value => value);
        switch(sortTricks) {
            case 'none':
                axios.get('http://localhost:4000/allTricks').then(res => {
                    let arr = res.data.data;
                    arr.forEach(val => {
                        val.date = val.date.substring(0,10);
                    })
                    return  setTricks(arr);
                });
                return setClassSort('hidden');

            case 'name':
                setClassSort('visible');
                switch(sortDirect) {
                    case 'asc':
                        copy.sort((a,b) => a.namePatient.localeCompare(b.namePatient));
                        return setTricks(copy);
                    case 'desc':
                        copy.sort((a,b) => b.namePatient.localeCompare(a.namePatient));
                        return setTricks(copy);
                };

            case 'doctor':
                setClassSort('visible');
                switch(sortDirect) {
                    case 'asc':
                        copy.sort((a,b) => a.nameDoctor.localeCompare(b.nameDoctor));
                        return setTricks(copy);
                    case 'desc':
                        copy.sort((a,b) => b.nameDoctor.localeCompare(a.nameDoctor));
                        return setTricks(copy);
                };

            case 'date':
                setClassSort('visible');
                switch(sortDirect) {
                    case 'asc':
                        copy.sort((a,b) => a.date.localeCompare(b.date));
                        return setTricks(copy);
                    case 'desc':
                        copy.sort((a,b) => b.date.localeCompare(a.date));
                        return setTricks(copy);
                };

            default:
                return 'sort default';
        }
    },[sortTricks, sortDirect])

    return (
        <div className="sort">
            <div className="sort-wrap">
                <div>Сортировать по:</div>
                <div className="sort-input">
                    <select name="sort-list"
                            value={sortTricks}
                            onChange={(e) => setSortTricks(e.target.value)}>
                        <option value="none"></option>
                        <option value="name">Имя</option>
                        <option value="doctor">Врач</option>
                        <option value="date">Дата</option>
                    </select>
                </div>
            </div>

            <div className={classSort}>
                <div>Сортировать по:</div>
                <div className="sort-input">
                    <select name="sort-list"
                            value={sortDirect}
                            onChange={(e) => setSortDirect(e.target.value)}>
                        <option value="asc">По возрастанию</option>
                        <option value="desc">По убыванию</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

SortingTricks.propTypes = {
    tricks: PropTypes.object,
};

export default SortingTricks;