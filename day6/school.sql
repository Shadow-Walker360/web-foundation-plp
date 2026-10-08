-- Day 6 Assignment: A School Database

-- Clean up existing tables so the script can be run again safely.
DROP TABLE IF EXISTS enrolments;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS students;

-- 1. Students table
CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

-- 2. Courses table
CREATE TABLE courses (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

-- 3. Enrolments table
-- Links students to courses and stores the student's grade.
-- The UNIQUE constraint prevents the same student from
-- enrolling in the same course more than once.
CREATE TABLE enrolments (
    id INTEGER PRIMARY KEY,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    grade TEXT,

    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),

    UNIQUE (student_id, course_id)
);

-- Sample students
INSERT INTO students (id, name, email) VALUES
(1, 'Alice Wanjiku', 'alice@example.com'),
(2, 'Brian Otieno', 'brian@example.com'),
(3, 'Carol Achieng', 'carol@example.com'),
(4, 'David Kamau', 'david@example.com');

-- Sample courses
INSERT INTO courses (id, name) VALUES
(1, 'Web Development'),
(2, 'Database Systems'),
(3, 'Computer Networks');

-- Sample enrolments
INSERT INTO enrolments (id, student_id, course_id, grade) VALUES
(1, 1, 1, 'A'),
(2, 1, 2, 'B'),
(3, 2, 1, 'B'),
(4, 2, 3, 'A'),
(5, 3, 2, 'A');

-- ---------------------------------------------------------
-- FIVE REQUIRED QUERIES
-- ---------------------------------------------------------

-- 1. All courses for one student, by student name.
SELECT
    students.name AS student,
    courses.name AS course
FROM students
JOIN enrolments
    ON students.id = enrolments.student_id
JOIN courses
    ON courses.id = enrolments.course_id
WHERE students.name = 'Alice Wanjiku';


-- 2. All students on one course.
SELECT
    students.name AS student,
    courses.name AS course
FROM students
JOIN enrolments
    ON students.id = enrolments.student_id
JOIN courses
    ON courses.id = enrolments.course_id
WHERE courses.name = 'Web Development';


-- 3. Number of students per course.
SELECT
    courses.name AS course,
    COUNT(enrolments.student_id) AS student_count
FROM courses
LEFT JOIN enrolments
    ON courses.id = enrolments.course_id
GROUP BY courses.id, courses.name;


-- 4. Students who have no enrolments.
SELECT
    students.name,
    students.email
FROM students
LEFT JOIN enrolments
    ON students.id = enrolments.student_id
WHERE enrolments.student_id IS NULL;


-- 5. Update one enrolment's grade.
UPDATE enrolments
SET grade = 'A'
WHERE student_id = 2
  AND course_id = 1;
