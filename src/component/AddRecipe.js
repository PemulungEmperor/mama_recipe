import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const AddRecipe = () => {
    //get params
    const params = useParams()
    const { id }  = params

    //defaultImage
    const [previewImage, setPreviewImage] = useState("")

    //form data
    const [productName, setProductName] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [video, setVideo] = useState('')
    const [photo, setPhoto] = useState(null)

    const handleUploadChange = (e) => {
        let uploaded = e.target.files[0]
        if(e.target.files.length !== 0) {
            setPreviewImage(URL.createObjectURL(uploaded))
            setPhoto(uploaded)
        }
      };

    const addProduct = async(e) => {
        e.preventDefault()
        if(!photo) {
            showAlertError()
        }else{
           let formData = new FormData()
           formData.append("user_id", id)
           formData.append("food_name", productName)
           formData.append("ingredients", ingredients)
           formData.append("video_recipe", video)
           formData.append("photoPath",photo)

           fetch("/product",{
            method: 'POST',
            body: formData
           }).then((res)=> res.json()).then((data)=>{
            if(data.status === 'success'){
                console.log('hehe')
            }
           })
           showAlert() 
        }
    }

    useEffect(()=>{
        document.title = "Mama Recipe - Add Recipe"
    })

    //SWEET ALERT
    const showAlert = () => {
        Swal.fire({
            title: "Success",
            text: "Your recipe successfully added",
            icon: "success",
            confirmButtonText: "OK",
          }).then(()=>{
            window.location = "/"
          })
      }

      const showAlertError = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Your image still empty!',
            })
    }
    
  return (
    <div>
        <div className="container">
            <div className="row" style={{ "marginTop": "10vh" }}>
                <form action="" onSubmit={addProduct}>
                    <div className="tes justify-content-center">
                        <div className="d-flex justify-content-center">
                            <input id="files" type="file" className="form-control mt-3"  style={{ "display": "none", "backgroundColor": "#F6F5F4", "height": "300px", "maxWidth": "900px" }} onChange={handleUploadChange} name="file" />
                            <input id="" type="" className="form-control mt-3"  style={{ "backgrounColor": "#F6F5F4", "height": "300px", "maxWidth": "900px" }}/>
                            <div className="" style={{"position":"absolute", "marginTop":"7vh"}}>
                            <img htmlFor="files" className="" src={previewImage? previewImage : ""} alt="" style={{ "maxWidth":"250px", "maxHeight": "250px" }}  width="250px"/>
                            </div>
                            <div className="" style={{"position":"absolute", "marginTop":"25vh"}}>
                            <img htmlFor="files" className="" src={previewImage? "" : "/img/icon/image.png"} alt=""  width="50px"/>
                            </div>
                           
                            <div className="" style={{"position":"absolute", "marginTop":"35vh"}}>
                            <label htmlFor="files">Add Photo</label>
                            </div>
                            
                        </div>
                        
                        <div className="d-flex justify-content-center mt-3">
                            <input type="text" className="form-control " style={{ "backgroundColor": "#F6F5F4", "height": "50px", "maxWidth": "900px"}} placeholder="Title" value={productName} onChange={(e)=>setProductName(e.target.value)} required/>
                        </div>

                        <div className="d-flex justify-content-center  mt-3">
                            <textarea type="text" className="form-control" style={{ "backgroundColor": "#F6F5F4", "height": "200px", "maxWidth": "900px" }} required placeholder="Ingredients" value={ingredients} onChange={(e)=>setIngredients(e.target.value)}></textarea>
                        </div>

                        <div className="d-flex justify-content-center mt-3">
                            <input type="text" className="form-control " required style={{ "backgroundColor": "#F6F5F4", "height": "50", "maxWidth": "900px"  }}placeholder="Video" value={video} onChange={(e)=>setVideo(e.target.value)} />
                            {/* <input type="text" value={id} hidden readOnly></input> */}
                        </div>
                    </div>

                    <div className="d-flex justify-content-center my-5">
                        <button type="submit" href="../src/profile.html" className="btn mb-3 p-2 rounded-2 text-white" style={{ "backgroundColor":"#EFC81A", "width": "300px", "fontSize":"10px", "height": "40px" }}>Send</button>
                    </div>    
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddRecipe
