import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Link,
  TextField,
  FormControlLabel,
  Checkbox,
  MenuItem,
  styled,
  LinearProgress,
  Paper,
  Card
} from '@mui/material'
import React, { useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function CreateCourse() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];
  
  const categories = [
    {
      value: 'Design',
      label: 'Design',
    },
    {
      value: 'Development',
      label: 'Development',
    },
    {
      value: 'Marketing',
      label: 'Marketing',
    },
    {
      value: 'IT and Software',
      label: 'IT and Software',
    },
    {
      value: 'Personal Development',
      label: 'Personal Development',
    },
    {
      value: 'Business',
      label: 'Business',
    },
    {
      value: 'Photography',
      label: 'Photography',
    },
    {
      value: 'Music',
      label: 'Music',
    },
  ];

  const [subCategories, setSubCategories] = useState([
    {
      value: 'Web Design',
      label: 'Web Design',
    },
    {
      value: 'UI/UX Design',
      label: 'UI/UX Design',
    },
    {
      value: 'Graphic Design',
      label: 'Graphic Design',
    },
  ]);

  const handleCategoryClick = (Category) => {
    switch (Category) {
      case 'Design':
        setSubCategories([
          {
            value: 'Web Design',
            label: 'Web Design',
          },
          {
            value: 'UI/UX Design',
            label: 'UI/UX Design',
          },
          {
            value: 'Graphic Design',
            label: 'Graphic Design',
          },
        ]);
        break;
      case 'Development':
        setSubCategories([
          {
            value: 'Web Development',
            label: 'Web Development',
          },
          {
            value: 'Mobile Development',
            label: 'Mobile Development',
          },
          {
            value: 'Game Development',
            label: 'Game Development',
          },
        ]);
        break;
      case 'Marketing':
        setSubCategories([
          {
            value: 'Digital Marketing',
            label: 'Digital Marketing',
          },
          {
            value: 'Social Media Marketing',
            label: 'Social Media Marketing',
          },
          {
            value: 'Content Marketing',
            label: 'Content Marketing',
          },
        ]);
        break;
      case 'IT and Software':
        setSubCategories([
          {
            value: 'IT',
            label: 'IT',
          },
          {
            value: 'Software',
            label: 'Software',
          },
        ]);
        break;
      case 'Personal Development':
        setSubCategories([
          {
            value: 'Personal Development',
            label: 'Personal Development',
          },
          {
            value: 'Career Development',
            label: 'Career Development',
          },
          {
            value: 'Writing',
            label: 'Writing',
          },
        ]);
        break;
      case 'Business':
        setSubCategories([
          {
            value: 'Business',
            label: 'Business',
          },
          {
            value: 'Finance',
            label: 'Finance',
          },
        ]);
        break;
      case 'Photography':
        setSubCategories([
          {
            value: 'Photography',
            label: 'Photography',
          },
          {
            value: 'Videography',
            label: 'Videography',
          },
        ]);
        break;
      case 'Music':
        setSubCategories([
          {
            value: 'Music Production',
            label: 'Music Production',
          },
          {
            value: 'Audio Production',
            label: 'Audio Production',
          },
        ]);
        break;
      default:
        setSubCategories([]);
        break;
    }
  }

  const [previewVideoLink, setPreviewVideoLink] = useState('No file selected');
  const [previewVideoPreview, setPreviewVideoPreview] = useState(null);
  const [thumbnailLink, setThumbnailLink] = useState('No file selected');
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const [isPreviewVideoUploading, setIsPreviewVideoUploading] = useState(false)
  const [isThumbnailUploading, setIsThumbnailUploading] = useState(false)

  const storage = getStorage();

  const uploadFileToStorage = async (e) => {
    setIsPreviewVideoUploading(true);
    const file = e.target.files[0];
    setPreviewVideoPreview(URL.createObjectURL(file))
    try {
      const storageRef = ref(storage, `test-user/preview-videos/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          // Handle upload progress
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error('Error uploading file:', error);
        },
        async () => {
          // Handle successful uploads
          const downloadURL = await getDownloadURL(storageRef);
          console.log('File available at', downloadURL);
          setPreviewVideoLink(downloadURL);
          setIsPreviewVideoUploading(false);
          // Perform further actions with the downloadURL (e.g., store it in a database)
        }
      );

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  
  const uploadThumbnail = async (e) => {
    setIsThumbnailUploading(true);
    const file = e.target.files[0];
    setThumbnailPreview(URL.createObjectURL(file))
    try {
      const storageRef = ref(storage, `test-user/thumbnails/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          
        },
        (error) => {
          console.error('Error uploading file:', error);
        },
        async () => {
          const downloadURL = await getDownloadURL(storageRef);
          console.log('File available at', downloadURL);
          setThumbnailLink(downloadURL);
          setIsThumbnailUploading(false);
        }
      );
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container component="form" spacing={2}>
          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant='h5'>Create Courses</Typography>
            <Box sx={{display: 'flex', gap: 2}}>
              <Button variant='contained'>See Instruction</Button>
            </Box>
          </Grid>
          <Grid item xs={6} >
            <TextField
              sx={{margin: 0}}
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              variant="filled"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{margin: 0}}
              required
              fullWidth
              name="description"
              label="Description"
              type="text"
              id="description"
              variant="filled"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="filled-select-currency"
              select
              label="Category"
              defaultValue="Design"
              variant="filled"
              fullWidth
              onChange={(e)=>{handleCategoryClick(e.target.value)}}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="filled-select-currency"
              select
              label="Sub Category"
              defaultValue={`${subCategories[0].value}`}
              variant="filled"
              fullWidth
            >
              {subCategories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} >
            <TextField
              sx={{margin: 0}}
              required
              fullWidth
              id="price"
              label="Price"
              name="price"
              variant="filled"
            />
          </Grid>
          <Grid item xs={6} >
            <TextField
              sx={{margin: 0}}
              required
              fullWidth
              name="discount"
              label="Discount"
              type="text"
              id="discount"
              variant="filled"
            />
          </Grid>
          <Grid item xs={6} sx={{display: 'flex', gap: 1, position:'relative'}}>
            <TextField
              required
              fullWidth
              id="previewVideo"
              label="Preview Video"
              name="previewVideo"
              variant="filled"
              sx={{ margin: 0 }}
              value={previewVideoLink}
              aria-readonly
            />
          
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ position: 'absolute', right: 8, bottom: 8 }}
              onChange={uploadFileToStorage}
            >
              Upload Video
              <VisuallyHiddenInput type="file" />
            </Button>
          </Grid>
          <Grid item xs={6} sx={{display: 'flex', gap: 1, position:'relative'}}>
            <TextField
              required
              fullWidth
              id="thumbnail"
              label="Thumbnail"
              name="thumbnail"
              variant="filled"
              sx={{ margin: 0 }}
              value={thumbnailLink}
              aria-readonly
            />
          
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ position: 'absolute', right: 8, bottom: 8 }}
              onChange={uploadThumbnail}
            >
              Upload Thumbnail
              <VisuallyHiddenInput type="file" />
            </Button>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', gap: 1, position: 'relative', height: '250px', alignItems: 'center' }}>
            {!isPreviewVideoUploading ?
              <Card sx={{height: '100%', width: '100%'}}>
                
                {!previewVideoPreview ? 
                  <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%'}}>
                    No preview video selected
                  </Box>
                :
                  <video controls width="100%" height="100%" src={previewVideoPreview} />
                }
              </Card>
            :
              <Card sx={{ width: '100%', height:'100%',pt: 12, px:4 }}>
                  <LinearProgress />
                  <Typography sx={{ mt: 2, display: "flex", alignItems: 'center', justifyContent: 'center', gap: 1 }}><FileUploadIcon/>Preview Video is Uploading</Typography>
              </Card>  
            }
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', gap: 1, position: 'relative', height: '250px', alignItems: 'center' }}>
            {!isThumbnailUploading ?
              <Card sx={{ height: '100%', width: '100%' }}>
                {!thumbnailPreview ? 
                  <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%'}}>
                    No thumbnail selected
                  </Box>
                :
                  <img controls width="100%" height="100%" src={thumbnailPreview} alt='Selected Thumbnail' />
                }
                
              </Card>
            :
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
                <Typography
                  sx={{
                    mt: 2,
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1
                  }}
                >
                  <FileUploadIcon />
                  Preview Video is Uploading
                </Typography>
              </Box>  
            }
          </Grid>
          
        </Grid>
          
      </Container>
    </div>
  )
}
