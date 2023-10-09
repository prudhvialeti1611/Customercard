import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Avatar } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import axios from 'axios';
import './test.css'; 

const ContactCard = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get('https://mocki.io/v1/e61e4294-2a85-4971-91ee-f647cf13a14a')
      .then((response) => {
        setData(response.data.slice(0, 3));
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleImageClick = (index) => {
    if (index !== 0) {
      // Create a copy of the data array
      const newData = [...data];

      // Swap the selected image with the first image
      [newData[0], newData[index]] = [newData[index], newData[0]];

      // Update the state with the modified array
      setData(newData);

      setCurrentIndex(0); // Set the currentIndex to 0 to show the first person's info
    }
  };

  return (
    <Card>
      <CardContent id="card">
        <div className="contact-images">
          {data.map((contact, index) => (
            <div
              key={contact.id}
              className={`contact-image ${currentIndex === index ? 'selected' : ''}`}
              onClick={() => handleImageClick(index)}
              style={{
                position: 'relative',
                zIndex: index === 0 ? 2 : 1,
                marginRight: index > 0 ? '-40px' : '0px', // Adjust marginRight for overlap
                cursor: 'pointer', // Add cursor pointer
              }}
            >
              <Avatar
                src={`/images/${contact.id}.jpg`} // Change the path to match your image filenames
                alt={contact.name}
                style={{
                  width: index === 0 ? '150px' : '100px', // Larger image for the first, smaller for others
                  height: index === 0 ? '150px' : '100px', // Larger image for the first, smaller for others
                }}
              />
            </div>
          ))}
        </div>
        {currentIndex !== null && (
          <div>
            {/* <Typography variant="h5" gutterBottom>
              Contact Information
            </Typography> */}
            <div className="contact-details">
              <Typography variant="h6">{data[currentIndex]?.name}</Typography>
              <div className="contact-info">
                <div className="info-text">
                <Typography variant="body2">Customer ID: {data[currentIndex]?.customerId}</Typography>
                </div>
              </div>

              <div className="contact-info">
                <div className="info-text">
                <Typography variant="body2">Account Owner | Since  {data[currentIndex]?.years}</Typography>
                </div>
              </div>
              
              <div className="contact-info">
                <div>
                  <EmailOutlinedIcon />
                </div>
                <div className="info-text">
                  <Typography variant="body2">{data[currentIndex]?.email}</Typography>
                </div>
              </div>
              <div className="contact-info">
                <div>
                  <PersonOutlineOutlinedIcon />
                </div>
                <div className="info-text">
                  <Typography variant="body2">{data[currentIndex]?.userid}</Typography>
                </div>
              </div>
              <div className="contact-info">
                <div>
                  <LocalPhoneOutlinedIcon />
                </div>
                <div className="info-text">
                  <Typography variant="body2">{data[currentIndex]?.phone}</Typography>
                </div>
              </div>
              <div className="contact-info">
                <div>
                  <HomeOutlinedIcon />
                </div>
                <div className="info-text">
                  <Typography variant="body2">{data[currentIndex]?.city}</Typography>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactCard;
