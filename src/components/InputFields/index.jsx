import { FormControl } from "@mui/material";
import Select from "@mui/material/Select";
import { format } from "date-fns";
import { InputLabel, OutlinedInput, MenuItem } from "@mui/material";
import Fields from "./Fields";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import EyeIcon from "../Icons/EyeIcon";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import "react-datepicker/dist/react-datepicker.css";

export const CoachingSelectionField = (props) => {
  return (
    <FormControl fullWidth className="input-field" variant="outlined">
      <InputLabel htmlFor="outlined-adornment" className="input-label">
        {"Coaching"}
      </InputLabel>

      <Select
        required
        id="outlined-adornment"
        className="outlined-input"
        value={props.value}
        onChange={props.onChange("coaching")}
        input={<OutlinedInput label="Coaching" />}
        // MenuProps={MenuProps}
      >
        {props.coachingsList !== undefined ? (
          props.coachingsList.map((coaching) => (
            <MenuItem key={coaching.NAME} value={coaching.COACHING_ID}>
              {coaching.NAME}
            </MenuItem>
          ))
        ) : (
          <></>
        )}
      </Select>
    </FormControl>
  );
};

export const BatchSelectionField = (props) => {
  return (
    <FormControl fullWidth className="input-field" variant="outlined">
      <InputLabel htmlFor="outlined-adornment" className="input-label">
        {"Batch"}
      </InputLabel>

      <Select
        required
        id="outlined-adornment"
        className="outlined-input"
        value={props.value}
        onChange={props.onChange("batch")}
        input={<OutlinedInput label="Batch" />}
        // MenuProps={MenuProps}
      >
        {props.batchList !== undefined ? (
          props.batchList.map((batch, index) => (
            <MenuItem key={batch.BATCH_ID} value={batch.BATCH_ID}>
              {`Batch ${index + 1}: `}
              <br></br>
              {`Starting date:  ${format(
                new Date(batch.START_DATE),
                "do MMMM, yyyy"
              )}`}
              <br></br>
              {`Days: ${batch.CLASS_DAYS}`}
              <br></br>
              {`Time: ${batch.CLASS_TIME}`}
              <br></br>
              {`Total seats: ${batch.SEATS}`}
            </MenuItem>
          ))
        ) : (
          <></>
        )}
      </Select>
    </FormControl>
  );
};

export const InputField = (props) => {
  return (
    <FormControl
      fullWidth
      className="input-field"
      variant="outlined"
      size={props.size === undefined ? "large" : props.size}
    >
      <InputLabel htmlFor="outlined-adornment" className="input-label">
        {props.label}
      </InputLabel>
      <OutlinedInput
        required
        id="outlined-adornment"
        className="outlined-input"
        type={props.type}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        label={props.label}
        endAdornment={props.endAdornment}
      />
    </FormControl>
  );
};

export const InputField2 = (props) => {
  return (
    <FormControl
      fullWidth
      className="input-field"
      variant="outlined"
      size={props.size === undefined ? "large" : props.size}
    >
      <InputLabel htmlFor="outlined-adornment" className="input-label">
        {props.label}
      </InputLabel>
      <OutlinedInput
        required
        id="outlined-adornment"
        className="outlined-input"
        type={props.type}
        value={props.value}
        onChange={
          props.index === undefined
            ? props.onChange(props.id)
            : props.onChange(props.id, props.index)
        }
        label={props.label}
        endAdornment={props.endAdornment}
      />
    </FormControl>
  );
};

export const MultiLineField = (props) => {
  return (
    <FormControl fullWidth className="input-field" variant="outlined">
      <InputLabel htmlFor="outlined-adornment" className="input-label">
        {props.label}
      </InputLabel>
      <OutlinedInput
        required
        multiline={true}
        rows={props.rows}
        id="outlined-adornment"
        className="outlined-input"
        type={props.type}
        value={props.value}
        onChange={props.onChange(props.id)}
        label={props.label}
        endAdornment={props.endAdornment}
      />
    </FormControl>
  );
};

