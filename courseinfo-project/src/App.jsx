import Course from "./components/Course"

const App = () => {
	const courses = [
		{
			id : 1,
			name :'Half Stack application development',
			parts : [
				{
					name: 'Fundamentals of React',
					exercises: 10,
					id : 1
				}
				,{
					name: 'Using props to pass data',
					exercises: 7,
					id : 2
				}
				,{
					name: 'State of a component',
					exercises: 14,
					id : 3
				}
				,{
					name: 'Redux',
					exercises: 11,
					id : 4
				}
				,{
					name: 'GraphQL',
					exercises: 8,
					id : 5
				}
			]
		},
		{
			id : 2,
			name :'Full Stack application development',
			parts : [
				{
					name: 'Fundamentals of React',
					exercises: 10,
					id : 1
				}
				,{
					name: 'Reusing props to pass data',
					exercises: 7,
					id : 2
				}
				,{
					name: 'Refactoring a component',
					exercises: 14,
					id : 3
				}
				,{
					name: 'Deployment',
					exercises: 11,
					id : 4
				}
				,{
					name: 'NodeJS',
					exercises: 8,
					id : 5
				}
			]
		} 
	]

	return courses.map( c => <Course key={c.id} course={c} /> )
}

export default App
