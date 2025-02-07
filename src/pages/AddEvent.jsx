import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Datepicker from "react-tailwindcss-datepicker";
import EditorToolbar, { formats, modules } from "../comonents/EditorToolbar";
import Button from "../elements/Button";
import { addEvent } from "../apis/events";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const initialErrorsState = {
  title: "",
  description: "",
  date: "",
  api: "",
};

const AddEvent = () => {
  const [cookies, setCookie] = useCookies([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("JWT", cookies.jwt)
    if (!cookies.jwt) {
      
      navigate("/");
    }
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState(initialErrorsState);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e);
  };

  const [datePick, setDatePick] = useState({
    startDate: null,
    endDate: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (title.length === 0) {
      newErrors = {
        ...newErrors,
        title: "Enter title",
      };
    }
    if (description.length === 0) {
      newErrors = {
        ...newErrors,
        description: "Enter description.",
      };
    }

    if (datePick.startDate === null || datePick.endDate === null) {
      newErrors = {
        ...newErrors,
        date: "Enter start date and end date.",
      };
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) {
      return;
    }

    addEventApi();
  };

  const addEventApi = async () => {
    const [response, error] = await addEvent(cookies.jwt, {
      event: {
        title: title,
        description: description,
        start_time: datePick.startDate,
        end_time: datePick.endDate,
        location: "",
      },
    });
    handleResponse([response, error]);
  };

  const handleResponse = async ([response, error]) => {
    if (error) {
      let result;
      if (error.message) {
        result = await error.message;
      } else {
        result = await error.text();
      }
      setErrors({
        ...errors,
        api: result,
      });
    } else {
      console.log(response)
      const result = await response;
      const message = result.message;
      console.log(message);
      navigate("/");
    }
  };
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl">Add Event</h1>
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-8 ">
          <div>
            <input
              className="py-2 w-full border border-gray-600 rounded px-3"
              placeholder="Event Title"
              name="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
            ></input>
            {errors.title && (
              <p className="text-sm text-medium text-red-600 mt-1">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <Datepicker
              className="py-2 w-full border border-gray-600 rounded px-3"
              value={datePick}
              placeholder="Select Event Start and End dates"
              popoverDirection="down"
              minDate={new Date()}
              onChange={(newValue) => setDatePick(newValue)}
            />
            {errors.date && (
              <p className="text-sm text-medium text-red-600 mt-1">
                {errors.date}
              </p>
            )}
          </div>
          <div>
            <div className="text-editor">
              <EditorToolbar />
              <ReactQuill
                theme="snow"
                value={description}
                onChange={handleDescriptionChange}
                placeholder={"About the event..."}
                modules={modules}
                formats={formats}
              />
            </div>
            {errors.description && (
              <p className="text-sm text-medium text-red-600 mt-1">
                {errors.description}
              </p>
            )}
          </div>
          <div>
            <Button>Create Event</Button>
            {errors.api && (
              <p className="text-sm text-medium text-red-600 mt-1">
                {errors.api}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddEvent;
