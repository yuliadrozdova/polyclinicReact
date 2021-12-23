import React, {useState, useEffect} from 'react';
import axios from "axios";
import edit from '../../images/edit.svg';
import close from '../../images/delete.svg'
import '../../styles/tricks.css';
import '../../styles/modalUpdate.css';
import AddEditTrickModal from "./componets/addEditTrickModal/addEditTrickModal";
import AddDeleteTrickModal from "./componets/addDeleteTrickModal/addDeleteTrickModal";

function Tricks() {
    const [tricks, setTricks] = useState([]);
    const [namePatient, setNamePatient] = useState('');
    const [nameDoctor, setNameDoctor] = useState('');
    const [date, setDate] = useState('');
    const [textComplaints, setTextComplaints] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [itemModal, setItemModal] = useState('');

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [indexModal, setIndexModal] = useState('');

    const [sortTricks, setSortTricks] = useState('none');
    const [sortDirect, setSortDirect] = useState('asc');

    useEffect( async() =>{
        await axios.get('http://localhost:4000/allTricks').then(res => {
            let arr = res.data.data;
            arr.forEach(val => {
                val.date = val.date.substring(0,10);
            })
            setTricks(arr);
        });

    }, []);



    const createNewTrick = async () => {
        // let currentDate = new Date().toLocaleDateString();
        // await currentDate.replaceAll(`/`, '-');
        // // const currentDate = new Date().toLocaleDateString();
        // // currentDate.replaceAll('/', '-'));
        //
        // console.log('currentDate ', currentDate);
        // console.log('date ', date);
        // if (date >= currentDate){

            axios.post('http://localhost:4000/createTrick', {
                namePatient,
                nameDoctor,
                date,
                textComplaints
            }).then(res => {
                setNamePatient('');
                setNameDoctor('');
                setDate('');
                setTextComplaints('');

                const copy = tricks.map(value => value); //изменение копии стейта
                let arr = res.data.data;
                arr.date = arr.date.substring(0,10);
                console.log('arr.date ', arr.date);
                copy.push(arr);
                setTricks(copy);
            });
    }


    const editTrick = (item) => {
        tricks.forEach(value => {
            if (value._id === item._id){
                value.namePatient = item.namePatient;
                value.nameDoctor = item.nameDoctor;
                value.date = item.date;
                value.textComplaints = item.textComplaints;
            }
        })
        setTricks(tricks);
    }

    const deleteTrick = (item) => {
        const copy = tricks.map(value => value); //изменение копии стейта
        copy.forEach((val, ind) => {
            if (item._id === val._id){
                copy.splice(ind, 1);
            }
        })
        setTricks(copy);
    }

    const openModalUpdate = async (index) => {
        setItemModal(tricks[index]);
        setShowModal(true);
    }

    const openModalDelete = async (index) => {
        setIndexModal(tricks[index]);
        setShowModalDelete(true);
    }
    const onCloseUpdate = () => {
        setShowModal(false)
    }

    const onCloseDelete = () => {
        setShowModalDelete(false)
    }

    const change = trick => (event) =>{
        trick.textPatientUpdate = event.target.value;
        return trick;
    }


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

            case 'name':
                switch(sortDirect) {
                    case 'asc':
                        copy.sort((a,b) => a.namePatient.localeCompare(b.namePatient));
                        return setTricks(copy);
                    case 'desc':
                        copy.sort((a,b) => b.namePatient.localeCompare(a.namePatient));
                        return setTricks(copy);
                };

            case 'doctor':
                switch(sortDirect) {
                    case 'asc':
                        copy.sort((a,b) => a.nameDoctor.localeCompare(b.nameDoctor));
                        return setTricks(copy);
                    case 'desc':
                        copy.sort((a,b) => b.nameDoctor.localeCompare(a.nameDoctor));
                        return setTricks(copy);
                };

            case 'date':
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



    console.log('LOOG', tricks);

  return (
<div className="tricks-page">
      <main>
          <div className="recording-wrapper">
              <div className="patient-name">
                  <p>Имя:</p>
                  <input type="text"
                         value={namePatient}
                         onChange={(e) => setNamePatient(e.target.value)}
                         required/>
              </div>

              {/*есть такая штука как <datalist>, может она подойдет лучше*/}
              <div className="doctor-name">
                  <p>Врач:</p>
                  <select name="doctor-list"
                          value={nameDoctor}
                          onChange={(e) => setNameDoctor(e.target.value)}>
                      <option>-</option>
                      <option value="Иванов Алексей Николаевич">Иванов Алексей Николаевич</option>
                      <option value="Остапова Валентина Александровна">Остапова Валентина Александровна</option>
                  </select>
              </div>

              <div className="date">
                  <p>Дата:</p>
                  <input type="date"
                         value={date}
                         onChange={(e) => setDate(e.target.value)}
                         required/>
              </div>

              <div className="complaints">
                  <p>Жалобы:</p>
                  <input type="text"
                         value={textComplaints}
                         onChange={(e) => setTextComplaints(e.target.value)}
                         required/>
              </div>

              <div className="recording-btn">
                 <button onClick={() => createNewTrick()}>Добавить</button>
              </div>
          </div>

          <div className="tricks-list">

              <div className="sort">
                  <div className="sort-wrap">
                      <div>Сортировать по:</div>
                      <div className="sort-input">
                          <select name="sort-list"
                                  value={sortTricks}
                                  onChange={(e) => setSortTricks(e.target.value)}>
                              <option value="none">None</option>
                              <option value="name">Имя</option>
                              <option value="doctor">Врач</option>
                              <option value="date">Дата</option>
                          </select>
                      </div>
                  </div>

                  <div className="sort-direction">
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

                  {tricks.map((trick, index) =>
                          <div className="tricks-list-wrap" key={`trick-${index}`}>
                              <div className="text-trick-patient">{trick.namePatient}</div>
                              <div className="text-trick-doctor">{trick.nameDoctor}</div>
                              <div className="text-trick-date">{trick.date}</div>
                              <div className="text-trick-complaints">{trick.textComplaints}</div>

                              <div className="text-trick-btn">
                                  <img className="text-trick-btn-delete" src={close}
                                       // onClick={() => deleteTrick(index)}/>
                                        onClick={() => openModalDelete(index)}/>
                                  <img className="text-trick-btn-update" src={edit}
                                  onClick={() => openModalUpdate(index) }/>
                              </div>
                          </div>
                      )
                  }
          </div>
      </main>
    <AddEditTrickModal item={itemModal}
                       onClose={onCloseUpdate}
                       isOpen={showModal}
                       newItem={editTrick}/>

    <AddDeleteTrickModal item={indexModal}
                       onClose={onCloseDelete}
                       isOpen={showModalDelete}
                       newTricks={deleteTrick}/>

    {/*<Modal className="modal-update" isOpen={showModalDelete} contentLabel="Example Modal" onRequestClose={onCloseDelete}*/}
    {/*       shouldCloseOnOverlayClick={true}>*/}
    {/*    <div className="modal-header">Удалить прием</div>*/}
    {/*       <div className="modal-delete-text">Вы действительно хотите удалить прием?</div>*/}

    {/*    <div className="modal-btn-footer">*/}
    {/*        <button className='modal-btn-close' onClick={onCloseDelete}>Cancel</button>*/}
    {/*        <button className='modal-btn-save' onClick={() => deleteTrick(index)}>Save</button>*/}
    {/*    </div>*/}



    {/*</Modal>*/}



</div>
  );
}

 export default Tricks;