export const NumberField = (props) => {
  return (
    <FormControl
      fullWidth
      className="input-field"
      variant="outlined"
      size={props.size === undefined ? "large" : props.size}
    >
      <InputLabel htmlFor="outlined-adornment" className="input-label">
        {props.label}
      </InputLabel>
      <OutlinedInput
        required
        placeholder="0"
        inputProps={{
          step: props.step,
          min: props.min,
          max: props.max,
        }}
        id="outlined-adornment"
        className="outlined-input"
        type="number"
        value={props.value}
        onChange={props.onChange(props.id)}
        label={props.label}
        endAdornment={props.endAdornment}
      />
    </FormControl>
  );
};

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: "30vh",
    },
  },
};
export const MultiSelectionField = (props) => {
  return (
    <FormControl
      fullWidth
      className=" input-field"
      variant="outlined"
      size={props.size === undefined ? "large" : props.size}
    >
      <InputLabel htmlFor="outlined-adornment" className="input-label">
        {props.label}
      </InputLabel>
      <Select
        required
        multiple
        id="outlined-adornment"
        className="outlined-input"
        value={props.value}
        onChange={props.onChange(props.id)}
        input={<OutlinedInput label={props.label} />}
        MenuProps={MenuProps}
      >
        {props.list.map((value) => (
          <MenuItem
            key={value}
            value={value}
            // sx={{ height: "2rem" }}
            // style={getStyles(name, personName, theme)}
          >
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export const SelectionField = (props) => {
  return (
    <FormControl
      fullWidth
      className=" input-field"
      variant="outlined"
      size={props.size === undefined ? "large" : props.size}
    >
      <InputLabel htmlFor="outlined-adornment" className="input-label">
        {props.label}
      </InputLabel>
      <Select
        required
        id="outlined-adornment"
        className="outlined-input"
        value={props.value}
        onChange={props.onChange(props.id)}
        input={<OutlinedInput label={props.label} />}
        MenuProps={MenuProps}
        label={props.label}
        // MenuProps={MenuProps}
      >
        {props.list.map((value) => (
          <MenuItem
            key={value}
            value={value}
            // sx={{ height: "2rem" }}
            // style={getStyles(name, personName, theme)}
          >
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const RoleSelectionField = ({ value, setValue }) => {
  // console.log(value);
  // const handleChange = (e) => {
  //   setValue(e.target.value);
  // };
  return (
    <TextField
      fullWidth
      select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      variant="filled"
      sx={{
        textAlign: "center",
        fontWeight: "900",
        "& .MuiFilledInput-underline": {
          fontFamily: "poppins",
          fontWeight: "bold",
        },
        "& .MuiInputBase-root": {
          background: "none",
        },
        "& .MuiSelect-select": {
          paddingLeft: "32px",
          paddingTop: "4px",
          // paddingRight: 0,
        },
      }}
      size="small"
    >
      {["STUDENT", "TUTOR"].map((role) => (
        <MenuItem
          key={role}
          value={role}
          sx={{
            justifyContent: "center",
            fontWeight: "400",
            fontSize: ".90rem",
          }}
        >
          {role}
        </MenuItem>
      ))}
    </TextField>
  );
};
export const TutorGenderField = ({ value, handleChange, any }) => (
  <SelectionField
    label="Desired Tutor Gender"
    value={value}
    id="desired_tutor_gender"
    onChange={handleChange}
    list={any.concat(["Male", "Female"])}
  />
);
export const StudentGenderField = ({ value, handleChange, any }) => (
  <SelectionField
    label="Student's Gender"
    value={value}
    id="gender"
    onChange={handleChange}
    list={any.concat(["Male", "Female"])}
  />
);

export const GenderField = ({ value, handleChange }) => (
  <SelectionField
    label="Gender"
    value={value}
    id="gender"
    onChange={handleChange}
    list={["Male", "Female"]}
  />
);

export const NameField = ({ value, handleChange }) => (
  <InputField2
    label="Full Name"
    type="text"
    value={value}
    id="name"
    onChange={handleChange}
  />
);

export const LowestSalaryField = ({ value, handleChange, size }) => (
  <NumberField
    label="Lowest Salary (BDT)"
    type="number"
    min={0}
    max={100000}
    step={1000}
    value={value}
    id="start_salary"
    onChange={handleChange}
    size={size}
  />
);
export const HighestSalaryField = ({ minValue, value, handleChange }) => (
  <NumberField
    label="Highest Salary (BDT)"
    type="number"
    min={minValue}
    max={100000}
    step={1000}
    value={value}
    id="end_salary"
    onChange={handleChange}
  />
);
export const AvailabilityField = ({ value, handleChange, any }) => (
  <SelectionField
    label="Availability"
    value={value}
    id="status"
    onChange={handleChange}
    list={any.concat(["Available", "Unavailable"])}
  />
);
export const MinimumExperienceField = ({ value, handleChange }) => (
  <NumberField
    label="Minimum Experience (Years)"
    type="number"
    min={0}
    max={100}
    step={1}
    value={value}
    id="experience"
    onChange={handleChange}
  />
);

export const MaximumDaysField = ({ value, handleChange }) => (
  <NumberField
    label="Maximum Days / Week"
    min={1}
    max={7}
    step={1}
    value={value}
    id="days_per_week"
    onChange={handleChange}
  />
);

export const TutionTypeField = ({ value, handleChange, any, size }) => (
  <SelectionField
    label="Tuition Type"
    value={value}
    id="tution_type"
    onChange={handleChange}
    list={any.concat(["Offline", "Online"])}
    size={size}
  ></SelectionField>
);

export const RequestTypeField = ({ value, handleChange, size }) => (
  <SelectionField
    label="Request Type"
    value={value}
    id="request_type"
    onChange={handleChange}
    list={["Tution Offer", "Join Request", "Course Enroll"]}
    size={size}
  ></SelectionField>
);

export const ClassField = ({ value, handleChange, any }) => (
  <SelectionField
    label="Class"
    value={value}
    id="class"
    onChange={handleChange}
    list={any.concat(Fields.class)}
  />
);

export const MediumField = ({ value, handleChange, any }) => (
  <SelectionField
    label="Medium"
    value={value}
    id="version"
    onChange={handleChange}
    list={any.concat(["Bangla Medium", "English Medium", "English Version"])}
  />
);

export const SeatsField = ({ value, handleChange }) => (
  <NumberField
    label="Total Seats"
    min={0}
    max={1000}
    step={10}
    value={value}
    id="seats"
    onChange={handleChange}
  />
);

export const ClassDaysField = ({ value, handleChange, size }) => (
  <MultiSelectionField
    label="Class Days"
    value={value}
    id="days"
    onChange={handleChange}
    list={Fields.day}
    size={size}
  />
);

export const DaysPerWeekField = ({ value, handleChange, size }) => (
  <NumberField
    label="Days / Week"
    min={1}
    max={7}
    step={1}
    value={value}
    id="days_per_week"
    onChange={handleChange}
    size={size}
  />
);

// export StartTimeField = ({ value, handleChange })

export const AddressField = ({ value, handleChange }) => (
  <MultiLineField
    rows={3}
    label={"Address"}
    type="text"
    value={value}
    id={"address"}
    onChange={handleChange}
  />
);

export const SalaryField = ({ value, handleChange, size }) => (
  <NumberField
    label="Salary (BDT)"
    type="number"
    min={0}
    max={100000}
    step={1000}
    value={value}
    id="salary"
    onChange={handleChange}
    size={size}
  />
);

export const SubjectsField = ({ value, handleChange, size }) => (
  <MultiSelectionField
    label="Subjects"
    value={value}
    id="subjects"
    onChange={handleChange}
    list={Fields.subject.sort()}
  ></MultiSelectionField>
  /* <InputField2
    label="Subjects"
    type="text"
    value={value}
    id="subjects"
    onChange={handleChange}
    size={size}
  /> */
);

export const SubjectField = ({ value, handleChange }) => (
  /*<InputField2
    label="Subject"
    type="text"
    value={value}
    id="subject"
    onChange={handleChange}
  />*/
  <SelectionField
    label="Subject"
    value={value}
    id="subject"
    onChange={handleChange}
    list={Fields.subject.sort()}
  ></SelectionField>
);

export const PhoneField = ({ value, handleChange }) => (
  <InputField2
    label="Phone Number"
    type="text"
    value={value}
    id="phone"
    onChange={handleChange}
  />
);

export const CoachingFields = ({ values, handleChange }) => (
  <div className="input-fields">
    {[
      {
        label: "Full Name",
        id: "name",
        value: values.name,
      },
      {
        label: "Phone Number",
        id: "phone",
        value: values.phone,
      },
    ].map((field, index) => (
      <InputField2
        label={field.label}
        type="text"
        value={field.value}
        id={field.id}
        onChange={handleChange}
      />
    ))}
    <AddressField value={values.address} handleChange={handleChange} />
  </div>
);

export const RequestFormFields = ({ values, handleChange }) => (
  <div className="input-fields">
    <TutionTypeField
      value={values.tution_type}
      handleChange={handleChange}
      any={[]}
    />
    <TutorGenderField
      value={values.desired_tutor_gender}
      handleChange={handleChange}
      any={["Any"]}
    />
    {/* <MultiSelectionField
    label="Subjects"
    value={values.subjects}
    id="subjects"
    onChange={handleChange}
    list={Fields.subject}
  ></MultiSelectionField> */}
    <SubjectsField value={values.subjects} handleChange={handleChange} />
    <DaysPerWeekField
      value={values.days_per_week}
      handleChange={handleChange}
    />
    <SalaryField value={values.salary} handleChange={handleChange} />
  </div>
);

export const TutorSearchFields = ({ values, handleChange }) => (
  <div className="input-fields">
    <TutorGenderField
      value={values.desired_tutor_gender}
      handleChange={handleChange}
      any={["Any"]}
    />
    <LowestSalaryField
      value={values.start_salary}
      handleChange={handleChange}
    />
    <HighestSalaryField
      minValue={values.end_salary}
      value={values.end_salary}
      handleChange={handleChange}
    />
    <AvailabilityField
      value={values.status}
      handleChange={handleChange}
      any={["Any"]}
    />
    <MinimumExperienceField
      value={values.experience}
      handleChange={handleChange}
    />
  </div>
);

export const CreateCourseFields = ({ values, coachingsList, handleChange }) => (
  <div className="input-fields">
    <CoachingSelectionField
      coachingsList={coachingsList}
      value={values.coaching}
      onChange={handleChange}
    />
    <ClassField value={values.class} handleChange={handleChange} any={[]} />
    <SubjectField value={values.subject} handleChange={handleChange} />
  </div>
);
export const StudentSelectionField = ({ value, list, handleChange }) => {
  <MultiSelectionField
    label="Class Days"
    value={value}
    id="days"
    onChange={handleChange}
    list={list}
  />;
};
export const CreateNoticeFields = ({
  values,
  coachingsList,
  studentsList,
  classList,
  subjectList,
  batchList,
  handleChange,
}) => (
  <div className="input-fields">
    <CoachingSelectionField
      coachingsList={coachingsList}
      value={values.coaching}
      onChange={handleChange}
    />
    {values.coaching === -1 ? (
      <StudentSelectionField
        value={values.student}
        list={studentsList}
        onChange={handleChange}
      />
    ) : (
      <>
        {[
          {
            label: "Class",
            id: "class",
            value: values.class,
            list: classList,
          },
          {
            label: "Subject",
            id: "subject",
            value: values.subject,
            list: subjectList,
          },
        ].map((field, index) => (
          <SelectionField
            label={field.label}
            value={field.value}
            id={field.id}
            onChange={handleChange}
            list={field.list}
          ></SelectionField>
        ))}
        <BatchSelectionField
          batchList={batchList}
          value={values.batch}
          onChange={handleChange}
        />
      </>
    )}
    <MultiLineField
      rows={8}
      label={"Notice"}
      type="text"
      value={values.notice}
      id={"notice"}
      onChange={handleChange}
    />
  </div>
);
export const CourseSelectionFields = ({
  values,
  coachingsList,
  classList,
  subjectList,
  batchList,
  handleChange,
}) => (
  <div className="input-fields">
    <CoachingSelectionField
      coachingsList={coachingsList}
      value={values.coaching}
      onChange={handleChange}
    />
    {[
      {
        label: "Class",
        id: "class",
        value: values.class,
        list: classList,
      },
      {
        label: "Subject",
        id: "subject",
        value: values.subject,
        list: subjectList,
      },
    ].map((field, index) => (
      <SelectionField
        label={field.label}
        value={field.value}
        id={field.id}
        onChange={handleChange}
        list={field.list}
      ></SelectionField>
    ))}
    <BatchSelectionField
      batchList={batchList}
      value={values.batch}
      onChange={handleChange}
    />
  </div>
);

// export const PendingRequestsFields = ({
//   values,
//   coachingsList,
//   classList,
//   subjectList,
//   batchList,
//   handleChange,
// }) => (
//   <div className="input-fields">
//     <CoachingSelectionField
//       coachingsList={coachingsList}
//       value={values.coaching}
//       onChange={handleChange}
//     />
//     {[
//       {
//         label: "Class",
//         id: "class",
//         value: values.class,
//         list: classList,
//       },
//       {
//         label: "Subject",
//         id: "subject",
//         value: values.subject,
//         list: subjectList,
//       },
//     ].map((field, index) => (
//       <SelectionField
//         label={field.label}
//         value={field.value}
//         id={field.id}
//         onChange={handleChange}
//         list={field.list}
//       ></SelectionField>
//     ))}
//     <BatchSelectionField
//       batchList={batchList}
//       value={values.batch}
//       onChange={handleChange}
//     />
//   </div>
// );

export const AddCourseFields = ({
  values,
  coachingsList,
  classList,
  subjectList,
  batchList,
  handleChange,
}) => (
  <CourseSelectionFields
    values={values}
    coachingsList={coachingsList}
    classList={classList}
    subjectList={subjectList}
    batchList={batchList}
    handleChange={handleChange}
  />
);
export const StudentSearchFields = ({
  values,
  coachingsList,
  classList,
  subjectList,
  batchList,
  handleChange,
}) => (
  <CourseSelectionFields
    values={values}
    coachingsList={coachingsList}
    classList={classList}
    subjectList={subjectList}
    batchList={batchList}
    handleChange={handleChange}
  />
);
export const EducationFields = ({
  educationFields,
  handleOldEducationChange,
  newEducationFields,
  handleNewEducationChange,
  handleDelete,
  handleAdd,
}) => (
  <div className="education-fields">
    <div className="education-list">
      {educationFields.map((row, index) => (
        <div className="hbox">
          {row.map((col) => (
            <InputField2
              label={col.label}
              type="text"
              value={col.value}
              id={col.id}
              index={index}
              onChange={handleOldEducationChange}
            />
          ))}
          <Button
            variant="contained"
            className="delete-button"
            onClick={handleDelete(index)}
          >
            <DeleteOutlineIcon />
          </Button>
        </div>
      ))}
    </div>

    <div className="hbox new-education">
      {newEducationFields.map((field) => (
        <InputField2
          label={field.label}
          type="text"
          value={field.value}
          id={field.id}
          onChange={handleNewEducationChange}
        />
      ))}
      {newEducationFields[0].value === "" ||
      newEducationFields[1].value === "" ||
      newEducationFields[2].value === "" ||
      newEducationFields[3].value === "" ? (
        <Button
          variant="contained"
          className="disabled-button"
          sx={{ minWidth: "4vw" }}
          onClick={handleAdd}
          disabled
        >
          <AddIcon />
        </Button>
      ) : (
        <Button variant="contained" className="add-button" onClick={handleAdd}>
          <AddIcon />
        </Button>
      )}
      {/* <Button variant="contained" className="add-button" onClick={handleAdd}>
        <AddIcon />
      </Button> */}
    </div>
  </div>
);
export const TutorProfileSettingsFields = ({ user, setUser, handleChange }) => (
  <div className="input-fields">
    <NameField value={user.name} handleChange={handleChange} />
    <div className="hbox">
      <GenderField value={user.gender} handleChange={handleChange} />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label="Date of Birth"
          inputFormat="MM/dd/yyyy"
          value={user.dob}
          onChange={(date) => {
            console.log(date);
            setUser({ ...user, dob: date });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                width: "100%",
              }}
            />
          )}
          className="date-picker"
        />
      </LocalizationProvider>
      <PhoneField value={user.phone} handleChange={handleChange} />
    </div>
    <MultiSelectionField
      label="Teaching Subjects"
      value={user.subjects}
      id="subjects"
      onChange={handleChange}
      list={Fields.subject.sort()}
    ></MultiSelectionField>
    {/* <InputField2
      label="Teaching Subjects"
      type="text"
      value={user.subjects}
      id="subjects"
      onChange={handleChange}
    /> */}

    <div className="hbox">
      <NumberField
        label="Preffered Salary (BDT)"
        type="number"
        min={0}
        max={100000}
        step={1000}
        value={user.salary}
        id="salary"
        onChange={handleChange}
      />
      <NumberField
        label="Years of Experience"
        type="number"
        min={0}
        max={100}
        step={1}
        value={user.experience}
        id="experience"
        onChange={handleChange}
      />
      <SelectionField
        label="Status"
        value={user.status}
        id="status"
        onChange={handleChange}
        list={["Available", "Unavailable"]}
      />
    </div>
  </div>
);

export const StudentProfileSettingsFields = ({
  user,
  setUser,
  handleChange,
}) => (
  <div className="input-fields">
    <NameField value={user.name} handleChange={handleChange} />
    <GenderField value={user.gender} handleChange={handleChange} />
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDatePicker
        label="Date of Birth"
        inputFormat="MM/dd/yyyy"
        value={user.dob}
        onChange={(date) => {
          setUser({ ...user, dob: date });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              width: "100%",
            }}
          />
        )}
        className="date-picker"
      />
    </LocalizationProvider>
    <ClassField value={user.class} handleChange={handleChange} any={[]} />
    <MediumField value={user.version} handleChange={handleChange} any={[]} />
    {[
      {
        label: "Institution",
        id: "institution",
        value: user.institution,
      },
      {
        label: "Phone Number",
        id: "phone",
        value: user.phone,
      },
      {
        label: "Address",
        id: "address",
        value: user.address,
      },
    ].map((field, index) => (
      <InputField2
        label={field.label}
        type="text"
        value={field.value}
        id={field.id}
        onChange={handleChange}
      />
    ))}
  </div>
);

export const PasswordChangeFields = ({
  currPass,
  setCurrPass,
  newPass,
  setNewPass,
}) => {
  const [currShowPass, setCurrShowPass] = useState(false);
  const [newShowPass, setNewShowPass] = useState(false);
  return (
    <div className="input-fields">
      {[
        {
          label: "Current Password",
          value: currPass,
          setValue: setCurrPass,
          showPassword: newShowPass,
          setShowPassword: setNewShowPass,
        },
        {
          label: "New Password",
          value: newPass,
          setValue: setNewPass,
          showPassword: currShowPass,
          setShowPassword: setCurrShowPass,
        },
      ].map((field, index) => (
        <InputField
          label={field.label}
          type={field.showPassword ? "text" : "password"}
          value={field.value}
          setValue={field.setValue}
          endAdornment={
            <EyeIcon
              isVisible={field.value.length > 0}
              showPassword={field.showPassword}
              setShowPassword={field.setShowPassword}
            />
          }
        />
      ))}
    </div>
  );
};

export const BatchFields = ({ values, setValues, handleChange }) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <div className="input-fields">
      <MobileDatePicker
        label="Starting Date"
        inputFormat="MM/dd/yyyy"
        value={values.start_date}
        onChange={(date) => {
          setValues({ ...values, start_date: date });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              width: "100%",
            }}
          />
        )}
        className="date-picker"
      />
      <ClassDaysField value={values.days} handleChange={handleChange} />
      <TimePicker
        label="Start Time"
        value={values.start_time}
        onChange={(time) => {
          setValues({ ...values, start_time: time });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              width: "100%",
              label: "black",
            }}
          />
        )}
      />

      <TimePicker
        label="End Time"
        value={values.end_time}
        minTime={values.start_time}
        onChange={(time) => {
          setValues({ ...values, end_time: time });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              width: "100%",
              label: "black",
            }}
          />
        )}
      />
      <SeatsField value={values.seats} handleChange={handleChange} />
    </div>
  </LocalizationProvider>
);

