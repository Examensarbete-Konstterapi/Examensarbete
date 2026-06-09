import "./coursesTab.css";
import IconButton from "../../../../components/buttons/iconButton/IconButton";
import RegularButton from "../../../../components/buttons/regularButton/RegularButton";
import Modal from "../../../../components/modal/Modal";
import ConfirmModal from "../../../../components/confirmModal/ConfirmModal";
import CourseForm, { type CourseFormData } from "./courseForm/CourseForm";
import { useState, useEffect } from "react";
import API from "../../../../api/axios";

export interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  sessions?: Session[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Session {
  _id?: string;
  courseId: string;
  date: string;
  startTime: string;
  maxParticipants: number;
}

export function CoursesTab() {
  // const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deletedSessionIds, setDeletedSessionIds] = useState<string[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  async function fetchCourses() {
    try {
      const response = await API.get(`/courses`);
      return response.data;
    } catch (error) {
      console.error("Kunde inte hämta kurser:", error);
      return [];
    }
  }

  useEffect(() => {
    async function loadCourses() {
      const data = await fetchCourses();
      setCourses(data);
    }
    loadCourses();
  }, []);

  async function handleCreateCourse(formData: CourseFormData) {
    setIsLoading(true);
    try {
      // Extrahera datum från sessions
      const dates = formData.sessions.map((session) => session.date);
      const startTime = formData.sessions[0].startTime;
      const maxParticipants = formData.sessions[0].maxParticipants;

      // Skapa kurs med alla sessioner i en request
      const response = await API.post(`/courses`, {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: formData.price,
        date: dates, // Array av datum
        startTime,
        maxParticipants,
      });

      console.log("Kurs skapad:", response.data);

      // Uppdatera listan
      const updatedCourses = await fetchCourses();
      setCourses(updatedCourses);
      setShowModal(false);
    } catch (error) {
      console.error("Kunde inte skapa kurs:", error);
      alert(`Fel när kursen skapades: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdateCourse(formData: CourseFormData) {
    if (!editingCourse) return;
    setIsLoading(true);

    try {
      await API.put(`/courses/${editingCourse._id}`, {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: formData.price,
      });

      for (const session of formData.sessions) {
        if (session._id) {
          await API.put(`/sessions/${session._id}`, {
            date: session.date,
            startTime: session.startTime,
            maxParticipants: session.maxParticipants,
          });
        } else {
          await API.post(`/sessions`, {
            courseId: editingCourse._id,
            date: session.date,
            startTime: session.startTime,
            maxParticipants: session.maxParticipants,
          });
        }
      }

      for (const sessionId of deletedSessionIds) {
        console.log("Ta bort denna sessionen", sessionId);
        await API.delete(`/sessions/${sessionId}`);
      }

      const updatedCourses = await fetchCourses();
      setCourses(updatedCourses);
      setDeletedSessionIds([]);
      setEditingCourse(null);
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert("Kunde inte uppdatera kurs");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteCourse(courseId: string) {
    try {
      await API.delete(`/courses/${courseId}`);
      setCourses((prev) => prev.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error("Kunde inte ta bort kurs:", error);
      alert("Fel när kursen togs bort");
    }
  }
  return (
    <div className="admin-courses">
      <div className="courses-heading">
        <h2>Hantera kurser</h2>

        <RegularButton
          onClick={() => setShowModal(true)}
          label="+ Skapa ny kurs"
          color="green"
          size="xs"
        />
      </div>
      <div className="courses-list">
        <div className="course-list-heading">
          <h3>Kurs</h3>
          <h3>Kategori</h3>
          <h3>Sessioner</h3>
          {/* <h3>Platser</h3> */}
          <h3>Pris</h3>
          <h3>Åtgärder</h3>
        </div>

        {courses.map((course) => (
          <div className="course-card" key={course._id}>
            <div className="course-info">
              <div>
                <h4>{course.title}</h4>
                <p>
                  {course.description.length > 50
                    ? course.description.slice(0, 50) + "..."
                    : course.description}
                </p>
              </div>

              <div>
                <p>
                  {course.category === "group"
                    ? "Gruppkurs"
                    : "Individuell bokning"}
                </p>
              </div>

              <div className="date">
                <p>{course.sessions?.length} tillfällen</p>
              </div>

              {/* <div>
                <p>{course.sessions?.[0]?.maxParticipants} platser</p>
              </div> */}

              <div>
                <p>{course.price} kr</p>
              </div>
              <div className="course-actions">
                <IconButton
                  label=""
                  onClick={() => {
                    setEditingCourse(course);
                    setShowModal(true);
                  }}
                  icon={
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M11 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V13"
                          stroke="#597059"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                        <path
                          d="M9.5 11.5L17.5 3.5C18.3284 2.67157 19.6716 2.67157 20.5 3.5C21.3284 4.32843 21.3284 5.67157 20.5 6.5L12.5 14.5L8 16L9.5 11.5Z"
                          stroke="#597059"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  }
                />
                <IconButton
                  label=""
                  onClick={() => {
                    setCourseToDelete(course._id);
                    setShowDeleteModal(true);
                  }}
                  icon={
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M3 6H21M5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6"
                          stroke="#d32f2f"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                        <path
                          d="M14 11V17"
                          stroke="#d32f2f"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                        <path
                          d="M10 11V17"
                          stroke="#d32f2f"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingCourse(null);
          setDeletedSessionIds([]);
        }}
      >
        {/* <CourseForm onSubmit={handleCreateCourse} isLoading={isLoading} /> */}
        <CourseForm
          key={editingCourse?._id}
          mode={editingCourse ? "edit" : "create"}
          onSubmit={editingCourse ? handleUpdateCourse : handleCreateCourse}
          onDeleteSession={(sessionId) => {
            console.log("Lägger till för borttagning:", sessionId);
            setDeletedSessionIds((prev) => [...prev, sessionId]);
          }}
          initialData={
            editingCourse
              ? {
                  title: editingCourse.title,
                  description: editingCourse.description,
                  category: editingCourse.category as "group" | "individual",
                  price: editingCourse.price,
                  sessions:
                    editingCourse.sessions?.map((session) => ({
                      _id: session._id,
                      date: session.date.split("T")[0],
                      startTime: session.startTime,
                      maxParticipants: session.maxParticipants,
                    })) ?? [],
                }
              : undefined
          }
          isLoading={isLoading}
        />
      </Modal>
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Ta bort kurs"
        message="Är du säker på att du vill ta bort kursen?"
        confirmText="Radera"
        cancelText="Avbryt"
        onCancel={() => {
          setShowDeleteModal(false);
          setCourseToDelete(null);
        }}
        onConfirm={async () => {
          if (!courseToDelete) return;

          await handleDeleteCourse(courseToDelete);

          setShowDeleteModal(false);
          setCourseToDelete(null);
        }}
      />
    </div>
  );
}
