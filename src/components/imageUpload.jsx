import { Grid, LinearProgress, Paper } from "@mui/material";
import React, { useRef, useState } from "react";

const ImageUpload = (props) => {
  const [hoveredItemId, setHoveredItemId] = useState(null);

  return (
    <div>
      <Grid container spacing={2}>
        {props.data.map((val, i) => (
          <Grid
            item
            xs={3}
            key={i}
            onMouseEnter={() => setHoveredItemId(val.id)}
            onMouseLeave={() => setHoveredItemId(null)}
          >
            <Paper elevation={2}>
              <input
                type="file"
                style={{ display: "none" }}
                onChange={() => props.handleImageUpload(val.id)}
                id={val.id}
                ref={(el) => (props.inputRefs.current[val.id] = el)}
              />
              <div
                style={{
                  backgroundImage: `url(${
                    props.imagePreviews[val.id] || val.image
                  })`,
                  height: "150px",
                  width: "100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => props.inputRefs.current[val.id].click()}
              >
                {hoveredItemId === val.id && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: "#fff",
                      color: "#000",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        cursor: "pointer",
                        fontSize: "24px",
                      }}
                    >
                      +
                    </span>
                  </div>
                )}
                <div>
                  <div
                    className="text-end "
                    style={{
                      opacity: 1,
                      backgroundColor: "#000",
                      width: "fit-content",
                      padding: "2px",
                    }}
                  >
                    <p className="f-12 text-white mb-0">{val.label}</p>
                  </div>
                </div>
              </div>
            </Paper>
            {props.progress[val.id] !== undefined && (
              <LinearProgress
                variant="determinate"
                value={props.progress[val.id]}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ImageUpload;