export const TutionPostSearchFields = ({ values, handleChange }) => (
  <div className="input-fields">
    <TutionTypeField
      value={values.tution_type}
      handleChange={handleChange}
      any={["Any"]}
    />
    <LowestSalaryField
      value={values.start_salary}
      handleChange={handleChange}
    />
    <HighestSalaryField
      minValue={values.end_salary}
      value={values.end_salary}
      handleChange={handleChange}
    />
    <MaximumDaysField
      value={values.days_per_week}
      handleChange={handleChange}
    />
    <ClassField
      value={values.class}
      handleChange={handleChange}
      any={["Any"]}
    />
    <MediumField
      value={values.version}
      handleChange={handleChange}
      any={["Any"]}
    />
    <StudentGenderField
      value={values.gender}
      handleChange={handleChange}
      any={["Any"]}
    />
  </div>
);

export const TutionOfferFields = ({ values, setValues, handleChange }) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <div className="input-fields">
      <TutionTypeField
        value={values.tution_type}
        handleChange={handleChange}
        any={[]}
      />
      <SubjectsField value={values.subjects} handleChange={handleChange} />
      {/*Start date */}
      {/* Replace days per week with class days*/}
      <MobileDatePicker
        label="Starting Date"
        inputFormat="MM/dd/yyyy"
        value={values.start_date}
        onChange={(date) => {
          setValues({ ...values, start_date: date });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              width: "100%",
            }}
          />
        )}
        className="date-picker"
      />
      <ClassDaysField value={values.days} handleChange={handleChange} />
      {/* Add tutoring start and end time field*/}
      <TimePicker
        label="Start Time"
        value={values.start_time}
        onChange={(time) => {
          setValues({ ...values, start_time: time });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              width: "100%",
              label: "black",
            }}
          />
        )}
      />

      <TimePicker
        label="End Time"
        value={values.end_time}
        minTime={values.start_time}
        onChange={(time) => {
          setValues({ ...values, end_time: time });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              width: "100%",
              label: "black",
            }}
          />
        )}
      />
      <SalaryField value={values.salary} handleChange={handleChange} />
    </div>
  </LocalizationProvider>
);
