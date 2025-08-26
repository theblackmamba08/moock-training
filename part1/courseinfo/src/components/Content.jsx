import Part from './Part'

const Content = ({course}) => course.parts.map( c => <Part key={c.id} c={c} />)

export default Content