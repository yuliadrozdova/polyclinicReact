import React, {useState, useEffect} from 'react';
import axios from "axios";
import edit from '../../images/edit.svg';
import close from '../../images/delete.svg'
import '../../styles/tricks.css';
import '../../styles/modalUpdate.css';
import AddEditTrickModal from "./componets/addEditTrickModal/addEditTrickModal";

function Tricks() {
    const [tricks, setTricks] = useState([]);
    const [namePatient, setNamePatient] = useState('');
    const [nameDoctor, setNameDoctor] = useState('');
    const [date, setDate] = useState('');
    const [textComplaints, setTextComplaints] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [itemModal, setItemModal] = useState('');

    const handleClose = () => {
        setShowModal(false)
    }

    useEffect( async() =>{
        await axios.get('http://localhost:4000/allTricks').then(res => {
            console.log('000', res.data.data);

            let arr = res.data.data;
            arr.forEach(val => {
                val.date = val.date.substring(0,10);
            })
            setTricks(arr);

            // setTricks(res.data.data);
            console.log('console.log(setTricks(res.data.data)) ', setTricks(res.data.data));
        });

    }, []);


    const createNewTrick = async () => {
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
            copy.push(res.data.data);
            setTricks(copy);

        });
    }


    const editTrick = (item, index) => {
        console.log('12121 ', item);
        setNamePatient(item.namePatient);
    }

    const openModalUpdate = async (index) => {
        setItemModal(tricks[index]);
        setShowModal(true)
    }

    const deleteTrick = async (index) => {
        await axios.delete(`http://localhost:4000/deleteTrick/${tricks[index]._id}`).then(res => {
            const copy = tricks.map(value => value); //изменение копии стейта
            copy.splice(index, 1);
            setTricks(copy);
        });
    }

    const change = trick => (event) =>{
        trick.textPatientUpdate = event.target.value;
        return trick;
    }

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
                  {tricks.map((trick, index) =>
                          <div className="tricks-list-wrap" key={`trick-${index}`}>
                              <div className="text-trick-patient">{trick.namePatient}</div>
                              <div className="text-trick-doctor">{trick.nameDoctor}</div>
                              <div className="text-trick-date">{trick.date}</div>
                              <div className="text-trick-complaints">{trick.textComplaints}</div>

                              <div className="text-trick-btn">
                                  <img className="text-trick-btn-delete" src={close}
                                       onClick={() => deleteTrick(index)}/>
                                  <img className="text-trick-btn-update" src={edit}
                                  onClick={() => openModalUpdate(index) }/>
                              </div>
                          </div>
                      )
                  }
          </div>
      </main>
    <AddEditTrickModal item={itemModal}
                       onClose={handleClose}
                       isOpen={showModal}
                       newItem={editTrick}/>
</div>
  );
}

 export default Tricks;
