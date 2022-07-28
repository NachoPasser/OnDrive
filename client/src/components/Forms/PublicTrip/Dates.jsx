import { useEffect, useState } from "react";
import DtPicker from "react-calendar-datetime-picker";
import "react-calendar-datetime-picker/dist/index.css";
import styles from './Dates.module.css'
const formatValue = (value) => (value < 10 ? `0${value}` : value);

const formatStartDate = (year, month, day, hour, min) => {
  min = formatValue(Number(min));
  hour = formatValue(Number(hour));
  day = formatValue(Number(day));
  month = formatValue(Number(month));
  return `${year}-${month}-${day}T${hour}:${min}:00Z`;
};

const formatFinishDate = (date) => {
  const offset = date.getTimezoneOffset()
  date = new Date(date.getTime() - (offset*60*1000))
  return date.toISOString().replaceAll('-','/').replace('T',' ').slice(0,16)
}

const getTodayDate = () => {
  let today = new Date(Date.now())
  today = today.toLocaleString().replace(', ', '/').replace(':', '/').slice(0, 15).split('/')
  console.log(today)
  const [day, month, year, hour, minute] = today.map(e => Number(e))
  return {year, month, day, hour, minute}
}

export function Dates({duration, errors, setErrors, dateStart, setDateStart, dateFinish, setDateFinish}) {
  const [dateActual, setDateActual] = useState(null)
  const [minDate, setMinDate] = useState({})
  const [minutesDifference, setDifference] = useState(0)

    useEffect(() => {
      setDateActual(new Date(Date.now()));
      setMinDate(getTodayDate())
    }, [])

    useEffect(() => {
      console.log(dateActual)
      console.log(dateStart)
      if(!dateStart){
        setErrors({
          ...errors,
          startDate: 'Fecha de salida requerida.'
        })
      } 
      
      else if(dateActual.getTime() > dateStart.getTime()){
        
        setErrors({
          ...errors,
          startDate: 'La fecha introducida debe ser mayor a la actual.'
        })
      } 
      
      else{
        setErrors({
          ...errors,
          startDate: ''
        })
      }

    }, [dateStart])

    useEffect(() => {
      let minutesToAdd = 0
      if(duration){
        
        duration = duration.split(' ')
        if(duration.length === 2){ //minutos de distancia, formato: 13 m
          minutesToAdd = Number(duration[0])
        } else if(duration[1] === 'h'){ //horas de distancia, formato: 1 h 23 m
          let hoursToMinutes = duration[0] * 60
          minutesToAdd = Number(hoursToMinutes) + Number(duration[2])
        } else{ //dias de distancia, formato: 1 dia 3 horas
          let daysToMinutes = Number(duration[0] * 60 * 24)
          let hoursToMinutes = Number(duration[2] * 60)
          minutesToAdd = daysToMinutes + hoursToMinutes
        }
  
        if(dateStart === null){
          setDifference(minutesToAdd)
        } else{
          let dateFinish = new Date(dateStart.getTime() + minutesToAdd*60000)
          setDifference(minutesToAdd)
          setDateFinish(formatFinishDate(dateFinish))
        }
      }

    }, [duration])

    function handleSelect(e){
      
      if(e){
          let start = new Date(formatStartDate(e.year, e.month, e.day, e.hour, e.minute));
          start.setTime(start.getTime() + 3 * 60 * 60 * 1000);
          setDateStart(start)
          if(minutesDifference){
            let dateFinish = new Date(start.getTime() + minutesDifference*60000)
            setDateFinish(formatFinishDate(dateFinish))
          }
      }
    }

  return (
    <div>
      <div className={styles.LabelContainer}>
      <label className={styles.InputLabel} htmlFor="input-field">Fecha de salida</label>
      <label className={styles.InputLabel} htmlFor="input-field">Fecha de llegada</label>
      </div>
    <div className={styles.dateContainer}>
    <section className={styles.Container}>
      <DtPicker 
      autoClose={false} 
      showTimeInput={true} 
      placeholder="Ingresa la fecha de salida" 
      inputClass={styles.InputField} 
      onChange={(e) => handleSelect(e)} 
      isRequired={true}
      withTime={true}
      minDate={minDate}
      headerClass={styles.header} />
      <div>
      {errors.startDate ? <span className={styles.ErrorInputField}>{errors.startDate}</span> : null}
      </div>
    </section>
    <input className={styles.InputFieldLlegada} type="text" value={dateFinish}/>
    </div>
    </div>
  );
}