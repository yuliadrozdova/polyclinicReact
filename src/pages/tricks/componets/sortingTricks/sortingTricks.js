import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

const SortingTricks = ({tricks, setTricks}) => {
    const [sortTricks, setSortTricks] = useState('none');
    const [sortDirect, setSortDirect] = useState('asc');
    const [classSort, setClassSort] = useState('hidden');
    const token = localStorage.getItem('token');
    /**
     * sort tricks
     */
    useEffect(() => {
        const copy = tricks.map(value => value);
        switch(sortTricks) {
            case 'none':
                axios.get('http://localhost:4000/allTricks', { headers: { Authorization: `${token}` } }).then(res => {
                    let arr = res?.data?.data;
                    arr?.forEach(val => {
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
                    default: console.warn('error sorting');
                }
                break;
            case 'doctor':
                setClassSort('visible');
                switch(sortDirect) {
                    case 'asc':
                        copy.sort((a,b) => a.nameDoctor.localeCompare(b.nameDoctor));
                        return setTricks(copy);
                    case 'desc':
                        copy.sort((a,b) => b.nameDoctor.localeCompare(a.nameDoctor));
                        return setTricks(copy);
                    default: console.warn('error sorting');
                }
                break;
            case 'date':
                setClassSort('visible');
                switch(sortDirect) {
                    case 'asc':
                        copy.sort((a,b) => a.date.localeCompare(b.date));
                        return setTricks(copy);
                    case 'desc':
                        copy.sort((a,b) => b.date.localeCompare(a.date));
                        return setTricks(copy);
                    default: console.warn('error sorting');
                }
                break;
            default:
                return 'sort default';
        }
    },[sortTricks, sortDirect])

    return (
        <div className="sort">
            <div className="sort-wrap">
                <div>?????????????????????? ????:</div>
                <div className="sort-input">
                    <select name="sort-list"
                            value={sortTricks}
                            onChange={(e) => setSortTricks(e.target.value)}>
                        <option value="none"></option>
                        <option value="name">??????</option>
                        <option value="doctor">????????</option>
                        <option value="date">????????</option>
                    </select>
                </div>
            </div>

            <div className={classSort}>
                <div>?????????????????????? ????:</div>
                <div className="sort-input">
                    <select name="sort-list"
                            value={sortDirect}
                            onChange={(e) => setSortDirect(e.target.value)}>
                        <option value="asc">???? ??????????????????????</option>
                        <option value="desc">???? ????????????????</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

SortingTricks.propTypes = {
    tricks: PropTypes.array,
};

export default SortingTricks;