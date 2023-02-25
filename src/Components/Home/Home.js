import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import "./Home.css";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Home = () => {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 500,
    border: "none",
    boxShadow: 24,
  };

  const searchImages = (e) => {
    console.log("hitt");

    fetch(
      `https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_NOT_SECRET_CODE}&query=${e.target.value} `
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.results.length > 0) {
          setImages(data.results);
        } else {
          getImages();
        }

        // setImages(data)
      });
  };

  function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

  const getImages = () => {
    fetch(
      `https://api.unsplash.com/photos?client_id=${process.env.REACT_APP_NOT_SECRET_CODE}&page=1&per_page=10`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setImages(data);
      });
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {image && (
            <div className="image-block-in-modal-view">
              <div className="image">
                <img src={image.urls.thumb} />
              </div>
              <div className="image-footer">
                <div className="upper">
                  <p>{truncateString(image.alt_description, 60)} </p>
                </div>

                <div className="info">
                  <div className="left-section">
                    <div className="profile-image">
                      <img src={image.user.profile_image.small} />
                    </div>
                    <h6>{image.user.username}</h6>
                  </div>
                  <div className="right-section">
                    {" "}
                    <ThumbUpIcon className="like-icon" /> {image.likes}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>
      <div className="navigation">
        <div className="left-section">
          {" "}
          <h2 className="logo" > Image Gallery</h2>{" "}
        </div>
        <div className="middle-section">
          <input
            placeholder="search images here"
            type="text"
            onChange={searchImages}
          />
        </div>
        <div className="right-section">
          <a href="/"> Explore </a>
          <a href="/"> Collection </a>
          <a href="/"> Community </a>
        </div>
      </div>

      <div className="call-to-action-section">
        <Grid container spacing={2}>
          {images.length > 0 && (
            <OwlCarousel
              autoplayTimeout={3000}
              className="owl-theme"
              autoplay
              loop
              margin={10}
            >
              {images.map((item) => {
                return (
                  <Grid item xs={12}>
                    <div className="img">
                      <img src={item.urls.thumb} />
                    </div>
                  </Grid>
                );
              })}
            </OwlCarousel>
          )}
        </Grid>
      </div>

      <div className="images-section">
        <Grid container spacing={2}>
          {images &&
            images.map((item) => {
              return (
                <Grid item xs={4}>
                  <div
                    className="image-block"
                    onClick={() => {
                      handleOpen();
                      setImage(item);
                    }}
                  >
                    <div className="image">
                      <img src={item.urls.thumb} />
                    </div>
                    <div className="image-footer">
                      <div className="left-section">
                        <div className="profile-image">
                          <img src={item.user.profile_image.small} />
                        </div>
                        <h6>{item.user.username}</h6>
                      </div>
                      <div className="right-section">
                        {" "}
                        <ThumbUpIcon className="like-icon" /> {item.likes}
                      </div>
                    </div>
                  </div>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
