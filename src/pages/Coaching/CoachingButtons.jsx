import React, { useState } from "react";
import { Divider, Typography } from "@mui/material";
import InputField, { InputField2 } from "../../components/InputFields/InputField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const CoachingButtons = () => {
  const [type, setType] = useState("ADMIN");
  const navigate = useNavigate();
  const AdminButtons = () => {
    const buttons = [
      {
        label: "Home",
        path: "/coaching",
      },
      {
        label: "Members",
        path: "/coaching",
      },
      {
        label: "Courses",
        path: "/coaching/my_courses",
      },
      {
        label: "Join Requests",
        path: "/coaching",
      },
    ];
    return buttons;
  };
  const MemberButtons = () => {
    const buttons = [
      {
        label: "Home",
        path: "/coaching",
      },
      {
        label: "My Courses",
        path: "/coaching/my_courses",
      },
      {
        label: "Join",
        path: "/coaching",
      },
    ];
    return buttons;
  };
  return (
    <div className="coaching-buttons">
      {(type === "MEMBER" ? MemberButtons() : AdminButtons()).map((button) => (
        <Button
          variant="contained"
          className="blue-button full-width"
          onClick={() => {
            setTimeout(() => {
              navigate(button.path);
            }, 300);
          }}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
};

export default CoachingButtons;
