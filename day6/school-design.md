# School Database Design

## Students

The `students` table stores information about each student. Each student has a unique ID, name and email address. The email is required and must be unique so that two students cannot use the same email address.

## Courses

The `courses` table stores the courses offered by the school. Each course has a unique ID and a required name.

## Enrolments

The `enrolments` table records which students are enrolled in which courses. It also stores the student's grade for that course. Each enrolment has its own ID and contains foreign keys referencing the student and course.

## Relationships

There is a one-to-many relationship between `students` and `enrolments`: one student can have many enrolments, while each enrolment belongs to one student.

There is also a one-to-many relationship between `courses` and `enrolments`: one course can have many enrolments, while each enrolment belongs to one course.

Together, students and courses have a many-to-many relationship because one student can take many courses and one course can have many students. The `enrolments` table is therefore needed as a join table to connect students and courses. It also provides a place to store information specific to the relationship, such as the student's grade.

## Index

I would add an index on `enrolments.student_id` because queries frequently need to find all courses belonging to a particular student. An index can make these lookups faster as the number of enrolments grows.

Example:

```sql
CREATE INDEX idx_enrolments_student_id
ON enrolments(student_id);
````

## SQL or NoSQL?

I would choose SQL for this school system because the data has clear relationships between students, courses and enrolments. The database needs primary keys, foreign keys, unique constraints and rules preventing duplicate enrolments. SQL databases are well suited to structured relational data and provide JOINs and aggregation functions such as `GROUP BY` and `COUNT()`, which are useful for reporting on courses and students. A NoSQL database could work, but it would be less natural for this strongly relational system.

```
