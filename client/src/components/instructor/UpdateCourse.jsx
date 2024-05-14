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
  Card,
  IconButton,
  Divider
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function UpdateCourse() {
  const navigate = useNavigate()
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf('/') + 1);

  const [course, setCourse] = useState({})

  useEffect(() => {
    const fetchData = async() => {
      const response = await axios.get(`http://localhost:5000/course/get/${id}`);
      if (response.data.success) {
        console.log(response.data.course);
        setCourse(response.data.course);
        setOutlines(response.data.course.outline);
        setPreviewVideoLink(response.data.course.previewVideo)
        setPreviewVideoPreview(response.data.course.previewVideo)
        setThumbnailLink(response.data.course.thumbnail)
        setThumbnailPreview(response.data.course.thumbnail)
        console.log(course);
      } else {
        console.log(response.data.message);
      }
    }
    fetchData();
  },[])


  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const courseData = {
      title: data.get('title'),
      thumbnail: data.get('thumbnail'),
      previewVideo: data.get('previewVideo'),
      author: localStorage.getItem('userID'),
      description: data.get('description'),
      price: data.get('price'),
      category: data.get('category'),
      subCategory: data.get('subCategory'),
      learners: [],
      review: [],
      outline: outlines,
    }
    console.log(courseData);
    try {
      const response = await axios.post(`http://localhost:5000/course/create`, courseData);
      if (response.data.success) {
        //setToastMsg('Employee is added successfully');
        //setOpen(true);
        //navigate('/');
        console.log(response.data.message);
        alert('successfully added')
        navigate('/instructor')
      } else {
        //setToastMsg('Something went wrong, Employee was not added');
        //setOpen(true);
        console.log(response.data.message);
        alert('error')
      }
    } catch (err) {
        //setToastMsg('Something went wrong, Employee was not added'+ err.message);
      //setOpen(true);
      console.log(err.message);
      alert('err')
    }
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

  const [attchmentLink, setAttchmentLink] = useState([]);

  const [isPreviewVideoUploading, setIsPreviewVideoUploading] = useState(false)
  const [isThumbnailUploading, setIsThumbnailUploading] = useState(false)
  const [isAttachmentUploading, setIsAttachmentUploading] = useState(false)

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

  const uploadAttachment = async (e, outlineIndex, lessonIndex) => {
    setIsAttachmentUploading(true);
    const file = e.target.files[0];
    /*setThumbnailPreview(URL.createObjectURL(file))*/
    try {
      const storageRef = ref(storage, `test-user/attachments/${file.name}`);
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
          outlines[outlineIndex].lessons[lessonIndex].download.attachmentLink = downloadURL;
          setIsAttachmentUploading(false);
        }
      );
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  
  const uploadLessionVideo = async (e, outlineIndex, lessonIndex) => {
    setIsAttachmentUploading(true);
    const file = e.target.files[0];
    /*setThumbnailPreview(URL.createObjectURL(file))*/
    try {
      const storageRef = ref(storage, `test-user/attachments/${file.name}`);
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
          outlines[outlineIndex].lessons[lessonIndex].video = downloadURL;
          setIsAttachmentUploading(false);
        }
      );
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const [outlines, setOutlines] = useState([
    {
      lectureNo: '',
      lectureTitle: '',
      lessons: [
        {
          lessonNo: '',
          lessonTitle: '',
          lessonDesc: '',
          download: { attachment: '', attachmentLink: 'No file selected' },
          duration: '',
          video: ''
        }
      ],
      quiz: [
        {
          question: '',
          options: [
            { option: '', isCorrect: false },
            { option: '', isCorrect: false },
            { option: '', isCorrect: false },
            { option: '', isCorrect: false }
          ]
        }
      ],
      teachersNote: [],
    }
  ]);

  const handleOutlineChange = (index, field, value) => {
    const updatedOutlines = [...outlines];
    updatedOutlines[index][field] = value;
    setOutlines(updatedOutlines);
  };

  const handleLessonChange = (outlineIndex, lessonIndex, field, value) => {
    const updatedOutlines = [...outlines];
    updatedOutlines[outlineIndex].lessons[lessonIndex][field] = value;
    setOutlines(updatedOutlines);
  };
  
  const handleLessonDownloadChange = (outlineIndex, lessonIndex, value) => {
    const updatedOutlines = [...outlines];
    updatedOutlines[outlineIndex].lessons[lessonIndex].download.attachment = value;
    setOutlines(updatedOutlines);
  };

  const handleQuizChange = (outlineIndex, quizIndex, field, value) => {
    const updatedOutlines = [...outlines];
    updatedOutlines[outlineIndex].quiz[quizIndex][field] = value;
    setOutlines(updatedOutlines);
  };
  
  const handleOptionChange = (outlineIndex, quizIndex, index, value) => {
    const updatedOutlines = [...outlines];
    updatedOutlines[outlineIndex].quiz[quizIndex].options[index].option = value;
    setOutlines(updatedOutlines);
  };
  
  const handleOptionIsCorrectChange = (outlineIndex, quizIndex, index, value) => {
    const updatedOutlines = [...outlines];
    updatedOutlines[outlineIndex].quiz[quizIndex].options[index].isCorrect = value;
    setOutlines(updatedOutlines);
  };

  const handleNoteChange = (outlineIndex, noteIndex, field, value) => {
    const updatedOutlines = [...outlines];
    updatedOutlines[outlineIndex].teachersNote[noteIndex][field] = value;
    setOutlines(updatedOutlines);
  };

  const addOutline = () => {
    setOutlines([...outlines, {
      lectureNo: '',
      lectureTitle: '',
      lessons: [{
        lessonNo: '',
        lessonTitle: '',
        lessonDesc: '',
        download: { attachment: '', attachmentLink: '' },
        duration: '',
        video: ''
      }],
      quiz: [],
      teachersNote: []
    }]);
  };

  const addLesson = (outlineIndex) => {
    const updatedOutlines = [...outlines];
    updatedOutlines[outlineIndex].lessons.push({
      lessonNo: '',
      lessonTitle: '',
      lessonDesc: '',
      download: { attachment: '', attachmentLink: '' },
      duration: '',
      video: ''
    });
    setOutlines(updatedOutlines);
  };

  const addQuiz = (outlineIndex) => {
    const updatedOutlines = [...outlines];
    updatedOutlines[outlineIndex].quiz.push({
      question: '', options: [
        { option: '', isCorrect: false },
        { option: '', isCorrect: false },
        { option: '', isCorrect: false },
        { option: '', isCorrect: false }
      ]
    });
    setOutlines(updatedOutlines);
  };

  const addNote = (outlineIndex) => {
    const updatedOutlines = [...outlines];
    updatedOutlines[outlineIndex].teachersNote.push({ referenceTitle: '', referenceLinks: '' });
    setOutlines(updatedOutlines);
  };

  const removeOutline = (index) => {
    if (index !== 0) {
      const updatedOutlines = [...outlines];
      updatedOutlines.splice(index, 1);
      setOutlines(updatedOutlines);
    }
  };

  const removeLesson = (outlineIndex, lessonIndex) => {
    const updatedOutlines = [...outlines];
    if (outlineIndex !== 0 || lessonIndex !== 0) {
      updatedOutlines[outlineIndex].lessons.splice(lessonIndex, 1);
      setOutlines(updatedOutlines);
    }
  };

  const removeQuiz = (outlineIndex, quizIndex) => {
    const updatedOutlines = [...outlines];
    updatedOutlines[outlineIndex].quiz.splice(quizIndex, 1);
    setOutlines(updatedOutlines);
  };

  const removeNote = (outlineIndex, noteIndex) => {
    const updatedOutlines = [...outlines];
    updatedOutlines[outlineIndex].teachersNote.splice(noteIndex, 1);
    setOutlines(updatedOutlines);
  };

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container component="form" onSubmit={handleSubmit} spacing={2}>
          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant='h5'>Update Course {id }</Typography>
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
              value={course.title}
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
              value={course.description}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="category"
              name="category"
              select
              label="Category"
              defaultValue={course.category}
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
              id="subCategory"
              name="subCategory"
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
              value={course.price}
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
              value={course.discount}
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
          <Grid item xs={12} sx={{ display: 'flex', gap: 1, position: 'relative', alignItems: 'center' }}>
            <Typography variant='h6'>Build outline of your course</Typography>
          </Grid>
          <Grid item xs={12}>
          {outlines.map((outline, outlineIndex) => (
            <Grid key={outlineIndex} sx={{position:'relative'}}>
              <Divider sx={{ mb:3 }}>Lecture { outlineIndex+1}</Divider>
              <Grid item xs={12} sx={{ display: 'flex', gap: 2, position: 'relative', mb:3 }}>
                <TextField
                  type="text"
                  id="lectureTitle"
                  label="Lecture Title"
                  name="lectureTitle"
                  variant="filled"
                  sx={{width: '80%'}}
                  value={outline.lectureTitle}
                  onChange={(e) => handleOutlineChange(outlineIndex, 'lectureTitle', e.target.value)}
                />
                <TextField
                  type="text"
                  sx={{width: '20%'}}
                  id="lectureNo"
                  label="Lecture No."
                  name="lectureNo"
                  variant="filled"
                  value={outline.lectureNo}
                  onChange={(e) => handleOutlineChange(outlineIndex, 'lectureNo', e.target.value)}
                />
              </Grid>
              
              <Button onClick={() => addLesson(outlineIndex)} sx={{mb:0.75}}>Add Lesson</Button>
              {outline.lessons.map((lesson, lessonIndex) => (
                <div key={lessonIndex}>
                  <Grid item xs={12} sx={{ display: 'flex', gap: 2, position: 'relative', mb:1.5  }}>
                    <TextField
                      type="text"
                      sx={{width: '50%'}}
                      id="lessonNo"
                      label="Lesson No"
                      name="lessonNo"
                      variant="filled"
                      value={lesson.lessonNo}
                      onChange={(e) => handleLessonChange(outlineIndex, lessonIndex, 'lessonNo', e.target.value)}
                    />
                    <TextField
                      type="text"
                      sx={{width: '50%'}}
                      id="lessonTitle"
                      label="Lesson Title"
                      name="lessonTitle"
                      variant="filled"
                      value={lesson.lessonTitle}
                      onChange={(e) => handleLessonChange(outlineIndex, lessonIndex, 'lessonTitle', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'flex', gap: 2, position: 'relative', alignItems:'center', mb:1.5 }}>
                    <TextField
                      type="text"
                      sx={{ width: `100%`}}
                      id="lessonDesc"
                      label="Lesson Description"
                      name="lessonDesc"
                      variant="filled"
                      value={lesson.lessonDesc}
                      onChange={(e) => handleLessonChange(outlineIndex, lessonIndex, 'lessonDesc', e.target.value)}
                    />
                    {lessonIndex > 0 &&
                      <Button
                        size="small"
                        aria-label="button to toggle theme"
                        
                        sx={{
                          minWidth: '32px',
                          height: '32px',
                          p: '4px',
                          position: 'absolute',
                          right: 5,
                          color:'error.main'
                        }}
                        onClick={() => removeLesson(outlineIndex, lessonIndex)}
                      >
                        <CloseIcon />
                      </Button>
                    }
                    
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'flex', gap: 2, position: 'relative', alignItems: 'center', mb: 1.5 }}>
                    <TextField
                      type="text"
                      sx={{width: '50%'}}
                      id="attachment"
                      label="Attachment Title"
                      name="attachment"
                      variant="filled"
                      value={lesson.download.attachment}
                      onChange={(e) => handleLessonDownloadChange(outlineIndex, lessonIndex, e.target.value)}
                    />
                    <Grid item xs={6} sx={{ display: 'flex', gap: 1, position: 'relative' }}>
                      <TextField
                        fullWidth
                        id="attachmentLink"
                        label="Attachment Link"
                        name="attachmentLink"
                        variant="filled"
                        sx={{ margin: 0 }}
                        value={lesson.download.attachmentLink}
                        aria-readonly
                      />
                    
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        sx={{ position: 'absolute', right: 8, bottom: 8 }}
                        onChange={(e)=>uploadAttachment(e, outlineIndex, lessonIndex)}
                      >
                        Upload Attachment
                        <VisuallyHiddenInput type="file" />
                      </Button>
                    </Grid>
                    
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'flex', gap: 2, position: 'relative', alignItems: 'center', mb: 3 }}>
                    <TextField
                      type="text"
                      sx={{width: '50%'}}
                      id="duration"
                      label="Duration"
                      name="duration"
                      variant="filled"
                      value={lesson.duration}
                      onChange={(e) => handleLessonChange(outlineIndex, lessonIndex, 'duration', e.target.value)}
                    />
                    <Grid item xs={6} sx={{ display: 'flex', gap: 1, position: 'relative' }}>
                      <TextField
                        fullWidth
                        id="lessonVideo"
                        label="Lesson Video"
                        name="lessonVideo"
                        variant="filled"
                        sx={{ margin: 0 }}
                        value={lesson.video}
                        aria-readonly
                      />
                    
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        sx={{ position: 'absolute', right: 8, bottom: 8 }}
                        onChange={(e)=>uploadLessionVideo(e, outlineIndex, lessonIndex)}
                      >
                        Upload Video
                        <VisuallyHiddenInput type="file" />
                      </Button>
                    </Grid>
                    
                  </Grid>
                </div>
              ))}
              <Button onClick={() => addQuiz(outlineIndex)} sx={{mb:0.75}}>Add Quiz Question</Button>
              {outline.quiz.map((quiz, quizIndex) => (
                <div key={quizIndex}>
                  <Grid item xs={12} sx={{ display: 'flex', gap: 2, position: 'relative', alignItems: 'center', mb: 1.5 }}>
                    <TextField
                      type="text"
                      sx={{width: '100%'}}
                      id="question"
                      label="Question"
                      name="question"
                      variant="filled"
                      value={quiz.question}
                      onChange={(e) => handleQuizChange(outlineIndex, quizIndex, 'question', e.target.value)}
                    />
                    <Button
                        size="small"
                        aria-label="button to toggle theme"
                        
                        sx={{
                          minWidth: '32px',
                          height: '32px',
                          p: '4px',
                          position: 'absolute',
                          right: 5,
                          color:'error.main'
                        }}
                        onClick={() => removeQuiz(outlineIndex, quizIndex)}
                      >
                        <CloseIcon />
                      </Button>
                  </Grid>
                  
                  <Grid item xs={12} sx={{ display: 'flex', gap: 2, position: 'relative', alignItems: 'center', mb: 3 }}>
                    {outline.quiz[quizIndex].options.map((option, index) => (
                      <div style={{width:'100%', position:'relative', display: 'flex', alignItems: 'center'}}>
                        <TextField
                          type="text"
                          sx={{width: '100%'}}
                          id={`option-${index+1}`}
                          label={`Option ${index+1}`}
                          name={`option-${index+1}`}
                          variant="filled"
                          value={option.option}
                          onChange={(e) => handleOptionChange(outlineIndex, quizIndex, index, e.target.value)}
                        />
                        <Checkbox value={option.isCorrect} onChange={(e)=>handleOptionIsCorrectChange(outlineIndex, quizIndex, index, e.target.value)} size="small" sx={{position:'absolute', right: 0}}/>
                      </div>
                     
                      
                    ))}
                  </Grid>
                </div>
              ))}
              <Button onClick={() => addNote(outlineIndex)} sx={{mb:0.75}}>Add Teacher's Note</Button>
              {outline.teachersNote.map((note, noteIndex) => (
                <Grid item xs={12} sx={{ display: 'flex', gap: 2, position: 'relative', alignItems: 'center', mb: 1.5 }}>
                  <TextField
                    type="text"
                    sx={{width: '100%'}}
                    id="noteTitle"
                    label="Note Title"
                    name="noteTitle"
                    variant="filled"
                    value={note.referenceTitle}
                    onChange={(e) => handleNoteChange(outlineIndex, noteIndex, 'referenceTitle', e.target.value)}
                  />
                  <TextField
                    type="text"
                    sx={{width: '100%'}}
                    id="refLink"
                    label="Reference Link"
                    name="refLink"
                    variant="filled"
                    value={note.referenceLinks}
                    onChange={(e) => handleNoteChange(outlineIndex, noteIndex, 'referenceLinks', e.target.value)}
                  />
                  <Button
                    size="small"
                    aria-label="button to toggle theme"
                    
                    sx={{
                      minWidth: '32px',
                      height: '32px',
                      p: '4px',
                      position: 'absolute',
                      right: 5,
                      color: 'error.main',
                    }}
                    onClick={() => removeNote(outlineIndex, noteIndex)}
                  >
                    <CloseIcon />
                  </Button>
                </Grid>
              ))}
              {outlineIndex !== 0 && (
                <Button
                  size="small"
                  aria-label="button to toggle theme"
                  
                  sx={{
                    minWidth: '32px',
                    height: '32px',
                    p: '4px',
                    position: 'absolute',
                    right: 5,
                    color: 'error.main',
                    top:-5
                  }}
                  onClick={() => removeOutline(outlineIndex)}
                >
                  <CloseIcon />
                </Button>
              )}
              
            </Grid>
          ))}
          <Button onClick={addOutline}>Add Lecture</Button>
          </Grid>
          <Box sx={{ width: '100%', ml:2 }}>
            <Button sx={{width: '100%'}} variant='contained' type='submit'>Submit</Button>
          </Box>
          
        </Grid>
      </Container>
    </div>
  )
}
