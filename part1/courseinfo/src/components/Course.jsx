import Header from "./Header"
import Content from "./Content"

const Course = ({course}) => (
    <>
        <Header course={course} />
        <Content course={course} />
        {/* <Total course={course} /> */}
     </>
)

export default Course