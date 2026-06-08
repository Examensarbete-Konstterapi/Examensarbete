import RegularButton from "../../../../../components/buttons/regularButton/RegularButton";
import IconButton from "../../../../../components/buttons/iconButton/IconButton";
import "./createCourseForm.css";
import { useForm, useFieldArray } from "react-hook-form";

export interface Session {
  date: string;
  startTime: string;
  maxParticipants: number;
}

export interface CourseFormData {
  title: string;
  description: string;
  category: "group" | "individual";
  price: number;
  sessions: Session[];
}

interface CourseFormProps {
  onSubmit: (data: CourseFormData) => void;
  initialData?: Partial<CourseFormData>;
  isLoading?: boolean;
}

export default function CreateCourseForm({
  onSubmit,
  initialData,
  isLoading = false,
}: CourseFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CourseFormData>({
    defaultValues: initialData || {
      sessions: [{ date: "", startTime: "", maxParticipants: 10 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sessions",
  });

  return (
    <form className="course-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Skapa ny kurs</h2>
      <div className="form-group">
        <label>Kursnamn</label>
        <input
          type="text"
          {...register("title", { required: "Kursnamn är obligatoriskt" })}
          placeholder="Ange kursnamn"
        />
        {errors.title && <span className="error">{errors.title.message}</span>}
      </div>

      <div className="form-group">
        <label>Beskrivning</label>
        <textarea
          {...register("description", {
            required: "Beskrivning är obligatorisk",
          })}
          placeholder="Beskriv kursen"
          rows={4}
        />
        {errors.description && (
          <span className="error">{errors.description.message}</span>
        )}
      </div>

      <div className="form-group-row">
        <div className="form-group">
          <label>
            Kategori
            <select
              {...register("category", {
                required: "Kategori är obligatorisk",
              })}
            >
              <option value="">Välj kategori</option>
              <option value="group">Grupp</option>
              <option value="individual">Individuell</option>
            </select>
            {errors.category && (
              <span className="error">{errors.category.message}</span>
            )}
          </label>
        </div>

        <div className="form-group">
          <label>
            Pris (kr)
            <input
              type="number"
              {...register("price", {
                required: "Pris är obligatoriskt",
                valueAsNumber: true,
                min: { value: 0, message: "Pris kan inte vara negativt" },
              })}
            />
            {errors.price && (
              <span className="error">{errors.price.message}</span>
            )}
          </label>
        </div>
      </div>

      {/* Sessions */}
      <div className="sessions-section">
        <h3>Tillfällen (Sessioner)</h3>

        {fields.map((field, index) => (
          <div key={field.id} className="session-card">
            <div className="form-group-row">
              <div className="form-group">
                <label>Datum</label>
                <input
                  type="date"
                  {...register(`sessions.${index}.date`, {
                    required: "Datum är obligatoriskt",
                  })}
                />
                {errors.sessions?.[index]?.date && (
                  <span className="error">
                    {errors.sessions[index]?.date?.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Tid</label>
                <input
                  type="time"
                  {...register(`sessions.${index}.startTime`, {
                    required: "Tid är obligatorisk",
                  })}
                />
                {errors.sessions?.[index]?.startTime && (
                  <span className="error">
                    {errors.sessions[index]?.startTime?.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Antal platser</label>
                <input
                  type="number"
                  {...register(`sessions.${index}.maxParticipants`, {
                    required: "Antal platser är obligatoriskt",
                    valueAsNumber: true,
                    min: { value: 1, message: "Minst 1 plats krävs" },
                  })}
                />
                {errors.sessions?.[index]?.maxParticipants && (
                  <span className="error">
                    {errors.sessions[index]?.maxParticipants?.message}
                  </span>
                )}
              </div>

              {fields.length > 1 && (
                <IconButton
                  label=""
                  type="button"
                  onClick={() => remove(index)}
                  icon={
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 6H21M5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6"
                        stroke="#d32f2f"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  }
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <RegularButton
        type="button"
        label="+ Lägg till tillfälle"
        color="blue"
        size="xs"
        onClick={() => append({ date: "", startTime: "", maxParticipants: 10 })}
      />

      <RegularButton
        label={isLoading ? "Sparar..." : "Spara kurs"}
        color="green"
        size="lg"
        type="submit"
        // disabled={isLoading}
      />
    </form>
  );
}
