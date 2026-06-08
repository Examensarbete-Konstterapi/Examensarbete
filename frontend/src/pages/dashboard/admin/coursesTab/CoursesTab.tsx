import RegularButton from "../../../../components/buttons/regularButton/RegularButton";
import "./coursesTab.css";
import { useState } from "react";

export interface Course {
  id: string;
  title: string;
  description: string;
  dates: string[];
  time: string;
  spots: number;
  spotsBooked: number;
  price: number;
  category: string;
}

export function CoursesTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      title: "Introduktion till konstterapi",
      description: "Grundkurs i konstterapi",
      dates: ["2026-06-10"],
      time: "18:00",
      spots: 8,
      spotsBooked: 5,
      price: 2800,
      category: "Individuell",
    },
    {
      id: "2",
      title: "Föräldrar till kriminella",
      description: "Möt andra föräldrar till kriminella och måla",
      dates: ["2026-07-11"],
      time: "20:00",
      spots: 10,
      spotsBooked: 6,
      price: 800,
      category: "Grupp",
    },
  ]);

  function handleDeleteCourse(courseId: string) {
    const confirmed = window.confirm(
      "Är du säker på att du vill ta bort kursen?",
    );

    if (!confirmed) return;

    setCourses((prev) => prev.filter((course) => course.id !== courseId));
  }

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div className="admin-courses">
      <div className="courses-heading">
        <h2>Hantera kurser</h2>

        <RegularButton
          onClick={() => setShowModal(true)}
          label="Skapa kurs"
          color="green"
          size="xs"
        />
      </div>
      <div className="courses-list">
        <div className="course-list-heading">
          <h3>Kurs</h3>
          <h3>Kategori</h3>
          <h3>Datum</h3>
          <h3>Platser</h3>
          <h3>Pris</h3>
          <h3>Åtgärder</h3>
        </div>

        {filteredCourses.map((course) => (
          <div className="course-card" key={course.id}>
            <div className="course-info">
              <div>
                <h4>{course.title}</h4>
                <p>{course.description}</p>
              </div>

              <div>
                <p>{course.category}</p>
              </div>

              <div className="date">
                <p>{course.dates[0]}</p>
                <small>{course.time}</small>
              </div>

              <div>
                <p>
                  {course.spotsBooked}/{course.spots}
                </p>
              </div>

              <div>
                <p>{course.price} kr</p>
              </div>
              <div className="course-actions">
                <button onClick={() => setEditingCourse(course)}>
                  Redigera
                </button>

                <button onClick={() => handleDeleteCourse(course.id)}>
                  Ta bort
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
