const { Pool } = require('pg');
 
const queryString = `select distinct teachers.name as teacher, cohorts.name as cohort
from teachers
join assistance_requests on teacher_id = teachers.id
join students on student_id = students.id 
join cohorts on cohort_id = cohorts.id
where cohorts.name = '${process.argv[2] || 'JUL02'}' 
order by teacher;`

const cohortName = process.argv[2];
const limit = process.argv[3]|| 5;
const values = [`%${cohortName}%`, limit];

const pool = new Pool({
    user: 'vagrant',
    password: '123',
    host: 'localhost',
    database: 'bootcampx'
});

pool.query(queryString,values)
.then(res => {
    res.rows.forEach(row => {
        console.log(`${row.cohort}: ${row.teacher}`);
    })
})
.catch(err => console.error(`query error`, err.stack));