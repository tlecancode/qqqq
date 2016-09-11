import React from 'react'

export default class Q extends React.Component {
  componentDidMount() {
    const {actions} = this.props
    actions.initQ()
  }

  render() {
    const bgColor = this.props.bg_color || '#2c3e50'
    const {department, queue} = this.props
    return (
      <div className='qPage'>
        <QHeader bgColor={bgColor} department={department.name} name={department.doctor_name} entryposition={department.doctor_position}/>
        <QBody bgColor={bgColor} q={queue}/>
      </div>
    )
  }
}

export const QHeader = ({department, name, entryposition, bgColor}) => {
  return (
    <div style={{backgroundColor: bgColor}} className='qHeader'>
      <DepartmentName department={department}/>
    </div>
  )
}

export const DepartmentName = ({department}) => {
  if (department) {
    return (
      <h1 style={{fontSize: '100px'}}>{department.replace('PK2-', '')}</h1>
    )
  }
  return <div></div>
}

export const UserName = ({name}) => {
  if (name) {
    return (
      <h2 style={{fontSize: '45px'}}>{name}</h2>
    )
  }
  return <div></div>
}

export const Position = ({position}) => {
  if (position) {
    return (
      <h2 style={{fontSize: '35px'}}>{position}</h2>
    )
  }
  return <div></div>
}

export const QBody = ({q, bgColor}) => {
  if(q.length){
    return (
      <div className='qBody'>
        <ul className={`list-unstyled $'qList'`}>
          {q.map((q, index) => (
            <QItem qNumber={q.queue_number} qName={q.patient_name} bgColor={bgColor} key={index}/>
          ))}
        </ul>
      </div>
    )
  }
  return <div className='qBody'></div>
}

export const QItem = ({qNumber, qName, bgColor}) => {
  return (
    <li className='qItem' style={{color: bgColor}}>
      <div style={{backgroundColor: bgColor}} className='qNumber'>{qNumber}</div>
      <div className='qNameContainer'>
        <h4 className='qName'>{qName}</h4>
      </div>
    </li>
  )
}
