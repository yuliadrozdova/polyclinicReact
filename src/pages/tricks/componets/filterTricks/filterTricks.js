import React, {useState} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import open_filter from "../../../../images/open_filter.svg";
import close from "../../../../images/delete.svg";

const FilterTricks = ({setTricks}) => {
    const [startFilterTricks, setStartFilter] = useState('');
    const [endFilterTricks, setEndFilter] = useState('');
    const [classFilter, setClassFilter] = useState('hidden');
    const [classFilterMain, setClassFilterMain] = useState('visible');
    const [filterError1, setFilterError1] = useState(false);
    const [filterError2, setFilterError2] = useState(false);
    const [loading, setLoading] = useState(false);
    let newArray = [];
    const token = localStorage.getItem('token');
    /**
     * filter tricks
     */
    axios.get('http://localhost:4000/allTricks', { headers: { Authorization: `${token}` } }).then(res => {
        newArray = res?.data?.data;
        newArray?.forEach(val => {
            val.date = val.date.substring(0,10);
        })
    });

    const openFilter = () => {
        setClassFilter('visible');
        setClassFilterMain('hidden');
    }

    const closeFilter = async () => {
        setClassFilter('hidden');
        setClassFilterMain('visible');
        await axios.get('http://localhost:4000/allTricks', { headers: { Authorization: `${token}` } }).then(res => {
            let arr = res.data.data;
            arr.forEach(val => {
                val.date = val.date.substring(0,10);
            })
            setTricks(arr);
        });
    }

    const filterTricks = async (startDate, endDate) => {
        await setLoading(true);
        const copy = [];

        if (startFilterTricks === '' && endFilterTricks  === ''){
            setFilterError1(true);
            setFilterError2(false);
        } else  if(startFilterTricks > endFilterTricks) {
            setFilterError2(true);
            setFilterError1(false);
        }else if (startDate === '' && endDate !== ''){
            await newArray.forEach(value => {
                if (value.date <= endDate ){
                    copy.push(value);
                }
            })
            await setTricks(copy);
        } else if (startDate !== '' && endDate === ''){
            await newArray.forEach(value => {
                if (value.date >= startDate ){
                    copy.push(value);
                }
            })
            await setTricks(copy);
        } else if (startDate !== '' && endDate !== ''){
            await newArray.forEach(value => {
                if (value.date >= startDate && value.date <= endDate){
                    copy.push(value);
                }
            })
            await setTricks(copy);
        }
        await setLoading(false);
    }

    return (
        <div className="filter-main">
            {loading && <div className="backgroundLoading">
                <div className="loading"></div>
            </div>}

            <div className={classFilterMain}>
                <div className="filter-main-wrap">
                    <div>???????????????? ???????????? ???? ????????:</div>
                    <img className="open-filter-image" src={open_filter} alt="button open filter"
                         onClick={openFilter}/>
                </div>
            </div>

            <div className={classFilter}>
                <div className="filter">
                    <div className="end-filter">
                        <div className="start-filter-input">
                            <div className="date">
                                <p>??:</p>
                                <input type="date"
                                       value={startFilterTricks}
                                       onChange={(e) => setStartFilter(e.target.value)}
                                       required/>
                                {(filterError1) && <div style={{color: 'red', width: '150px'}}>?????? ???????? ???? ?????????? ???????? ??????????????</div>}
                                {(filterError2) && <div style={{color: 'red',  width: '150px'}}>???????? ???????????? ???????????? ???????? ???????????? ???????? ?????????? ????????????????????</div>}
                            </div>
                        </div>
                    </div>

                    <div className="end-filter">
                        <div className="end-filter-input">
                            <div className="date">
                                <p>????:</p>
                                <input type="date"
                                       value={endFilterTricks}
                                       onChange={(e) => setEndFilter(e.target.value)}
                                       required/>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => filterTricks(startFilterTricks, endFilterTricks)}>??????????????????????</button>
                    <img className="text-trick-btn-delete" src={close} alt="button delete trick"
                         onClick={closeFilter}/>
                </div>
            </div>
        </div>
    );
};

FilterTricks.propTypes = {
    tricks: PropTypes.object,
};

export default FilterTricks;